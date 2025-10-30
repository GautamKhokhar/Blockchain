import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiBox, FiTruck, FiPieChart, 
  FiBarChart2, FiShoppingCart, FiUsers,
  FiCheckCircle
} from 'react-icons/fi';
import './SupplyChainFeatures.css';

const SupplyChainFeatures = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    setIsVisible(true);
    
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      id: 1,
      title: "Real-Time Inventory Tracking",
      description: "Monitor stock levels across all locations with live updates and predictive analytics for restocking.",
      icon: <FiBox />,
      color: "#A78BFA", // Purple
      stats: "98% Accuracy"
    },
    {
      id: 2,
      title: "Intelligent Logistics",
      description: "Optimize shipping routes, reduce delivery times, and cut transportation costs with AI-powered logistics.",
      icon: <FiTruck />,
      color: "#F472B6", // Pink
      stats: "23% Cost Reduction"
    },
    {
      id: 3,
      title: "Supplier Management",
      description: "Streamline vendor relationships, track performance metrics, and automate procurement processes.",
      icon: <FiUsers />,
      color: "#FB7185", // Coral
      stats: "150+ Partners"
    },
    {
      id: 4,
      title: "Demand Forecasting",
      description: "Predict market demands with machine learning algorithms to optimize inventory and reduce waste.",
      icon: <FiBarChart2 />,
      color: "#FDBA74", // Orange
      stats: "95% Forecast Accuracy"
    },
    {
      id: 5,
      title: "Order Management",
      description: "Seamlessly process orders from multiple channels with automated fulfillment and real-time status updates.",
      icon: <FiShoppingCart />,
      color: "#FCD34D", // Yellow
      stats: "99.7% Order Accuracy"
    },
    {
      id: 6,
      title: "Advanced Analytics",
      description: "Gain actionable insights with customizable dashboards and comprehensive supply chain analytics.",
      icon: <FiPieChart />,
      color: "#67E8F9", // Light Blue (kept as it's not traditional blue)
      stats: "50+ Key Metrics"
    }
  ];

  return (
    <section className="supply-chain-features" ref={containerRef}>
      <div className="features-container">
        <motion.div 
          className="features-header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2>Supply Chain Excellence</h2>
          <p>Our comprehensive platform provides end-to-end visibility and control over your supply chain operations</p>
        </motion.div>

        <div className="horizontal-features">
          <div className="features-track">
            {features.map((feature, index) => (
              <motion.div
                key={feature.id}
                className={`horizontal-feature ${activeFeature === index ? 'active' : ''}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ 
                  opacity: isVisible ? 1 : 0, 
                  x: isVisible ? 0 : -20
                }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                onClick={() => setActiveFeature(index)}
                style={{ 
                  background: `linear-gradient(135deg, ${feature.color}15 0%, ${feature.color}08 100%)`,
                  borderLeft: `4px solid ${feature.color}`
                }}
              >
                <div className="feature-icon" style={{ color: feature.color }}>
                  {feature.icon}
                </div>
                <h3>{feature.title}</h3>
                <div className="feature-indicator">
                  <div 
                    className="indicator-dot" 
                    style={{ backgroundColor: feature.color }}
                  ></div>
                </div>
              </motion.div>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeFeature}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="feature-detail-panel"
              style={{ 
                background: `linear-gradient(135deg, ${features[activeFeature].color}10 0%, transparent 100%)`,
                borderTop: `1px solid ${features[activeFeature].color}20`
              }}
            >
              <div className="detail-header">
                <div className="detail-icon" style={{ color: features[activeFeature].color }}>
                  {features[activeFeature].icon}
                </div>
                <h3>{features[activeFeature].title}</h3>
              </div>
              <p>{features[activeFeature].description}</p>
              <div className="detail-stats">
                <FiCheckCircle style={{ color: features[activeFeature].color }} /> 
                <span>{features[activeFeature].stats}</span>
              </div>
              
              {/* Decorative line instead of button */}
              <div 
                className="decorative-line"
                style={{ backgroundColor: features[activeFeature].color }}
              ></div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="feature-progress">
          {features.map((_, index) => (
            <div 
              key={index}
              className={`progress-item ${activeFeature === index ? 'active' : ''}`}
              onClick={() => setActiveFeature(index)}
            >
              <div 
                className="progress-bar" 
                style={{ 
                  backgroundColor: features[index].color,
                  width: activeFeature === index ? '100%' : '0%'
                }}
              ></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SupplyChainFeatures;