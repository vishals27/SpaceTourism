import React, { useState } from 'react';
import './DockingGame.css';

export default function DockingGame() {
  const [gameState, setGameState] = useState('idle'); // idle, waiting, ready, finished
  const [reactionTime, setReactionTime] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [timerId, setTimerId] = useState(null);

  const startTest = () => {
    setGameState('waiting');
    setReactionTime(null);

    const delay = Math.floor(Math.random() * 3000) + 2000; // 2s - 5s
    const id = setTimeout(() => {
      setGameState('ready');
      setStartTime(Date.now());
    }, delay);

    setTimerId(id);
  };

  const handleActionClick = () => {
    if (gameState === 'waiting') {
      clearTimeout(timerId);
      setGameState('too-early');
    } else if (gameState === 'ready') {
      const time = Date.now() - startTime;
      setReactionTime(time);
      setGameState('finished');
    }
  };


  const getRank = (ms) => {
    if (ms < 220) return { title: '👨‍🚀 COMMANDER RANK', color: '#4ef0d0', badge: 'TOP 1% QUALIFIED' };
    if (ms < 300) return { title: '🛸 PILOT RANK', color: '#00d2ff', badge: 'QUALIFIED PILOT' };
    if (ms < 400) return { title: '🛰️ MISSION SPECIALIST', color: '#ffd166', badge: 'QUALIFIED CREW' };
    return { title: '🧪 CADET IN TRAINING', color: '#ff6b6b', badge: 'NEEDS MORE TRAINING' };
  };

  return (
    <div className="docking-game-card">
      <div className="game-header">
        <span className="game-badge uppercase ff-san-cond fs-200">Astronaut Qualification Test</span>
        <h3 className="ff-serif fs-600 uppercase">Space Docking Reaction Simulator</h3>
      </div>

      <p className="game-desc ff-san-normal fs-300">
        Test your reflexes to see if you qualify to join Commander Douglas and the Space Tourism crew.
      </p>

      <div className="game-stage">
        {gameState === 'idle' && (
          <div className="stage-content">
            <div className="stage-icon">🛸</div>
            <button className="game-btn uppercase ff-san-cond fs-300 letter-spacing-2" onClick={startTest}>
              Start Reaction Test
            </button>
          </div>
        )}

        {gameState === 'waiting' && (
          <div className="stage-content waiting-box" onClick={handleActionClick}>
            <div className="pulse-indicator red"></div>
            <p className="ff-san-cond fs-400 uppercase letter-spacing-2">
              Stand by... Click IMMEDIATELY when signal turns GREEN!
            </p>
          </div>
        )}

        {gameState === 'ready' && (
          <div className="stage-content ready-box" onClick={handleActionClick}>
            <div className="pulse-indicator green"></div>
            <p className="ff-serif fs-800 uppercase green-text">
              DOCK NOW! CLICK!
            </p>
          </div>
        )}

        {gameState === 'too-early' && (
          <div className="stage-content">
            <p className="ff-serif fs-500 red-text uppercase">
              ⚠️ Thrusters fired too early!
            </p>
            <button className="game-btn uppercase ff-san-cond fs-300 letter-spacing-2" onClick={startTest}>
              Try Again
            </button>
          </div>
        )}

        {gameState === 'finished' && reactionTime && (
          <div className="stage-content result-box-game">
            <span className="rank-badge" style={{ borderColor: getRank(reactionTime).color, color: getRank(reactionTime).color }}>
              {getRank(reactionTime).badge}
            </span>
            <h4 className="ff-serif fs-700" style={{ color: getRank(reactionTime).color }}>
              {getRank(reactionTime).title}
            </h4>
            <div className="reaction-score ff-serif fs-900 text-accent">
              {reactionTime} <span className="unit-ms">ms</span>
            </div>
            <p className="ff-san-normal fs-300 text-white">
              {reactionTime < 250 ? 'Lightning fast! You have elite astronaut reaction speeds.' : 'Good job! Keep practicing for deep space missions.'}
            </p>
            <button className="game-btn uppercase ff-san-cond fs-300 letter-spacing-2" onClick={startTest}>
              Retake Test
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
