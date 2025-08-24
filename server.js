// Use import syntax instead of require
import 'dotenv/config'; // Loads .env file
import express from 'express';
import cors from 'cors';
import pg from 'pg';
const { Pool } = pg;
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

// Import Cloudinary and the storage engine
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

// --- CLOUDINARY CONFIGURATION ---
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'mvlu-hackathon-ids',
    format: async (req, file) => {
        const allowedImageFormats = ['jpg', 'png', 'jpeg', 'gif'];
        const extension = file.mimetype.split('/')[1];
        if (allowedImageFormats.includes(extension)) {
            return 'jpg';
        }
        return extension;
    },
    public_id: (req, file) => `${Date.now()}-${file.originalname}`,
  },
});

// --- INITIALIZE APP & MIDDLEWARE ---
const app = express();
const port = process.env.PORT || 3010;
const upload = multer({ storage: storage });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// --- DATABASE CONNECTION ---
let pool;
try {
    pool = new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false,
        },
        // **THIS IS THE FIX**
        // Increase the statement timeout to 60 seconds (60000 milliseconds)
        // This gives the database plenty of time to wake up.
        statement_timeout: 60000, 
    });

    pool.on('error', (err, client) => {
      console.error('Unexpected error on idle client', err);
      process.exit(-1);
    });

    console.log("Database pool created successfully.");

} catch (error) {
    console.error("\n--- FATAL ERROR: FAILED TO CREATE DATABASE POOL ---");
    console.error("This usually means your DATABASE_URL in the .env file is incorrect or malformed.");
    console.error("Full Error:", error);
    process.exit(-1);
}


// --- API ROUTES ---

app.get('/api/test', (req, res) => {
    console.log("Test route was hit successfully!");
    res.json({ message: 'Server is running correctly!' });
});


app.get('/api/check-team-name/:name', async (req, res, next) => {
    const { name } = req.params;
    console.log(`Checking team name: ${name}`);
    try {
        const client = await pool.connect();
        const query = 'SELECT 1 FROM teams WHERE lower(team_name) = lower($1)';
        const result = await client.query(query, [name]);
        client.release();
        res.json({ available: result.rowCount === 0 });
    } catch (error) {
        console.error('Error in /api/check-team-name:', error);
        next(error);
    }
});

app.post('/api/register', upload.array('idCards', 6), async (req, res, next) => {
    console.log("\n--- New Registration Request Received ---");
    console.log("Body Content:", req.body);
    console.log("Files Received:", req.files);
    console.log("Number of Files:", req.files ? req.files.length : 0);

    const { teamName, participants: participantsJSON } = req.body;
    const participants = JSON.parse(participantsJSON);
    const client = await pool.connect();

    try {
        await client.query('BEGIN');

        // Check for duplicate team name first
        const checkQuery = 'SELECT 1 FROM teams WHERE lower(team_name) = lower($1)';
        const checkResult = await client.query(checkQuery, [teamName]);
        if (checkResult.rowCount > 0) {
            throw new Error('Team name has just been taken.');
        }

        // --- NEW SEQUENTIAL ID LOGIC ---
        // 1. Fetch all existing registration IDs
        const allIdsQuery = 'SELECT registration_id FROM teams';
        const allIdsResult = await client.query(allIdsQuery);
        const existingNumbers = allIdsResult.rows
            .map(row => parseInt(row.registration_id.replace('MVLUHACK', ''), 10))
            .filter(num => !isNaN(num)); // Filter out any potential non-numeric IDs

        // 2. Find the next available number
        let nextIdNumber = 1;
        existingNumbers.sort((a, b) => a - b); // Sort numbers to find gaps correctly
        for (const num of existingNumbers) {
            if (num === nextIdNumber) {
                nextIdNumber++;
            } else {
                // Found the first gap in the sequence
                break;
            }
        }

        // 3. Format the new registration ID (e.g., 1 -> MVLUHACK01)
        const regId = `MVLUHACK${String(nextIdNumber).padStart(2, '0')}`;
        // --- END OF NEW LOGIC ---

        const teamInsertQuery = 'INSERT INTO teams(team_name, registration_id) VALUES($1, $2) RETURNING id';
        const teamResult = await client.query(teamInsertQuery, [teamName, regId]);
        const teamId = teamResult.rows[0].id;

        for (let i = 0; i < participants.length; i++) {
            const p = participants[i];
            
            if (!req.files || !req.files[i]) {
                throw new Error(`Server Error: File for participant ${i + 1} (${p.name}) was not received.`);
            }
            const idCardUrl = req.files[i].path; 

            const participantInsertQuery = `
                INSERT INTO participants(team_id, name, roll_number, department, year, gender, phone_number, id_card_url)
                VALUES($1, $2, $3, $4, $5, $6, $7, $8)
            `;
            await client.query(participantInsertQuery, [
                teamId, p.name, p.rollNumber, p.department, p.year, p.gender, p.phoneNumber, idCardUrl
            ]);
        }

        await client.query('COMMIT');
        res.status(201).json({ success: true, registrationId: regId });

    } catch (error) {
        await client.query('ROLLBACK');
        next(error);
    } finally {
        client.release();
    }
});


// --- DEPLOYMENT CONFIGURATION ---
app.use(express.static(path.join(__dirname, 'build')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.use((err, req, res, next) => {
  console.error('\n--- GLOBAL ERROR HANDLER CAUGHT AN ERROR ---');
  console.error('Error Message:', err.message);
  console.error('Full Stack Trace:', err.stack);
  res.status(500).json({ success: false, message: 'An unexpected server error occurred.' });
});


// --- START SERVER ---
app.listen(port, () => {
    console.log(`🎉 Server is running and listening on port ${port}`);
});
