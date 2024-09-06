import React from 'react';
import './Loader.css'; // Import the CSS file for the loader

const Loader = () => {
  return (
    <div className="loader-container">
      <div className="loader">
        <div className="dot dot1"></div>
        <div className="dot dot2"></div>
        <div className="dot dot3"></div>
        <div className="dot dot4"></div>
        <div className="dot dot5"></div>
      </div>
    </div>
  );
};

export default Loader;
