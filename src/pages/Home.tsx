import React from 'react';
import { Link } from 'react-router-dom';
import { Download, Users, Trophy, Clock } from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative h-screen bg-cover bg-center" // flex classes removed
        style={{
          backgroundImage: `url('https://res.cloudinary.com/dniaxogth/image/upload/v1756025083/mvluground_aolwle.jpg')`
        }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        
        {/* Content Container now handles alignment */}
        <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
          
          {/* This content block will now align left */}
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Welcome to MVLU Hackathon 2025
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-8 leading-relaxed">
              Join the most exciting 12-hour coding marathon! Collaborate, innovate, and build solutions 
              that can change the world. Open to all MVLU college students with E-certificates and opportunities 
              for SIH 2025 selection.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/registration"
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all hover:scale-105 text-center"
              >
                Register Now
              </Link>
              <a
  href="https://res.cloudinary.com/dniaxogth/image/upload/v1756034479/MVLU_Hack_brochure_f2k6ou.jpg"
  target="_blank" 
  rel="noopener noreferrer"
  className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-gray-800 px-8 py-4 rounded-lg text-lg font-semibold transition-all text-center inline-flex items-center justify-center"
>
  <Download className="inline h-5 w-5 mr-2" />
  Download Brochure
</a>
            </div>
          </div>

        </div>
      </section>

      {/* Event Highlights */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">12 Hours</h3>
              <p className="text-gray-600">Intensive coding marathon to build innovative solutions</p>
            </div>
            <div className="text-center p-6">
              <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Team of 6</h3>
              <p className="text-gray-600">Form teams with diverse skills and at least one female member</p>
            </div>
            <div className="text-center p-6">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">SIH 2025</h3>
              <p className="text-gray-600">Top teams get nominated for Smart India Hackathon 2025</p>
            </div>
          </div>
        </div>
      </section>

      {/* What is Hackathon */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
            What is Hackathon?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Video Container 1 */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="aspect-video bg-gray-200 flex items-center justify-center">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/lWUm1pCgo6U"
                  title="What is a Hackathon?"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Introduction to Hackathons</h3>
                <p className="text-gray-600">Learn about the basics of hackathons and how to participate effectively.</p>
              </div>
            </div>

            {/* Video Container 2 */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="aspect-video bg-gray-200 flex items-center justify-center">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/VROOQCTqcEk"
                  title="How to Win a Hackathon"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Tips for Success</h3>
                <p className="text-gray-600">Expert tips and strategies to make your hackathon project stand out.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Join the Challenge?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Registration Fee: ₹120 per team.
          </p>
          <Link
            to="/registration"
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-10 py-4 rounded-lg text-xl font-semibold transition-all hover:scale-105 inline-block"
          >
            Register Your Team Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;