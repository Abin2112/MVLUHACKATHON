import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Navbar from './components/Navbar';
import WhatsAppFloat from './components/WhatsAppFloat';
import Home from './pages/Home';
import Rules from './pages/Rules';
import Registration from './pages/Registration';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/rules" element={<Rules />} />
            <Route path="/registration" element={<Registration />} />
          </Routes>
        </main>
        <WhatsAppFloat />
      </div>
    </Router>
  );
}

export default App;