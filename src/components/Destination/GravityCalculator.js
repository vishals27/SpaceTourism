import React, { useState } from 'react';
import './GravityCalculator.css';

const gravityFactors = {
  Moon: { factor: 0.166, jumpFactor: 6.0, desc: 'Float weightlessly! You can leap over 6x higher on the Moon.' },
  Mars: { factor: 0.38, jumpFactor: 2.64, desc: 'Lighter strides on red soil! Jump 2.6x higher on Mars.' },
  Europa: { factor: 0.134, jumpFactor: 7.46, desc: 'Extreme ice mobility! Skate and jump 7.5x higher.' },
  Titan: { factor: 0.138, jumpFactor: 7.25, desc: 'With human wings, you could fly in Titan\'s dense atmosphere!' }
};

export default function GravityCalculator({ destinationName = 'Moon' }) {
  const [earthWeight, setEarthWeight] = useState(70); // kg default
  const [unit, setUnit] = useState('kg');
  const [isJumping, setIsJumping] = useState(false);

  const destData = gravityFactors[destinationName] || gravityFactors.Moon;
  const destinationWeight = (earthWeight * destData.factor).toFixed(1);
  const jumpHeightCm = (earthWeight ? 45 * destData.jumpFactor : 0).toFixed(0); // Avg Earth jump ~45cm

  const triggerJump = () => {
    setIsJumping(true);
    setTimeout(() => setIsJumping(false), 1200);
  };

  return (
    <div className="gravity-calculator-card">
      <div className="calc-header">
        <span className="calc-badge uppercase ff-san-cond fs-200">Interactive Physics</span>
        <h3 className="ff-serif fs-600 uppercase">Gravity & Weight Simulator</h3>
      </div>

      <p className="calc-desc ff-san-normal fs-300">
        Gravity on <strong>{destinationName}</strong> is only <strong>{(destData.factor * 100).toFixed(1)}%</strong> of Earth's gravity.
      </p>

      <div className="calc-controls">
        <div className="input-group">
          <label className="ff-san-cond fs-200 uppercase letter-spacing-2">Your Weight on Earth:</label>
          <div className="slider-box flex">
            <input 
              type="range" 
              min="30" 
              max="150" 
              value={earthWeight} 
              onChange={(e) => setEarthWeight(Number(e.target.value))}
              className="weight-slider"
            />
            <div className="weight-display ff-serif fs-500">
              {earthWeight} 
              <button 
                className="unit-toggle" 
                onClick={() => setUnit(unit === 'kg' ? 'lbs' : 'kg')}
              >
                {unit}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="calc-results grid">
        <div className="result-box">
          <span className="result-label ff-san-cond fs-200 uppercase">Weight on {destinationName}</span>
          <div className="result-value ff-serif fs-700 text-accent">
            {unit === 'kg' ? destinationWeight : (destinationWeight * 2.20462).toFixed(1)} <span className="unit-label">{unit}</span>
          </div>
        </div>

        <div className="result-box">
          <span className="result-label ff-san-cond fs-200 uppercase">Estimated Jump Height</span>
          <div className="result-value ff-serif fs-700 text-accent">
            {jumpHeightCm} <span className="unit-label">cm</span>
          </div>
        </div>
      </div>

      <div className="jump-simulator-container">
        <div className={`astronaut-character ${isJumping ? 'jumping' : ''}`}>
          🧑‍🚀
        </div>
        <div className="surface-line">
          <span>{destinationName} Surface</span>
        </div>
        <button className="jump-btn uppercase ff-san-cond fs-300 letter-spacing-2" onClick={triggerJump}>
          {isJumping ? 'Wheeee! Zero-G Jump...' : 'Test Jump on ' + destinationName}
        </button>
      </div>

      <p className="fun-fact ff-san-normal fs-200">
        💡 {destData.desc}
      </p>
    </div>
  );
}
