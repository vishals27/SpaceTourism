import React, { useState, useEffect } from 'react';
import './Booking.css';
import NavBar from '../Navigation/Navigation';
import { useLocation } from 'react-router-dom';

const destinationPrices = {
  moon: { name: 'Moon', price: 150000, duration: '3 days', distance: '384,400 km' },
  mars: { name: 'Mars', price: 450000, duration: '9 months', distance: '225 mil. km' },
  europa: { name: 'Europa', price: 850000, duration: '3 years', distance: '628 mil. km' },
  titan: { name: 'Titan', price: 1200000, duration: '7 years', distance: '1.4 bil. km' }
};

const cabinClasses = {
  standard: { name: 'Standard Orbital Pod', multiplier: 1.0, icon: '🚀' },
  executive: { name: 'Executive Gravity Suite', multiplier: 1.6, icon: '🌌' },
  zerog: { name: 'Zero-G Luxury Penthouse', multiplier: 2.5, icon: '👑' }
};

export default function Booking() {
  const query = new URLSearchParams(useLocation().search);
  const initialDest = query.get('dest') || 'mars';

  const [destination, setDestination] = useState(initialDest);
  const [cabinClass, setCabinClass] = useState('executive');
  const [passengers, setPassengers] = useState(1);
  const [passengerName, setPassengerName] = useState('Commander Alex');
  const [addOns, setAddOns] = useState({
    spacewalk: true,
    dining: false,
    training: true
  });
  const [isBooked, setIsBooked] = useState(false);
  const [ticketId, setTicketId] = useState('');

  useEffect(() => {
    // Generate random futuristic ticket ID
    const randomHex = Math.random().toString(36).substring(2, 8).toUpperCase();
    setTicketId(`ST-${destination.toUpperCase()}-${randomHex}`);
  }, [destination, isBooked]);

  const destInfo = destinationPrices[destination] || destinationPrices.mars;
  const classInfo = cabinClasses[cabinClass];

  let addOnTotal = 0;
  if (addOns.spacewalk) addOnTotal += 50000;
  if (addOns.dining) addOnTotal += 25000;
  if (addOns.training) addOnTotal += 35000;

  const totalPrice = Math.round((destInfo.price * classInfo.multiplier + addOnTotal) * passengers);

  const handleBooking = (e) => {
    e.preventDefault();
    setIsBooked(true);
  };

  const toggleAddOn = (key) => {
    setAddOns(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="booking-page">
      <NavBar activeClass={["", "", "", "", "active"]} />
      
      <main className="container flow">
        <h1 className="numbered-title marginTop"><span>04</span> Space Flight Reservation</h1>

        {!isBooked ? (
          <div className="booking-grid grid">
            <form className="booking-form-card" onSubmit={handleBooking}>
              <h2 className="ff-serif fs-700 uppercase">Mission Flight Builder</h2>
              
              <div className="form-section">
                <label className="ff-san-cond fs-300 uppercase letter-spacing-2">1. Passenger Name</label>
                <input 
                  type="text" 
                  className="space-input" 
                  value={passengerName} 
                  onChange={(e) => setPassengerName(e.target.value)} 
                  required 
                />
              </div>

              <div className="form-section">
                <label className="ff-san-cond fs-300 uppercase letter-spacing-2">2. Target Destination</label>
                <div className="dest-options flex">
                  {Object.keys(destinationPrices).map((key) => (
                    <button
                      type="button"
                      key={key}
                      className={`dest-select-btn ${destination === key ? 'active' : ''}`}
                      onClick={() => setDestination(key)}
                    >
                      {destinationPrices[key].name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-section">
                <label className="ff-san-cond fs-300 uppercase letter-spacing-2">3. Cabin Experience Class</label>
                <div className="cabin-options grid">
                  {Object.keys(cabinClasses).map((key) => (
                    <div 
                      key={key} 
                      className={`cabin-card ${cabinClass === key ? 'active' : ''}`}
                      onClick={() => setCabinClass(key)}
                    >
                      <span className="cabin-icon">{cabinClasses[key].icon}</span>
                      <div className="cabin-info">
                        <h4 className="ff-serif fs-400">{cabinClasses[key].name}</h4>
                        <span className="cabin-rate">x{cabinClasses[key].multiplier} Rate</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>


              <div className="form-section">
                <label className="ff-san-cond fs-300 uppercase letter-spacing-2">4. Passengers & Add-ons</label>
                <div className="passengers-counter flex">
                  <span>Number of Astronauts:</span>
                  <button type="button" onClick={() => setPassengers(Math.max(1, passengers - 1))}>-</button>
                  <span className="count-num ff-serif fs-500">{passengers}</span>
                  <button type="button" onClick={() => setPassengers(Math.min(6, passengers + 1))}>+</button>
                </div>

                <div className="checkbox-addons flex">
                  <label className={`addon-chip ${addOns.spacewalk ? 'active' : ''}`}>
                    <input type="checkbox" checked={addOns.spacewalk} onChange={() => toggleAddOn('spacewalk')} />
                    👨‍🚀 Spacewalk Experience (+$50,000)
                  </label>
                  <label className={`addon-chip ${addOns.dining ? 'active' : ''}`}>
                    <input type="checkbox" checked={addOns.dining} onChange={() => toggleAddOn('dining')} />
                    🍸 Zero-G Fine Dining (+$25,000)
                  </label>
                  <label className={`addon-chip ${addOns.training ? 'active' : ''}`}>
                    <input type="checkbox" checked={addOns.training} onChange={() => toggleAddOn('training')} />
                    🚀 Centrifuge Flight Prep (+$35,000)
                  </label>
                </div>
              </div>

              <button type="submit" className="confirm-booking-btn uppercase ff-san-cond fs-400 letter-spacing-2">
                🛸 Confirm Reservation & Print Ticket
              </button>
            </form>

            <div className="summary-card">
              <h3 className="ff-serif fs-600 uppercase">Trip Overview</h3>
              <div className="summary-details flow">
                <div className="summary-item flex">
                  <span className="label">Destination:</span>
                  <span className="val text-accent ff-serif fs-500">{destInfo.name}</span>
                </div>
                <div className="summary-item flex">
                  <span className="label">Est. Distance:</span>
                  <span className="val">{destInfo.distance}</span>
                </div>
                <div className="summary-item flex">
                  <span className="label">Travel Duration:</span>
                  <span className="val">{destInfo.duration}</span>
                </div>
                <div className="summary-item flex">
                  <span className="label">Cabin Class:</span>
                  <span className="val">{classInfo.name}</span>
                </div>
                <div className="summary-item flex">
                  <span className="label">Passengers:</span>
                  <span className="val">{passengers}</span>
                </div>

                <div className="total-price-box">
                  <span className="total-label ff-san-cond fs-200 uppercase letter-spacing-2">Total Space Credits</span>
                  <h2 className="total-amount ff-serif fs-800 text-accent">
                    ฿{totalPrice.toLocaleString()}
                  </h2>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="ticket-success-wrapper">
            <div className="boarding-pass-card">
              <div className="pass-header flex">
                <div className="brand flex">
                  <span className="logo-emoji">🚀</span>
                  <div>
                    <h3 className="ff-serif fs-500">SPACE TOURISM ORBITAL LINES</h3>
                    <span className="pass-type uppercase ff-san-cond fs-200">Official Spacefarer Boarding Pass</span>
                  </div>
                </div>
                <div className="ticket-id-badge ff-san-cond fs-300">{ticketId}</div>
              </div>

              <div className="pass-body grid">
                <div className="pass-field">
                  <span className="field-label uppercase ff-san-cond fs-200">PASSENGER NAME</span>
                  <p className="field-value ff-serif fs-600">{passengerName}</p>
                </div>
                <div className="pass-field">
                  <span className="field-label uppercase ff-san-cond fs-200">TARGET DESTINATION</span>
                  <p className="field-value ff-serif fs-600 text-accent">{destInfo.name.toUpperCase()}</p>
                </div>
                <div className="pass-field">
                  <span className="field-label uppercase ff-san-cond fs-200">CABIN CLASS</span>
                  <p className="field-value ff-san-normal fs-400">{classInfo.name}</p>
                </div>
                <div className="pass-field">
                  <span className="field-label uppercase ff-san-cond fs-200">SEAT SUITE</span>
                  <p className="field-value ff-serif fs-500">SEAT 0{passengers}A (ZERO-G WINDOW)</p>
                </div>
                <div className="pass-field">
                  <span className="field-label uppercase ff-san-cond fs-200">EST. DEPARTURE</span>
                  <p className="field-value ff-san-normal fs-400">T-MINUS 14 DAYS</p>
                </div>
                <div className="pass-field">
                  <span className="field-label uppercase ff-san-cond fs-200">TOTAL FAID</span>
                  <p className="field-value ff-serif fs-500 text-accent">฿{totalPrice.toLocaleString()}</p>
                </div>
              </div>

              <div className="pass-footer flex">
                <div className="barcode-box flex">
                  {Array.from({ length: 28 }).map((_, i) => (
                    <span key={i} className="bar" style={{ width: `${(i % 3) + 2}px`, opacity: i % 2 === 0 ? 0.9 : 0.4 }}></span>
                  ))}
                </div>
                <button className="print-btn uppercase ff-san-cond fs-200" onClick={() => window.print()}>
                  🖨️ Print Pass
                </button>
                <button className="new-booking-btn uppercase ff-san-cond fs-200" onClick={() => setIsBooked(false)}>
                  Book Another
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
