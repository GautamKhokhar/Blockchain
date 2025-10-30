import React, { useState } from 'react';
import './AchievementSection.css';

const AchievementSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "AI Integration",
      description: "Implement machine learning algorithms for predictive analytics and intelligent decision-making capabilities",
      image: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80"
    },
    {
      title: "Mobile Application", 
      description: "Develop cross-platform mobile app with React Native for wider accessibility and user engagement",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    },
    {
      title: "Cloud Deployment",
      description: "Migrate to cloud infrastructure for improved scalability, reliability, and cost efficiency",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80"
    },
    {
      title: "Blockchain Implementation",
      description: "Incorporate blockchain technology for enhanced security, transparency, and data integrity",
      image: "https://media.istockphoto.com/id/869423492/photo/futuristic-digital-blockchain-background-fintech-technology.webp?a=1&b=1&s=612x612&w=0&k=20&c=t_naYA_nO8hVYxWiggW4klX3BOt3xdePZVC6H0iXxwo="
    }
  ];

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const goToPrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="achievement-section">
      <div className="academics-headers">
        <div className="headers-decorationed">
          <div className="decoration-line left"></div>
          <div className="header-icon">🚀</div>
          <div className="decoration-line right"></div>
        </div>
        <h1>Project Evolution</h1>
        <p className="subtitler">Future directions for our MCA initiative</p>
        <div className="header-underline"></div>
      </div>
      
      <div className="slideshow-container">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`slide ${index === currentSlide ? 'active' : ''}`}
            style={{backgroundImage: `url(${slide.image})`}}
          >
            <div className="slides-overlays"></div>
            <div className="slides-contents">
              <h2 className="future-title">{slide.title}</h2>
              <p className="future-description">{slide.description}</p>
              <div className="future-line"></div>
            </div>
          </div>
        ))}
        
        {/* Navigation Arrows */}
        <button className="nav-arrow prev" onClick={goToPrevSlide}>
          &#8249;
        </button>
        <button className="nav-arrow next" onClick={goToNextSlide}>
          &#8250;
        </button>
        
        {/* Navigation Dots */}
        <div className="slide-navigation">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`nav-dot ${index === currentSlide ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
            ></button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AchievementSection;