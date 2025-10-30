import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiCheckCircle, FiBox, FiTruck, FiPackage, FiDollarSign } from 'react-icons/fi';
import './BlockchainFeatures.css';

// Define static initial data outside the component to prevent re-creation on every render.
const initialBlocks = [
  { id: 1, hash: '0x4a7d1ed1', product: 'Raw Materials', location: 'Supplier A', timestamp: '2025-09-08 08:30:45', icon: <FiBox /> },
  { id: 2, hash: '0x8b3f2e91', product: 'Components', location: 'Manufacturer B', timestamp: '2025-09-08 14:22:18', icon: <FiPackage /> },
  { id: 3, hash: '0xc56a4180', product: 'Assembly', location: 'Factory C', timestamp: '2025-09-08 19:45:31', icon: <FiTruck /> },
];

const BlockchainFeatures = () => {
  // 1. Initialize the state directly with the initial data.
  const [blockData, setBlockData] = useState(initialBlocks);

  // 2. The useEffect hook now has an empty dependency array [] to ensure it only runs ONCE.
  useEffect(() => {
    const interval = setInterval(() => {
      // 3. Use the "functional update" form of setState to access the latest state.
      setBlockData(prevBlockData => {
        if (prevBlockData.length < 6) {
          const icons = [<FiDollarSign />, <FiPackage />, <FiCheckCircle />];
          const products = ['Finished Goods', 'Distributor E', 'Retailer F'];
          const locations = ['Warehouse D', 'Distribution Center', 'Store Shelf'];
          
          const newBlock = {
            id: prevBlockData.length + 1,
            hash: `0x${Math.random().toString(16).substr(2, 8)}`,
            product: products[prevBlockData.length - 3],
            location: locations[prevBlockData.length - 3],
            timestamp: new Date().toLocaleString('en-IN'), // Using Indian locale for time as per context
            icon: icons[prevBlockData.length - 3] || <FiBox />
          };
          return [...prevBlockData, newBlock];
        }
        
        // 4. Clean up the interval once the condition is met to save resources.
        clearInterval(interval);
        return prevBlockData;
      });
    }, 5000);

    // This is the main cleanup function that runs when the component is unmounted.
    return () => clearInterval(interval);
  }, []); // The empty array is the key to fixing the loop.

  return (
    <div className="blockchain-features">
      {/* Fixed Background Image for the whole component */}
      <div 
        className="fixed-background"
        style={{
          backgroundImage: "url('https://plus.unsplash.com/premium_photo-1661930645394-9d46a620a4e0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTkzfHxibG9ja2NoYWlufGVufDB8fDB8fHww')"
        }}
      ></div>

      {/* Content that scrolls over the fixed background */}
      <div className="content-overlay">
        {/* Enhanced Animated Background */}
        <div className="blockchain-background">
          <div className="floating-node node-1"></div>
          <div className="floating-node node-2"></div>
          <div className="floating-node node-3"></div>
          <div className="floating-node node-4"></div>
          <div className="floating-node node-5"></div>
          <div className="connecting-line"></div>
          <div className="blockchain-grid"></div>
          <div className="pulse-ring"></div>
          <div className="pulse-ring ring-2"></div>
        </div>

        <div className="featured-container">
          {/* Blockchain Visualizer */}
          <motion.div 
            className="blockchain-visualizer"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3>Live Blockchain Transparency</h3>
            <p>Watch as product movements are recorded on the immutable ledger</p>
            
            <div className="blockchain-container">
              <div className="blockchain">
                {blockData.map((block, index) => (
                  <motion.div 
                    key={block.id}
                    className="block"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  >
                    <div className="blockss-icons">
                      {block.icon}
                    </div>
                    <div className="block-header">
                      <span className="block-number">Block #{block.id}</span>
                      <span className="block-hash">{block.hash}</span>
                    </div>
                    <div className="block-data">
                      <div className="data-row">
                        <span className="data-label">Product:</span>
                        <span className="data-value">{block.product}</span>
                      </div>
                      <div className="data-row">
                        <span className="data-label">Location:</span>
                        <span className="data-value">{block.location}</span>
                      </div>
                      <div className="data-row">
                        <span className="data-label">Timestamp:</span>
                        <span className="data-value">{block.timestamp}</span>
                      </div>
                    </div>
                    {index < blockData.length - 1 && (
                      <div className="blocks-connectors">
                        <div className="connectors-lines"></div>
                        <div className="connectors-arrows"></div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Smart Contract Demo */}
          <motion.div 
            className="smart-contract-demo mb-5"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3>Smart Contract Process</h3>
            <p>Experience how automated agreements execute when conditions are met</p>
            
            <div className="contract-container">
              <div className="contract-scenario">
                <motion.div className="scenario-step" whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                  <div className="step-icon">1</div>
                  <div className="step-content">
                    <h4>Product Shipped</h4>
                    <p>Supplier ships goods with IoT temperature monitoring</p>
                  </div>
                </motion.div>
                <motion.div className="scenario-step" whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                  <div className="step-icon">2</div>
                  <div className="step-content">
                    <h4>In Transit</h4>
                    <p>Goods are in transit with real-time tracking</p>
                  </div>
                </motion.div>
                <motion.div className="scenario-step" whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                  <div className="step-icon">3</div>
                  <div className="step-content">
                    <h4>Condition Verification</h4>
                    <p>Smart contract verifies temperature conditions are maintained</p>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default BlockchainFeatures;