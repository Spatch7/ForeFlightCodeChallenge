import React from 'react';
import '../componentCSS/compass.css';

const Compass = ({ angle }) => {
  return (
    <div className="compass">
      <svg width="100" height="100" viewBox="0 0 100 100">
        {/* Draw the circle */}
        <circle cx="50" cy="50" r="48" className="circle" />

        {/* Draw the compass needle */}
        <line
          x1="50"
          y1="50"
          x2="50"
          y2="10"
          transform={`rotate(${angle} 50 50)`}
          className="needle"
        />

        {/* Draw cardinal directions */}
        <text x="50" y="15" textAnchor="middle" className="direction">N</text>
        <text x="85" y="50" textAnchor="middle" className="direction">E</text>
        <text x="50" y="85" textAnchor="middle" className="direction">S</text>
        <text x="15" y="50" textAnchor="middle" className="direction">W</text>
      </svg>
    </div>
  );
};

export default Compass;