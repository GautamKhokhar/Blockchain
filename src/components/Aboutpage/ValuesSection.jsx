import React, { useState } from 'react';
import './ValuesSection.css';

const ValuesSection = () => {
  const [activeValue, setActiveValue] = useState(0);

  const values = [
    {
      icon: "🔐",
      title: "Security First",
      description: "Military-grade encryption and blockchain immutability ensure your data remains secure and tamper-proof.",
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
    },
    {
      icon: "👁️",
      title: "Total Transparency",
      description: "Real-time visibility into every step of the supply chain journey for all authorized stakeholders.",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
    },
    {
      icon: "⚡",
      title: "Efficiency",
      description: "Automated processes and smart contracts eliminate paperwork and reduce operational overhead.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
    },
    {
      icon: "🌍",
      title: "Sustainability",
      description: "Digital tracking reduces paper waste and helps optimize routes for lower carbon footprint.",
      image: "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
    }
  ];

  return (
    <section className="values-section">
      <div className="container">
        <div className="sectioned-headered">
          <div className="headered-badged">
            <span className="badge-icon">🌟</span>
            <span>Our Philosophy</span>
          </div>
          <h2 className="decorated-heading">
            Core Values That <span className="heading-highlight">Drive Us Forward</span>
          </h2>
          <p className="subtitles">The foundational principles guiding our innovation and service delivery</p>
        </div>

        <div className="values-container">
          <div className="values-visual">
            <div className="value-image-slide">
              <img src={values[activeValue].image} alt={values[activeValue].title} />
              <div className="slide-overlay"></div>
            </div>
          </div>

          <div className="values-content">
            <div className="value-detail">
              <div className="value-header">
                <div className="value-icon">{values[activeValue].icon}</div>
                <h3>{values[activeValue].title}</h3>
              </div>
              <p>{values[activeValue].description}</p>
              <div className="value-indicator">
                <span>{activeValue + 1}/{values.length}</span>
                <div className="indicator-dots">
                  {values.map((_, index) => (
                    <button
                      key={index}
                      className={`dot ${activeValue === index ? 'active' : ''}`}
                      onClick={() => setActiveValue(index)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="values-grid-mini">
          {values.map((value, index) => (
            <div 
              key={index}
              className={`value-mini-card ${activeValue === index ? 'active' : ''}`}
              onClick={() => setActiveValue(index)}
            >
              <div className="mini-icon">{value.icon}</div>
              <h4>{value.title}</h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValuesSection;