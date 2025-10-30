import React from 'react';
import './HowItWorks.css';

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="how-it-works-section">
      <div className="container">
        {/* Header Section */}
        <div className="sections-headers">
          <div className="headers-badges">PROCESS WORKFLOW</div>
          <h2 className="sections-titles">Supply Chain Integration Process</h2>
          <p className="sections-descriptions">
            A comprehensive blockchain-powered solution designed to transform traditional 
            supply chains through secure, transparent, and efficient processes.
          </p>
        </div>

        {/* Flowchart Container */}
        <div className="flowchart-container">
          {/* Row 1: Start & Step 1 */}
          <div className="flowchart-row">
            <div className="flow-element start-element">
              <div className="element-content">
                <div className="element-icon start-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <polygon points="10,8 16,12 10,16 10,8"/>
                  </svg>
                </div>
                <h3>START</h3>
                <p>Initialize Process</p>
              </div>
            </div>

            <div className="flow-connector horizontal">
              <div className="connector-line"></div>
              <div className="connector-arrow"></div>
            </div>

            <div className="flow-element process-element step-1">
              <div className="element-badge">STEP 1</div>
              <div className="element-content">
                <div className="element-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                </div>
                <h3>Connect Digital Wallet</h3>
                <p>Authenticate using Web3 wallets (MetaMask, WalletConnect) to establish secure blockchain identity</p>
                <div className="tech-tags">
                  <span>Web3 Auth</span>
                  <span>Secure</span>
                </div>
              </div>
            </div>
          </div>

          {/* Vertical Connector */}
          <div className="flow-connector vertical right">
            <div className="connector-line"></div>
            <div className="connector-arrow"></div>
          </div>

          {/* Row 2: Step 2 */}
          <div className="flowchart-row reverse">
            <div className="flow-element process-element step-2">
              <div className="element-badge">STEP 2</div>
              <div className="element-content">
                <div className="element-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <polyline points="14,2 14,8 20,8"/>
                    <line x1="16" y1="13" x2="8" y2="13"/>
                    <line x1="16" y1="17" x2="8" y2="17"/>
                  </svg>
                </div>
                <h3>Register Products</h3>
                <p>Authorized manufacturers add products with complete specifications and digital twins to blockchain</p>
                <div className="tech-tags">
                  <span>Digital Twins</span>
                  <span>NFT Registry</span>
                </div>
              </div>
            </div>

            <div className="flow-connector horizontal">
              <div className="connector-line"></div>
              <div className="connector-arrow"></div>
            </div>

            <div className="flow-element decision-element">
              <div className="element-content">
                <div className="element-icon decision-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 12l2 2 4-4"/>
                    <path d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"/>
                  </svg>
                </div>
                <h3>Validation</h3>
                <p>Product Details Valid?</p>
              </div>
            </div>
          </div>

          {/* Vertical Connector */}
          <div className="flow-connector vertical left">
            <div className="connector-line"></div>
            <div className="connector-arrow"></div>
          </div>

          {/* Row 3: Step 3 */}
          <div className="flowchart-row">
            <div className="flow-element process-element step-3">
              <div className="element-badge">STEP 3</div>
              <div className="element-content">
                <div className="element-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z"/>
                    <path d="M9 12l2 2 4-4"/>
                  </svg>
                </div>
                <h3>Blockchain Storage</h3>
                <p>Smart contracts validate and record all transactions on immutable distributed ledger</p>
                <div className="tech-tags">
                  <span>Smart Contracts</span>
                  <span>Immutable</span>
                </div>
              </div>
            </div>

            <div className="flow-connector horizontal">
              <div className="connector-line"></div>
              <div className="connector-arrow"></div>
            </div>

            <div className="flow-element process-element step-4">
              <div className="element-badge">STEP 4</div>
              <div className="element-content">
                <div className="element-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="3"/>
                    <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1"/>
                  </svg>
                </div>
                <h3>Real-time Monitoring</h3>
                <p>Stakeholders gain permissioned access to track and verify transactions in real-time</p>
                <div className="tech-tags">
                  <span>Live Tracking</span>
                  <span>Analytics</span>
                </div>
              </div>
            </div>
          </div>

          {/* Vertical Connector */}
          <div className="flow-connector vertical right">
            <div className="connector-line"></div>
            <div className="connector-arrow"></div>
          </div>

          {/* Row 4: End */}
          <div className="flowchart-row reverse">
            <div className="flow-element end-element">
              <div className="element-content">
                <div className="element-icon end-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 12l2 2 4-4"/>
                    <path d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"/>
                  </svg>
                </div>
                <h3>COMPLETE</h3>
                <p>Supply Chain Integrated</p>
              </div>
            </div>

            <div className="spacer-element"></div>
            <div className="spacer-element"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;