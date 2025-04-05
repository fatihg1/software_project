import React from 'react';

const SeatIcon = ({ taken, selected, onClick, number, type }) => {
  const fillColor = taken ? '#ef4444' : selected ? '#22c55e' : '#ffffff';
  const strokeColor = taken ? '#b91c1c' : selected ? '#15803d' : '#94a3b8';
  const textColor = taken || selected ? '#ffffff' : '#334155';
  const cursor = taken ? 'not-allowed' : 'pointer';

  // Size classes based on seat type
  const dimensions = {
    business: { width: 32, height: 32 },
    sleeper: { width: 40, height: 40 },
    lodge: { width: 40, height: 40 },
    economy: { width: 32, height: 32 }
  }[type];

  return (
    <div 
      className="relative inline-block"
      style={{ 
        cursor,
        width: dimensions.width,
        height: dimensions.height
      }}
      onClick={!taken ? onClick : undefined}
    >
      <svg 
        viewBox="0 0 24 24" 
        xmlns="http://www.w3.org/2000/svg"
        style={{
          fill: fillColor,
          stroke: strokeColor,
          strokeWidth: 1.5
        }}
        className="transition-colors duration-200 w-full h-full"
      >
        {type === 'sleeper' ? (
          /* Bed icon for sleeper wagons */
          <>
            <path d="M2 6v12h2V6H2zM20 6v12h2V6h-2z" />
            <path d="M4 6h16v10H4z" />
            <path d="M6 6h12v2H6zM6 14h12v2H6z" />
          </>
        ) : (
          /* Default seat icon for other types */
          <>
            <path d="M7 13v-3a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v3" />
            <path d="M5 17h14a2 2 0 0 0 2-2v-5a2 2 0 0 0-2-2h-1" />
            <path d="M5 10H4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h1" />
            <path d="M17 17v2a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2v-2" />
            <path d="M17 6.12V6a3 3 0 0 0-5.24-2" />
          </>
        )}
      </svg>
      
      {/* Seat number overlay */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xs font-bold z-10"
        style={{ 
          color: textColor,
          textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)'
        }}
      >
        {number}
      </div>
    </div>
  );
};

export default SeatIcon;