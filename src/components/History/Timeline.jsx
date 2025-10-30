import React from 'react';
import './Timeline.css';

const Timeline = () => {
    return (
        <section className="timeline-section">
            <div className="timeline-container">
                <h2>Blockchain Evolution Journey</h2>
                <div className="timeline">
                    <div className="timeline-item">
                        <div className="timeline-date"><span>1991</span></div>
                        <div className="timeline-connector"><i>●</i></div>
                        <div className="timeline-content">
                            <h4>Conceptual Beginnings</h4>
                            <p>Stuart Haber and W. Scott Stornetta describe the first cryptographically secured chain of blocks.</p>
                        </div>
                    </div>
                    <div className="timeline-item">
                        <div className="timeline-date"><span>2008</span></div>
                        <div className="timeline-connector"><i>●</i></div>
                        <div className="timeline-content">
                            <h4>Bitcoin Whitepaper</h4>
                            <p>Satoshi Nakamoto publishes the Bitcoin whitepaper, introducing a peer-to-peer electronic cash system.</p>
                        </div>
                    </div>
                    <div className="timeline-item">
                        <div className="timeline-date"><span>2015</span></div>
                        <div className="timeline-connector"><i>●</i></div>
                        <div className="timeline-content">
                            <h4>Ethereum Goes Live</h4>
                            <p>Frontier, the first live release of Ethereum, launches, introducing smart contracts.</p>
                        </div>
                    </div>
                    <div className="timeline-item">
                        <div className="timeline-date"><span>2022</span></div>
                        <div className="timeline-connector"><i>●</i></div>
                        <div className="timeline-content">
                            <h4>The Merge</h4>
                            <p>Ethereum transitions to proof-of-stake, reducing energy consumption by 99.95%.</p>
                        </div>
                    </div>
                </div>
                <div className="timeline-flowchart">
                    <div className="flowchart-item">
                        <h4>Foundation</h4>
                        <p>Cryptographic research</p>
                    </div>
                    <div className="flowchart-arrow">→</div>
                    <div className="flowchart-item">
                        <h4>Bitcoin Era</h4>
                        <p>First implementation</p>
                    </div>
                    <div className="flowchart-arrow">→</div>
                    <div className="flowchart-item">
                        <h4>Smart Contracts</h4>
                        <p>Ethereum enables programmability</p>
                    </div>
                    <div className="flowchart-arrow">→</div>
                    <div className="flowchart-item">
                        <h4>Future</h4>
                        <p>Mass adoption</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Timeline;