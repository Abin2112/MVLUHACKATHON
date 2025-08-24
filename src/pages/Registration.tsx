import React, { useState } from 'react';
import { Upload, Check, AlertCircle, Users, CreditCard } from 'lucide-react';

interface Participant {
  name: string;
  rollNumber: string;
  department: string;
  year: string;
  gender: string;
  phoneNumber: string;
  idCard: File | null;
}

const Registration = () => {
  const [teamName, setTeamName] = useState('');
  const [teamNameAvailable, setTeamNameAvailable] = useState<boolean | null>(null);
  const [participants, setParticipants] = useState<Participant[]>(
    Array(6).fill(null).map(() => ({
      name: '',
      rollNumber: '',
      department: '',
      year: '',
      gender: '',
      phoneNumber: '',
      idCard: null
    }))
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [registrationId, setRegistrationId] = useState('');

  const departments = ['CS', 'IT', 'BT', 'BAMMC'];
  const years = ['FY', 'SY', 'TY'];
  const genders = ['Male', 'Female'];

  const checkTeamNameAvailability = async (name: string) => {
    if (name.length < 3) {
      setTeamNameAvailable(null);
      return;
    }
    
    // Simulate API call to check team name availability
    setTimeout(() => {
      // Simple check - in real implementation, this would be a database query
      const unavailableNames = ['test', 'demo', 'sample'];
      setTeamNameAvailable(!unavailableNames.includes(name.toLowerCase()));
    }, 500);
  };

  const updateParticipant = (index: number, field: keyof Participant, value: any) => {
    const newParticipants = [...participants];
    newParticipants[index] = { ...newParticipants[index], [field]: value };
    setParticipants(newParticipants);
  };

  const handleFileUpload = (index: number, file: File | null) => {
    updateParticipant(index, 'idCard', file);
  };

  const validateForm = () => {
    // Check if team name is available
    if (!teamNameAvailable) return false;
    
    // Check if all participants have filled all fields
    const allFieldsFilled = participants.every(p => 
      p.name && p.rollNumber && p.department && p.year && p.gender && p.phoneNumber && p.idCard
    );
    if (!allFieldsFilled) return false;
    
    // Check if at least one female member
    const hasFemale = participants.some(p => p.gender === 'Female');
    if (!hasFemale) return false;
    
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      alert('Please fill all fields correctly and ensure at least one female member');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate registration ID
      const regId = `MVLUHACK${String(Math.floor(Math.random() * 100) + 1).padStart(2, '0')}`;
      setRegistrationId(regId);
      setSubmissionSuccess(true);
      
      // In real implementation:
      // 1. Store data in Google Sheet
      // 2. Upload ID cards to Google Drive
      // 3. Send WhatsApp/SMS notifications
      // 4. Send confirmation email
      
    } catch (error) {
      alert('Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const femaleCount = participants.filter(p => p.gender === 'Female').length;

  if (submissionSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 flex items-center justify-center">
        <div className="max-w-2xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Registration Successful!</h2>
            <p className="text-gray-600 mb-4">
              Your team has been successfully registered for MVLU Hackathon 2025.
            </p>
            <div className="bg-blue-50 p-4 rounded-lg mb-6">
              <p className="text-sm text-gray-600 mb-2">Your Registration ID:</p>
              <p className="text-2xl font-bold text-blue-600">{registrationId}</p>
            </div>
            <div className="text-left space-y-2 text-sm text-gray-600">
              <p>✓ Registration data saved to Google Sheet</p>
              <p>✓ ID cards uploaded to Google Drive</p>
              <p>✓ Confirmation sent via WhatsApp</p>
              <p>✓ Email confirmation will be sent shortly</p>
            </div>
            <p className="text-sm text-gray-500 mt-6">
              Please save your Registration ID for future reference.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Team Registration</h1>
          <p className="text-xl text-gray-600">MVLU Hackathon 2025</p>
          <div className="mt-4 bg-yellow-100 border border-yellow-400 rounded-lg p-4 inline-block">
            <div className="flex items-center space-x-2">
              <CreditCard className="h-5 w-5 text-yellow-600" />
              <span className="text-yellow-800 font-semibold">Registration Fee: ₹120 per team</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Team Name */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
              <Users className="h-6 w-6 mr-2 text-blue-600" />
              Team Details
            </h2>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Team Name *
              </label>
              <input
                type="text"
                value={teamName}
                onChange={(e) => {
                  setTeamName(e.target.value);
                  checkTeamNameAvailability(e.target.value);
                }}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter unique team name (no college name allowed)"
                required
              />
              {teamNameAvailable === true && (
                <p className="text-green-600 text-sm mt-1 flex items-center">
                  <Check className="h-4 w-4 mr-1" />
                  Team name is available
                </p>
              )}
              {teamNameAvailable === false && (
                <p className="text-red-600 text-sm mt-1 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  Team name is already taken
                </p>
              )}
            </div>
          </div>

          {/* Participants */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Team Members (6 required)
            </h2>
            <div className="mb-4 bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Important:</strong> At least one member must be female. 
                Current female members: <span className="font-semibold">{femaleCount}</span>
              </p>
            </div>

            <div className="grid gap-8">
              {participants.map((participant, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-6 bg-gray-50">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Member {index + 1} {index === 0 && '(Team Leader)'}
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                      <input
                        type="text"
                        value={participant.name}
                        onChange={(e) => updateParticipant(index, 'name', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Roll Number *</label>
                      <input
                        type="text"
                        value={participant.rollNumber}
                        onChange={(e) => updateParticipant(index, 'rollNumber', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Department *</label>
                      <select
                        value={participant.department}
                        onChange={(e) => updateParticipant(index, 'department', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        required
                      >
                        <option value="">Select Department</option>
                        {departments.map(dept => (
                          <option key={dept} value={dept}>{dept}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Year *</label>
                      <select
                        value={participant.year}
                        onChange={(e) => updateParticipant(index, 'year', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        required
                      >
                        <option value="">Select Year</option>
                        {years.map(year => (
                          <option key={year} value={year}>{year}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Gender *</label>
                      <select
                        value={participant.gender}
                        onChange={(e) => updateParticipant(index, 'gender', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        required
                      >
                        <option value="">Select Gender</option>
                        {genders.map(gender => (
                          <option key={gender} value={gender}>{gender}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                      <input
                        type="tel"
                        value={participant.phoneNumber}
                        onChange={(e) => updateParticipant(index, 'phoneNumber', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      ID Card Upload *
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-400 transition-colors">
                      <input
                        type="file"
                        accept="image/*,.pdf"
                        onChange={(e) => handleFileUpload(index, e.target.files?.[0] || null)}
                        className="hidden"
                        id={`file-${index}`}
                        required
                      />
                      <label htmlFor={`file-${index}`} className="cursor-pointer">
                        <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600">
                          {participant.idCard ? participant.idCard.name : 'Click to upload ID card'}
                        </p>
                      </label>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Validation Messages */}
          {femaleCount === 0 && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center">
                <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
                <span className="text-red-700">At least one team member must be female.</span>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              disabled={!validateForm() || isSubmitting}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-12 py-4 rounded-lg font-semibold text-lg transition-colors"
            >
              {isSubmitting ? 'Registering...' : 'Register Team'}
            </button>
            <p className="text-sm text-gray-500 mt-2">
              By registering, you agree to all rules and regulations
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Registration;