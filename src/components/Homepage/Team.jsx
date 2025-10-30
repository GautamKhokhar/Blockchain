import React from 'react';
import './Team.css';
import gautam from '../../assets/g.jpeg'
import monali from "../../assets/monali.jpeg";
import aman from "../../assets/aman.jpeg";

const Team = () => {
  return (
    <section className="teamer-sectioner">
      <div className="container">
        <div className="sectioned-headereds">
          <span className="sectioned-labeleds">
            <span className="labeled-decoration"></span>
            Our Creative Team
            <span className="labeled-decoration"></span>
          </span>
          <h2>Meet The <span className="headinger-highlighter">Visionaries</span></h2>
          <p className="sectioned-descriptioner">
            A talented team building the future of blockchain technology
          </p>
        </div>
        <div className="team-members">
          <div className="team-member">
            <div className="member-card">
              <div className="member-avatar">
                <img src={gautam} alt="Gautam" />
                <div className="avatar-overlay"></div>
              </div>
              <div className="member-info">
                <h3>Gautam khokhar</h3>
                <p className="position">SmartContract Developer</p>
                <div className="socials-links">
                  <a href="#"><i className="fab fa-linkedin"></i></a>
                  <a href="#"><i className="fab fa-github"></i></a>
                  <a href="#"><i className="fab fa-twitter"></i></a>
                </div>
              </div>
              <div className="card-corner"></div>
            </div>
          </div>
          <div className="team-member">
            <div className="member-card">
              <div className="member-avatar">
                <img src={monali} alt="Monali" />
                <div className="avatar-overlay"></div>
              </div>
              <div className="member-info">
                <h3>Monali</h3>
                <p className="position">Frontend Developer</p>
                <div className="socials-links">
                  <a href="#"><i className="fab fa-linkedin"></i></a>
                  <a href="#"><i className="fab fa-github"></i></a>
                  <a href="#"><i className="fab fa-twitter"></i></a>
                </div>
              </div>
              <div className="card-corner"></div>
            </div>
          </div>
          <div className="team-member">
            <div className="member-card">
              <div className="member-avatar">
                <img src={aman} alt="Amandeep" />
                <div className="avatar-overlay"></div>
              </div>
              <div className="member-info">
                <h3>Amandeep</h3>
                <p className="position">Backend Developer</p>
                <div className="socials-links">
                  <a href="#"><i className="fab fa-linkedin"></i></a>
                  <a href="#"><i className="fab fa-github"></i></a>
                  <a href="#"><i className="fab fa-twitter"></i></a>
                </div>
              </div>
              <div className="card-corner"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Team;