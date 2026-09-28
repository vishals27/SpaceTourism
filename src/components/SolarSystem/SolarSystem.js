import React, { useEffect, useRef, useState } from 'react';
import './SolarSystem.css';
import NavBar from '../Navigation/Navigation';

const PLANETS = [
  { id: 'mercury', name: 'Mercury', color: '#b5b5b5', size: 7, rx: 90, ry: 45, speed: 0.04, desc: 'Smallest planet, closest to the Sun with extreme temperatures.' },
  { id: 'venus', name: 'Venus', color: '#e3bb76', size: 11, rx: 140, ry: 70, speed: 0.025, desc: 'Hottest planet with thick, toxic atmosphere and cloud layers.' },
  { id: 'earth', name: 'Earth', color: '#4d9be6', size: 13, rx: 200, ry: 100, speed: 0.018, desc: 'Our home planet, teeming with oceans and vibrant life.' },
  { id: 'mars', name: 'Mars', color: '#e05d38', size: 10, rx: 260, ry: 130, speed: 0.014, desc: 'The Red Planet with iron-rich soil and massive volcanoes.' },
  { id: 'jupiter', name: 'Jupiter', color: '#d8a168', size: 24, rx: 340, ry: 170, speed: 0.009, desc: 'Largest gas giant in the Solar System with its Great Red Spot.' },
  { id: 'saturn', name: 'Saturn', color: '#e4cd9e', size: 20, rx: 430, ry: 215, speed: 0.007, rings: true, desc: 'Famous ringed planet with spectacular icy ring structures.' },
  { id: 'uranus', name: 'Uranus', color: '#74d7e8', size: 15, rx: 510, ry: 255, speed: 0.005, desc: 'Ice giant tilted on its side with pale cyan clouds.' },
  { id: 'neptune', name: 'Neptune', color: '#3978e8', size: 15, rx: 580, ry: 290, speed: 0.0035, desc: 'Deep blue outer ice giant with supersonic winds.' }
];

export default function SolarSystem() {
  const canvasRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [speedMultiplier, setSpeedMultiplier] = useState(1);
  const [selectedPlanet, setSelectedPlanet] = useState(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let animId;
    let width = (canvas.width = canvas.parentElement.clientWidth);
    let height = (canvas.height = canvas.parentElement.clientHeight || 580);

    const handleResize = () => {
      if (canvas && canvas.parentElement) {
        width = canvas.width = canvas.parentElement.clientWidth;
        height = canvas.height = canvas.parentElement.clientHeight || 580;
      }
    };
    window.addEventListener('resize', handleResize);

    // Initial angles for planets
    const planetStates = PLANETS.map((p, idx) => ({
      ...p,
      angle: (idx * Math.PI) / 4 + Math.random() * 0.5
    }));

    // Generate passing comets
    const comets = [
      { x: -100, y: 100, vx: 4, vy: 1.5, length: 120, opacity: 0.8 },
      { x: width * 0.4, y: -50, vx: 5, vy: 2, length: 150, opacity: 0.6 }
    ];

    // Background stars
    const backgroundStars = Array.from({ length: 180 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.5 + 0.5,
      alpha: Math.random() * 0.7 + 0.3
    }));

    const sunX = Math.min(width * 0.18, 180);
    const sunY = height / 2;

    const render = () => {
      // Clear canvas with dark cosmic navy background
      ctx.fillStyle = '#0b0d1b';
      ctx.fillRect(0, 0, width, height);

      // Draw background twinkling stars
      backgroundStars.forEach((star) => {
        ctx.fillStyle = '#ffffff';
        ctx.globalAlpha = star.alpha;
        ctx.fillRect(star.x, star.y, star.size, star.size);
      });
      ctx.globalAlpha = 1.0;

      // Draw Passing Comets with glowing tail (matching sample image!)
      comets.forEach((c) => {
        if (isPlaying) {
          c.x += c.vx * speedMultiplier;
          c.y += c.vy * speedMultiplier;
          if (c.x > width + 200 || c.y > height + 200) {
            c.x = -150;
            c.y = Math.random() * (height * 0.6);
          }
        }

        const grad = ctx.createLinearGradient(c.x, c.y, c.x - c.length, c.y - c.length * 0.4);
        grad.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
        grad.addColorStop(0.3, 'rgba(100, 210, 255, 0.6)');
        grad.addColorStop(1, 'rgba(0, 100, 255, 0)');

        ctx.strokeStyle = grad;
        ctx.lineWidth = 4;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(c.x, c.y);
        ctx.lineTo(c.x - c.length, c.y - c.length * 0.4);
        ctx.stroke();

        // Comet Head Glow
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(c.x, c.y, 4, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw Orbit Ellipses
      planetStates.forEach((p) => {
        const isSel = selectedPlanet && selectedPlanet.id === p.id;
        ctx.strokeStyle = isSel ? 'rgba(78, 240, 208, 0.75)' : 'rgba(255, 255, 255, 0.15)';
        ctx.lineWidth = isSel ? 2.5 : 1;
        ctx.setLineDash(isSel ? [] : [4, 4]);

        ctx.beginPath();
        ctx.ellipse(sunX, sunY, p.rx, p.ry, 0, 0, Math.PI * 2);
        ctx.stroke();
        ctx.setLineDash([]);
      });

      // Draw Sun with Corona Glow (Left side like sample image!)
      const sunRadius = Math.min(width * 0.1, 85);
      const sunGrad = ctx.createRadialGradient(sunX, sunY, 10, sunX, sunY, sunRadius + 50);
      sunGrad.addColorStop(0, '#ffffff');
      sunGrad.addColorStop(0.2, '#ffea75');
      sunGrad.addColorStop(0.6, '#ff8a00');
      sunGrad.addColorStop(1, 'rgba(255, 80, 0, 0)');

      ctx.fillStyle = sunGrad;
      ctx.beginPath();
      ctx.arc(sunX, sunY, sunRadius + 50, 0, Math.PI * 2);
      ctx.fill();

      // Core Sun Body
      ctx.fillStyle = '#ffc83b';
      ctx.beginPath();
      ctx.arc(sunX, sunY, sunRadius, 0, Math.PI * 2);
      ctx.fill();

      // Sun Label
      ctx.fillStyle = '#ffffff';
      ctx.font = '14px "Barlow Condensed", sans-serif';
      ctx.fillText('Sun', sunX, sunY - sunRadius - 12);

      // Draw & Update Planets
      planetStates.forEach((p) => {
        if (isPlaying) {
          p.angle += p.speed * 0.5 * speedMultiplier;
        }

        const px = sunX + Math.cos(p.angle) * p.rx;
        const py = sunY + Math.sin(p.angle) * p.ry;
        const isSel = selectedPlanet && selectedPlanet.id === p.id;

        // Draw Saturn Rings
        if (p.rings) {
          ctx.strokeStyle = 'rgba(228, 205, 158, 0.7)';
          ctx.lineWidth = 4;
          ctx.beginPath();
          ctx.ellipse(px, py, p.size * 2, p.size * 0.6, Math.PI / 6, 0, Math.PI * 2);
          ctx.stroke();
        }

        // Draw Planet Body
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(px, py, isSel ? p.size * 1.3 : p.size, 0, Math.PI * 2);
        ctx.fill();

        // Planet Selection Highlight Ring
        if (isSel) {
          ctx.strokeStyle = '#4ef0d0';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(px, py, p.size * 1.6, 0, Math.PI * 2);
          ctx.stroke();
        }

        // Draw Planet Text Label (Cleanly positioned under planet!)
        ctx.fillStyle = isSel ? '#4ef0d0' : '#ffffff';
        ctx.font = isSel ? 'bold 15px "Barlow", sans-serif' : '13px "Barlow", sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(p.name, px, py + p.size + 16);
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, [isPlaying, speedMultiplier, selectedPlanet]);

  return (
    <div className="solarsystem-page">
      <NavBar activeClass={["", "", "", "", "active"]} />

      <main className="container flow">
        <h1 className="numbered-title marginTop"><span>04</span> Solar System Orbits</h1>

        <div className="solar-canvas-wrapper">
          <canvas ref={canvasRef} className="solar-canvas"></canvas>

          {/* Top Controls Bar */}
          <div className="solar-controls flex">
            <button 
              className="ctrl-btn uppercase ff-san-cond fs-200 letter-spacing-2"
              onClick={() => setIsPlaying(!isPlaying)}
            >
              {isPlaying ? '⏸️ Pause Orbit' : '▶️ Resume Orbit'}
            </button>

            <div className="speed-ctrl flex">
              <span className="ff-san-cond fs-200 uppercase">Speed:</span>
              {[0.5, 1, 2, 4].map((spd) => (
                <button
                  key={spd}
                  className={`speed-btn ${speedMultiplier === spd ? 'active' : ''}`}
                  onClick={() => setSpeedMultiplier(spd)}
                >
                  {spd}x
                </button>
              ))}
            </div>
          </div>

          {/* Planet Cards Selector Row at Bottom (Matching Sample Image!) */}
          <div className="planet-carousel flex">
            {PLANETS.map((p) => (
              <div 
                key={p.id}
                className={`planet-card flex ${selectedPlanet?.id === p.id ? 'active' : ''}`}
                onClick={() => setSelectedPlanet(selectedPlanet?.id === p.id ? null : p)}
              >
                <div 
                  className="card-planet-preview"
                  style={{ backgroundColor: p.color, width: p.size * 1.5, height: p.size * 1.5 }}
                ></div>
                <span className="card-planet-name ff-san-cond fs-200 uppercase letter-spacing-1">{p.name}</span>
              </div>
            ))}
          </div>

          {/* Selected Planet Info Banner */}
          {selectedPlanet && (
            <div className="selected-planet-banner flex">
              <div 
                className="banner-color-dot"
                style={{ backgroundColor: selectedPlanet.color }}
              ></div>
              <div>
                <h3 className="ff-serif fs-500 text-accent uppercase">{selectedPlanet.name}</h3>
                <p className="ff-san-normal fs-200">{selectedPlanet.desc}</p>
              </div>
              <button className="close-banner-btn" onClick={() => setSelectedPlanet(null)}>✕</button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
