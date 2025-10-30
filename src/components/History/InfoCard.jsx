import React from 'react';
import './InfoCard.css';

const InfoCard = () => {
    const hardhatFeatures = [
        { title: "Hardhat Network", description: "A local Ethereum network designed for development with advanced debugging features." },
        { title: "Console Logging", description: "Add console.log() to your Solidity code to debug your smart contracts." },
        { title: "Plugin System", description: "Extend Hardhat's functionality with a rich ecosystem of plugins." },
        { title: "TypeScript Support", description: "First-class support for TypeScript to enhance development experience." }
    ];

    return (
        <>
            {/* Ethereum Section */}
            <section className="ethereum-section">
                <div className="container">
                    <div className="section-header">
                        <div className="header-line"></div>
                        <h2>Ethereum: The Programmable Blockchain</h2>
                        <div className="header-line"></div>
                    </div>
                    
                    <div className="modern-card">
                        <div className="cards-contents">
                            <div className="cards-texts">
                                <div className="accent-bar"></div>
                                <h3>Key Milestones</h3>
                                <div className="milestone-list">
                                    <div className="milestone-item">
                                        <div className="milestone-year">2013</div>
                                        <div className="milestone-content">
                                            <h4>Ethereum Whitepaper</h4>
                                            <p>Vitalik Buterin publishes the revolutionary Ethereum whitepaper</p>
                                        </div>
                                    </div>
                                    <div className="milestone-item">
                                        <div className="milestone-year">2014</div>
                                        <div className="milestone-content">
                                            <h4>Crowdsale Funding</h4>
                                            <p>Ethereum development funded via groundbreaking crowdsale</p>
                                        </div>
                                    </div>
                                    <div className="milestone-item">
                                        <div className="milestone-year">2015</div>
                                        <div className="milestone-content">
                                            <h4>Frontier Launch</h4>
                                            <p>First live release of the Ethereum network</p>
                                        </div>
                                    </div>
                                    <div className="milestone-item">
                                        <div className="milestone-year">2016</div>
                                        <div className="milestone-content">
                                            <h4>DAO & Hard Fork</h4>
                                            <p>DAO hack leads to Ethereum Classic fork</p>
                                        </div>
                                    </div>
                                    <div className="milestone-item">
                                        <div className="milestone-year">2022</div>
                                        <div className="milestone-content">
                                            <h4>The Merge</h4>
                                            <p>Historic transition to proof-of-stake consensus</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card-image">
                                <div className="image-container">
                                    <img src="https://images.unsplash.com/photo-1590859808308-3d2d9c515b1a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzl8fGJsb2NrY2hhaW58ZW58MHx8MHx8fDA%3D" alt="Ethereum blockchain visualization" />
                                    <div className="image-overlay"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Hardhat Section */}
            <section className="hardhat-section">
                <div className="container">
                    <div className="section-header">
                        <div className="header-line"></div>
                        <h2>Hardhat: Advanced Development Environment</h2>
                        <div className="header-line"></div>
                    </div>
                    
                    <div className="modern-card">
                        <div className="card-content reverse">
                            <div className="card-text">
                                <div className="accent-bar green"></div>
                                <h3>Why Developers Choose Hardhat?</h3>
                                <p className="intro-text">Hardhat provides professional developers with a comprehensive toolkit for building, testing, and deploying Ethereum smart contracts with efficiency and precision.</p>
                                
                                <div className="feature-grid">
                                    {hardhatFeatures.map(feature => (
                                        <div className="feature-card" key={feature.title}>
                                            <div className="feature-icon">
                                                <div className="icon-circle"></div>
                                            </div>
                                            <div className="feature-content">
                                                <h4>{feature.title}</h4>
                                                <p>{feature.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="card-image">
                                <div className="image-container">
                                    <img src="https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" alt="Development workspace" />
                                    <div className="image-overlay green"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default InfoCard;