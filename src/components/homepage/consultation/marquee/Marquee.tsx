"use client";

import React from 'react';


export default function Marquee() {
  const items = Array.from({ length: 6 }); // количество повторений

  return (
    <div className="marq-wrapper">
      <div className="marq-track">
        {items.map((_, index) => (
          <div className="marq-item" key={index}>
            <span>REQUEST EXPERT ADVICE</span>
            <svg width="74" height="82" viewBox="0 0 74 82" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M35.595 45.4328L28.0975 42.1837L4.47503 64.3354L11.9725 67.5845L35.595 45.4328Z" fill="#3CE7B6" />
              <path d="M35.595 45.4328L43.0926 48.6819L43.122 81.0832L35.6245 77.8341L35.595 45.4328Z" fill="#3CE7B6" />
              <path d="M42.0863 40.587L43.0241 48.7111L74 58.1136L73.0622 49.9895L42.0863 40.587Z" fill="#3CE7B6" />
              <path d="M42.0863 40.587L41.1485 32.4629L69.1659 16.2367L70.1037 24.3608L42.0863 40.587Z" fill="#3CE7B6" />
              <path d="M34.6065 37.3456L28.0469 42.2207L0 26.0455L6.55969 21.1705L34.6065 37.3456Z" fill="#3CE7B6" />
              <path d="M34.6065 37.3456L41.1662 32.4707L33.8128 0.916504L27.2531 5.79155L34.6065 37.3456Z" fill="#3CE7B6" />
            </svg>
            <span>REQUEST EXPERT ADVICE</span>
          </div>
        ))}
      </div>
    </div>
  );
}
