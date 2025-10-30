import React from 'react';
import { Link } from 'react-router-dom'; 
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-about">
            <div className="logo">
              <span className="logo-icon">🔗</span>
              <span>SupplyChain DApp</span>
            </div>
            <p className="footer-description">
              A blockchain-powered supply chain management solution developed as a final year Computer Science project.
            </p>
            <div className="social-links">
              <a href="#" aria-label="GitHub">
                <i className="fab fa-github"></i>
              </a>
              <a href="#" aria-label="Twitter">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" aria-label="LinkedIn">
                <i className="fab fa-linkedin"></i>
              </a>
            </div>
          </div>
          <div className="footer-links">
            <div className="link-group">
              <h4>Project</h4>
              <ul>
                <li><Link to="/features"><i className="fas fa-star"></i> Features</Link></li>
                <li><Link to="/education"><i className="fas fa-clock-rotate-left"></i>History</Link></li>
                <li><a href="#"><i className="fas fa-book"></i> Documentation</a></li>
              </ul>
            </div>
            <div className="link-group">
              <h4>Team</h4>
              <ul>
                <li><Link to="/about-us"><i className="fas fa-users"></i> About Us</Link></li>
                <li><a href="#"><i className="fas fa-code-branch"></i> GitHub</a></li>
                <li><Link to="/contact"><i className="fas fa-envelope"></i> Contact</Link></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} SupplyChain DApp - Academic Project</p>
          <div className="legal-links">
            <a href="#">Privacy Policy</a>
            <span>•</span>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;