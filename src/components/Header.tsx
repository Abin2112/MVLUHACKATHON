import React from 'react';

const Header = () => {
  return (
    <div className="bg-blue-600 text-white py-3 px-6">
      <div className="max-w-7xl mx-auto flex justify-center items-center">
        {/* The image tag is added here */}
        <img 
          src="https://res.cloudinary.com/dniaxogth/image/upload/v1756024783/62-LOGO-HEADER-GOLD_oh3tzz.png" 
          alt="College Logo" 
          className="h-12"
        />
      </div>
    </div>
  );
};

export default Header;