import React from 'react';
import './Hero.css';

const HeroProfessional = () => {
  return (
    <section className="hero-pro">
      <div className="pro-container">
        <div className="pro-content">
          <div className="pro-text">
            <div className="pro-badge">
              <span>Academic Research Project</span>
            </div>
            
            <h1>
              <span className="pro-highlight">Blockchain</span> Enabled 
              <span className="pro-break"><br/></span>
              Supply Chain Transparency
            </h1>
            
            <p className="pro-subtitle">
              A university-led initiative demonstrating how decentralized technology 
              can transform traditional supply chain management through immutable 
              tracking and verification.
            </p>
            
            <div className="pro-tech">
              <div className="tech-item">
                <div className="techs-icons ethereum"></div>
                <span>Ethereum</span>
              </div>
              <div className="tech-item">
                <div className="techs-icons solidity"></div>
                <span>Solidity</span>
              </div>
              <div className="tech-item">
                <div className="techs-icons react"></div>
                <span>React</span>
              </div>
              <div className="tech-item">
                <div className="techs-icons ipfs"></div>
                <span>NODE</span>
              </div>
            </div>
          </div>
          
          <div className="pro-visual">
            <div className="pro-image-container">
              <img 
                src="https://images.unsplash.com/photo-1639762681057-408e52192e55?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="Blockchain network visualization" 
                className="pro-image"
              />
              <div className="pro-shape"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroProfessional;