import React from 'react';
import './About.css';

const About = () => {
  return (
    <section className="about-section">
      {/* Background Elements */}
      <div className="abstract-shape shape-1"></div>
      <div className="abstract-shape shape-2"></div>
      
      <div className="about-container">
        {/* Single Line Heading */}
        <div className="about-header">
          <div className="header-line-container">
            <div className="vertical-line"></div>
            <span className="section-tag">RESEARCH PROJECT</span>
          </div>
          <h2 className="section-title">
            Blockchain <span className="title-accent">Supply Chain</span> Transparency
          </h2>
        </div>

        {/* Enhanced Grid Layout */}
        <div className="about-grid">
          {/* Expanded Slanted Image */}
          <div className="image-wrapper">
            <div className="image-slant-container">
              <img 
                src="https://media.istockphoto.com/id/1349092555/photo/businessman-using-a-computer-to-blockchain-technology-concept-with-a-chain-of-encrypted.webp?a=1&b=1&s=612x612&w=0&k=20&c=d6lxhmC81gNg2Ap5ga9Cyrg3m5Ho3nkdKoBxAFtHn-M=" 
                alt="Blockchain technology" 
                className="about-image"
              />
            </div>
          </div>

          {/* Beautiful Curved Cards */}
          <div className="content-block block-1">
            <div className="block-glow"></div>
            <div className="block-inner">
              <div className="block-icon">
                <div className="icon-bg"></div>
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M12 14L21 3H3L12 14Z" fill="#2563EB" stroke="#2563EB" strokeWidth="2"/>
                  <path d="M12 22V14" stroke="#2563EB" strokeWidth="2"/>
                </svg>
              </div>
              <h3>Academic Innovation</h3>
              <p>
                Final year Computer Science project exploring blockchain applications 
                in modern supply chains through hands-on implementation.
              </p>
              <div className="block-footer">
                <div className="block-line"></div>
                <div className="block-arrow">→</div>
              </div>
            </div>
          </div>

          <div className="content-block block-2">
            <div className="block-glow"></div>
            <div className="block-inner">
              <div className="block-icon">
                <div className="icon-bg"></div>
                <svg viewBox="0 0 24 24" fill="none">
                  <rect x="2" y="4" width="20" height="16" rx="2" stroke="#2563EB" strokeWidth="2"/>
                  <path d="M2 10H22" stroke="#2563EB" strokeWidth="2"/>
                  <path d="M6 10V16" stroke="#2563EB" strokeWidth="2"/>
                </svg>
              </div>
              <h3>Technical Breakthrough</h3>
              <p>
                Developed a prototype demonstrating immutable product tracking from 
                manufacturer to consumer using distributed ledger technology.
              </p>
              <div className="block-footer">
                <div className="block-line"></div>
                <div className="block-arrow">→</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;