import React from 'react';
import './VisionSection.css';

const VisionSection = () => {
  return (
    <section className="vision-section">
      {/* Background with light-themed image */}
      <div className="background-container">
        <div className="background-overlay"></div>
      </div>

      <div className="vision-container">
        {/* Left Content */}
        <div className="content-column">
          <div className="header-content">
            <div className="subtitle">INNOVATING SUPPLY CHAINS</div>
            <h1 className="title">
              <span className="title-line">Blockchain-Powered</span>
              <span className="title-line accent">Supply Chain</span>
              <span className="title-line">Solutions</span>
            </h1>
          </div>

          <div className="description">
            <p>
              We're revolutionizing supply chain management with blockchain technology that 
              provides unprecedented transparency, security, and efficiency. Our distributed 
              ledger technology ensures every product's journey is immutably documented, 
              building trust across the entire ecosystem.
            </p>
          </div>
        </div>

        {/* Right Visual - Creative Blockchain Visualization */}
        <div className="visuals-columns mt-5">
          <div className="creatives-visuals">
            {/* Main central node */}
            <div className="centrals-nodes">
              <div className="nodes-pulses"></div>
              <div className="nodes-cores">
                <span className="nodes-icons">⛓️</span>
              </div>
              <div className="nodes-rings"></div>
            </div>

            {/* Floating nodes around the center */}
            <div className="floatings-nodes nodes-1">
              <div className="nodes-icons">🏭</div>
              <div className="nodes-labels">Manufacturer</div>
            </div>

            <div className="floatings-nodes nodes-2">
              <div className="nodes-icons">🚢</div>
              <div className="nodes-labels">Shipping</div>
            </div>

            <div className="floatings-nodes nodes-3">
              <div className="nodes-icons">📦</div>
              <div className="nodes-labels">Warehouse</div>
            </div>

            <div className="floatings-nodes nodes-4">
              <div className="nodes-icons">🏪</div>
              <div className="nodes-labels">Retailer</div>
            </div>

            <div className="floatings-nodes nodes-5">
              <div className="nodes-icons">👨‍💼</div>
              <div className="nodes-labels">Customer</div>
            </div>

            {/* Connection lines */}
            <svg className="connections" width="100%" height="100%" viewBox="0 0 100 100">
              <line className="connection" x1="50" y1="50" x2="25" y2="25" />
              <line className="connection" x1="50" y1="50" x2="75" y2="25" />
              <line className="connection" x1="50" y1="50" x2="25" y2="75" />
              <line className="connection" x1="50" y1="50" x2="75" y2="75" />
              <line className="connection" x1="50" y1="50" x2="15" y2="50" />
            </svg>

            {/* Animated data points */}
            <div className="datas-points datas-1"></div>
            <div className="datas-points datas-2"></div>
            <div className="datas-points datas-3"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisionSection;