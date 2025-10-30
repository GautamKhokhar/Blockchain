import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useRole } from '../../context/RoleContext';
import './Navbar.css';

const Navbar = () => {
  const { role } = useRole();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    console.log('[NavbarModern] User role is:', role);
  }, [role]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className={`cs-navbar-modern ${isScrolled ? 'cs-navbar-scrolled' : ''}`}>
      <div className="cs-navbar-container">
        <Link className="cs-navbar-brand" to="/" onClick={closeMenu}>
          <div className="cs-brand-icon-wrapper">
            <i className="fas fa-link cs-brand-icon"></i>
          </div>
          <span className="cs-brand-text">ChainSecure</span>
        </Link>

        <button
          className={`cs-navbar-toggler ${isMenuOpen ? 'cs-navbar-toggler-active' : ''}`}
          type="button"
          onClick={toggleMenu}
          aria-label="Toggle navigation"
        >
          <span className="cs-navbar-toggler-line"></span>
          <span className="cs-navbar-toggler-line"></span>
          <span className="cs-navbar-toggler-line"></span>
        </button>

        <div className={`cs-navbar-collapse ${isMenuOpen ? 'cs-navbar-collapse-open' : ''}`}>
          <ul className="cs-navbar-nav">
            <li className="cs-nav-item">
              <Link className="cs-nav-link" to="/" onClick={closeMenu}>
                <i className="fas fa-tachometer-alt cs-nav-icon"></i>
                <span className="cs-nav-text">Dashboard</span>
              </Link>
            </li>

            {(role === 'supplier' || role === 'manufacturer' || role === 'admin' || role === 'transporter' || role === 'retailer') && (
              <li className="cs-nav-item">
                <Link className="cs-nav-link" to="/assets" onClick={closeMenu}>
                  <i className="fas fa-boxes cs-nav-icon"></i>
                  <span className="cs-nav-text">Assets</span>
                </Link>
              </li>
            )}

            {(role === 'supplier' || role === 'admin') && (
              <li className="cs-nav-item">
                <Link className="cs-nav-link" to="/upload-docs" onClick={closeMenu}>
                  <i className="fas fa-file-upload cs-nav-icon"></i>
                  <span className="cs-nav-text">Upload Docs</span>
                </Link>
              </li>
            )}

            {role === 'admin' && (
              <li className="cs-nav-item">
                <Link className="cs-nav-link" to="/admin" onClick={closeMenu}>
                  <i className="fas fa-user-shield cs-nav-icon"></i>
                  <span className="cs-nav-text">Admin</span>
                </Link>
              </li>
            )}

            <li className="cs-nav-item cs-nav-item-cta">
              <Link to="/connect-wallet" className="cs-connect-btn" onClick={closeMenu}>
                <i className="fas fa-plug cs-connect-icon"></i>
                <span className="cs-connect-text">Connect Wallet</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;