import React from "react";
import "./CTA.css";

const CTA = () => {
  return (
    <section className="cta-wrapper">
      <div className="cta-container">
        {/* Left: Call to Action Content */}
        <div className="cta-left">
          <div className="header-decoration">
            <span className="decor-line"></span>
            <span className="decor-dot"></span>
            <span className="decor-line"></span>
          </div>
          <h2 className="ctar-titles">Build the Future of Supply Chain</h2>
          <p className="ctar-descriptions">
            Join our open blockchain network where security meets transparency. 
            Designed for innovators, educators, and real-world impact.
          </p>
          <div className="ctar-buttons">
            <a href="#" className="ctar-btn primary">
              <i className="fab fa-github me-2"></i> GitHub Repo
            </a>
            <a href="#" className="ctar-btn secondary">
              <i className="fas fa-paper-plane me-2"></i> Talk to Us
            </a>
          </div>
        </div>

        {/* Right: Feature Highlights */}
        <div className="ctas-rights">
          <div className="featured-cards">
            <div className="featured-cardd blue-accent">
              <div className="cards-edges"></div>
              <div className="cards-icons-containers">
                <div className="cards-icons">
                  <i className="fas fa-cube"></i>
                </div>
              </div>
              <div className="cardi-contents">
                <h5>Decentralized Storage</h5>
                <p>Data is saved directly on blockchain nodes — tamper-free.</p>
              </div>
              <div className="card-dots"></div>
            </div>

            <div className="featured-cardd green-accent">
              <div className="cards-edges"></div>
              <div className="cards-icons-containers">
                <div className="cards-icons">
                  <i className="fas fa-users"></i>
                </div>
              </div>
              <div className="cardi-contents">
                <h5>Open Collaboration</h5>
                <p>Work with a community of developers and stakeholders.</p>
              </div>
              <div className="card-dots"></div>
            </div>

            <div className="featured-cardd purple-accent">
              <div className="cards-edges"></div>
              <div className="cards-icons-containers">
                <div className="cards-icons">
                  <i className="fas fa-shield-alt"></i>
                </div>
              </div>
              <div className="cardi-contents">
                <h5>Smart Contract Security</h5>
                <p>Only authorized actors can record or update supply data.</p>
              </div>
              <div className="card-dots"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;