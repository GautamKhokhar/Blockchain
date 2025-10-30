import React, { useEffect, useRef } from 'react';
import './Features.css';

const Features = () => {
  const cardRefs = useRef([]);

  useEffect(() => {
    const handleScroll = () => {
      cardRefs.current.forEach(card => {
        if (card) {
          const cardTop = card.getBoundingClientRect().top;
          const windowHeight = window.innerHeight;
          
          if (cardTop < windowHeight * 0.8) {
            card.classList.add('card-revealed');
          } else {
            card.classList.remove('card-revealed');
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initialize on mount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="blockchain-features-section">
      <div className="container">
        <div className="section-intro text-center mb-5">
          <span className="sections-badge">Enterprise Blockchain Solutions</span>
          <h2 className="section-title">Transform Your Supply Chain Operations</h2>
          <p className="section-description">
            Leverage cutting-edge blockchain technology for unprecedented transparency and efficiency
          </p>
        </div>

        <div className="blockchain-cards-grid">
          {/* Feature 1 */}
          <div 
            className="blockchain-card" 
            ref={el => cardRefs.current[0] = el}
          >
            <div className="card-highlight-edge"></div>
            <div className="card-hover-layer"></div>
            <div className="card-icon-container">
              <div className="card-icon-bg">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </div>
            </div>
            <h3 className="card-title">Immutable Ledger</h3>
            <p className="card-description">
              Every transaction cryptographically sealed with enterprise-grade security,
              creating an unforgeable chain of custody.
            </p>
            <div className="card-tech-label">
              <span>Ethereum</span>
              <div className="label-underline"></div>
            </div>
          </div>

          {/* Feature 2 */}
          <div 
            className="blockchain-card" 
            ref={el => cardRefs.current[1] = el}
          >
            <div className="card-highlight-edge"></div>
            <div className="card-hover-layer"></div>
            <div className="card-icon-container">
              <div className="card-icon-bg">
                <svg viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </div>
            </div>
            <h3 className="card-title">Smart Contracts</h3>
            <p className="card-description">
              Self-executing agreements with automated compliance checks,
              eliminating intermediaries and reducing costs.
            </p>
            <div className="card-tech-label">
              <span>Solidity</span>
              <div className="label-underline"></div>
            </div>
          </div>

          {/* Feature 3 */}
          <div 
            className="blockchain-card" 
            ref={el => cardRefs.current[2] = el}
          >
            <div className="card-highlight-edge"></div>
            <div className="card-hover-layer"></div>
            <div className="card-icon-container">
              <div className="card-icon-bg">
                <svg viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                  <line x1="2" y1="12" x2="22" y2="12" stroke="currentColor" strokeWidth="2"/>
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </div>
            </div>
            <h3 className="card-title">End-to-End Trace</h3>
            <p className="card-description">
              Real-time tracking with geospatial verification at each checkpoint,
              from origin to final delivery.
            </p>
            <div className="card-tech-label">
              <span>IPFS</span>
              <div className="label-underline"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;