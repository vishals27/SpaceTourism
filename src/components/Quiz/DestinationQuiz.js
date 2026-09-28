import React, { useState } from 'react';
import './DestinationQuiz.css';
import NavBar from '../Navigation/Navigation';
import { Link } from 'react-router-dom';

const quizQuestions = [
  {
    id: 1,
    question: "What is your ideal space vacation vibe?",
    options: [
      { text: "Hiking desolate canyon trails & red dunes", dest: "mars" },
      { text: "Historical historic human landing monuments", dest: "moon" },
      { text: "Extreme ice skating on sub-surface ocean crusts", dest: "europa" },
      { text: "Floating through thick hazy liquid methane lakes", dest: "titan" }
    ]
  },
  {
    id: 2,
    question: "How long are you willing to stay in hyper-sleep?",
    options: [
      { text: "Just 3 days - keep it quick and sweet", dest: "moon" },
      { text: "9 months - perfect time to read & train", dest: "mars" },
      { text: "3 years - I want a deep outer-solar system journey", dest: "europa" },
      { text: "7 years - I am ready for the ultimate frontier", dest: "titan" }
    ]
  },
  {
    id: 3,
    question: "What activity excites you the most?",
    options: [
      { text: "Climbing Olympus Mons, the solar system's highest peak", dest: "mars" },
      { text: "Leaping 6x higher in low Lunar gravity", dest: "moon" },
      { text: "Exploring subsurface ocean life habitats", dest: "europa" },
      { text: "Flying with human wings in dense low-g atmosphere", dest: "titan" }
    ]
  }
];

const destinationMatches = {
  moon: { name: 'Moon', desc: 'The historic first step! Perfect for a quick weekend getaway to experience low gravity.', img: '/assets/destination/image-moon.png' },
  mars: { name: 'Mars', desc: 'The Red Planet! Ideal for adventurous souls wanting to explore vast canyons and ancient rivers.', img: '/assets/destination/image-mars.png' },
  europa: { name: 'Europa', desc: 'Jupiter\'s mysterious ice moon! Perfect for scientists and ice skaters looking for subsurface ocean marvels.', img: '/assets/destination/image-europa.png' },
  titan: { name: 'Titan', desc: 'Saturn\'s giant moon! A futuristic paradise where dense atmosphere lets humans fly with artificial wings.', img: '/assets/destination/image-titan.png' }
};

export default function DestinationQuiz() {
  const [currentStep, setCurrentStep] = useState(0);
  const [scores, setScores] = useState({ moon: 0, mars: 0, europa: 0, titan: 0 });
  const [result, setResult] = useState(null);

  const handleAnswer = (destKey) => {
    const updatedScores = { ...scores, [destKey]: scores[destKey] + 1 };
    setScores(updatedScores);

    if (currentStep + 1 < quizQuestions.length) {
      setCurrentStep(currentStep + 1);
    } else {
      let topDest = 'mars';
      let maxScore = -1;
      Object.keys(updatedScores).forEach(key => {
        if (updatedScores[key] > maxScore) {
          maxScore = updatedScores[key];
          topDest = key;
        }
      });
      setResult(topDest);
    }
  };

  const resetQuiz = () => {
    setCurrentStep(0);
    setScores({ moon: 0, mars: 0, europa: 0, titan: 0 });
    setResult(null);
  };


  return (
    <div className="quiz-page">
      <NavBar activeClass={["", "", "", "", ""]} />
      
      <main className="container flow">
        <h1 className="numbered-title marginTop"><span>05</span> Celestial Destination Matcher</h1>

        <div className="quiz-card-wrapper">
          {!result ? (
            <div className="quiz-card">
              <div className="quiz-progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${((currentStep + 1) / quizQuestions.length) * 100}%` }}
                ></div>
              </div>

              <span className="question-count ff-san-cond fs-300 text-accent uppercase letter-spacing-2">
                Question {currentStep + 1} of {quizQuestions.length}
              </span>

              <h2 className="quiz-question ff-serif fs-700">
                {quizQuestions[currentStep].question}
              </h2>

              <div className="quiz-options grid">
                {quizQuestions[currentStep].options.map((opt, idx) => (
                  <button 
                    key={idx} 
                    className="quiz-option-btn flex"
                    onClick={() => handleAnswer(opt.dest)}
                  >
                    <span className="option-num ff-serif fs-400">0{idx + 1}</span>
                    <span className="option-text ff-san-normal fs-400">{opt.text}</span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="quiz-result-card text-center">
              <span className="result-badge uppercase ff-san-cond fs-200">Your Perfect Match</span>
              <h2 className="ff-serif fs-800 text-accent uppercase">
                {destinationMatches[result].name}
              </h2>

              <img 
                src={process.env.PUBLIC_URL + destinationMatches[result].img} 
                alt={destinationMatches[result].name}
                className="result-planet-img"
              />

              <p className="ff-san-normal fs-400 quiz-result-desc">
                {destinationMatches[result].desc}
              </p>

              <div className="result-actions flex">
                <Link 
                  to={`/SpaceTourism/destination/${result}`}
                  className="quiz-action-btn primary uppercase ff-san-cond fs-300 letter-spacing-2"
                >
                  Explore {destinationMatches[result].name}
                </Link>
                <Link 
                  to={`/SpaceTourism/book?dest=${result}`}
                  className="quiz-action-btn secondary uppercase ff-san-cond fs-300 letter-spacing-2"
                >
                  🚀 Book Flight Now
                </Link>
                <button 
                  className="quiz-action-btn outline uppercase ff-san-cond fs-300 letter-spacing-2"
                  onClick={resetQuiz}
                >
                  Retake Quiz
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
