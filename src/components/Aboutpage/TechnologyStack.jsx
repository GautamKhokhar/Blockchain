import React, { useState, useEffect } from 'react';
import './TechnologyStack.css';

const TechnologyStack = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [visibleCards, setVisibleCards] = useState(new Set());

  const technologies = [
    {
      name: "Ethereum",
      icon: "🔷",
      description: "Smart contracts & blockchain infrastructure for secure transactions",
      category: "Blockchain",
      color: "#6366F1",
      bgColor: "rgba(99, 102, 241, 0.1)",
      borderColor: "rgba(99, 102, 241, 0.3)"
    },
    {
      name: "Hardhat",
      icon: "🛠️",
      description: "Ethereum development environment for professional smart contract workflows",
      category: "Development",
      color: "#F59E0B",
      bgColor: "rgba(245, 158, 11, 0.1)",
      borderColor: "rgba(245, 158, 11, 0.3)"
    },
    {
      name: "React",
      icon: "⚛️",
      description: "Modern frontend framework for dynamic user interfaces",
      category: "Frontend",
      color: "#0EA5E9",
      bgColor: "rgba(14, 165, 233, 0.1)",
      borderColor: "rgba(14, 165, 233, 0.3)"
    },
    {
      name: "Node.js",
      icon: "🟢",
      description: "High-performance backend server runtime environment",
      category: "Backend",
      color: "#10B981",
      bgColor: "rgba(16, 185, 129, 0.1)",
      borderColor: "rgba(16, 185, 129, 0.3)"
    },
    {
      name: "MongoDB",
      icon: "🍃",
      description: "Scalable NoSQL database management system",
      category: "Database",
      color: "#EF4444",
      bgColor: "rgba(239, 68, 68, 0.1)",
      borderColor: "rgba(239, 68, 68, 0.3)"
    },
    {
      name: "Web3.js",
      icon: "🌐",
      description: "Powerful blockchain interaction library for dApps",
      category: "Integration",
      color: "#8B5CF6",
      bgColor: "rgba(139, 92, 246, 0.1)",
      borderColor: "rgba(139, 92, 246, 0.3)"
    }
  ];
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.dataset.index);
            setVisibleCards(prev => new Set([...prev, index]));
          }
        });
      },
      { threshold: 0.1 }
    );

    const cards = document.querySelectorAll('.tech-card');
    cards.forEach(card => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="tech-stack-section">
      {/* Background Elements */}
      <div className="background-elements">
        <div className="floating-orb orb-1"></div>
        <div className="floating-orb orb-2"></div>
        <div className="floating-orb orb-3"></div>
        <div className="grid-pattern"></div>
      </div>

      <div className="container">
        {/* Section Header */}
        <div className="sectioner-headered">
          <div className="headerer-badger">
            <span className="badged-iconer">⚡</span>
            <span>Technology Excellence</span>
          </div>
          <h2 className="mains-titled">Our Tech Arsenal</h2>
          <p className="subtitled">
            Cutting-edge technologies and frameworks powering the next generation of supply chain solutions
          </p>
        </div>

        {/* Technology Grid */}
        <div className="tech-grid">
          {technologies.map((tech, index) => {
            const isVisible = visibleCards.has(index);
            const isHovered = hoveredCard === index;

            return (
              <div
                key={index}
                data-index={index}
                className={`tech-card ${isVisible ? 'visible' : ''} ${isHovered ? 'hovered' : ''}`}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{
                  animationDelay: `${index * 150}ms`,
                  backgroundColor: tech.bgColor,
                  borderColor: tech.borderColor,
                  '--tech-color': tech.color
                }}
              >
                {/* Card Background Gradient */}
                <div className="card-gradient"></div>

                {/* Card Header */}
                <div className="cards-headers">
                  <div className="tech-icon">
                    <span className="icon-emoji">{tech.icon}</span>
                    <div className="icon-glow"></div>
                  </div>
                  <div className="category-badge">
                    <span>{tech.category}</span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="card-content">
                  <h3 className="tech-name">{tech.name}</h3>
                  <p className="tech-description">{tech.description}</p>
                </div>

                {/* Card Footer */}
                <div className="card-footer">
                  <div className="tech-stats">
                    <div className="stat-dot"></div>
                    <div className="stat-dot"></div>
                    <div className="stat-dot"></div>
                  </div>
                </div>

                {/* Hover Effects */}
                <div className="hover-border"></div>
                <div className="shimmer-effect"></div>

                {/* Card Number */}
                <div className="card-number">{String(index + 1).padStart(2, '0')}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TechnologyStack;