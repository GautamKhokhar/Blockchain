import React, { useState } from 'react';
import './HistoryCarousel.css';

const HistoryCarousel = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const historyData = [
        {
            title: "The Beginning of Blockchain",
            content: "Blockchain technology was first conceptualized in 1991 by Stuart Haber and W. Scott Stornetta. They wanted to create a system where document timestamps couldn't be tampered with.",
            image: "https://media.istockphoto.com/id/1291729153/photo/electronic-components-on-pcb-textured-chain-parts-blockchain-and-crypto-currency-concept.webp?a=1&b=1&s=612x612&w=0&k=20&c=iKG7sorGeYinzyry95zEzgqimw7gwmVSkAvCtedQkgI="
        },
        {
            title: "Ethereum Revolution",
            content: "Proposed in late 2013 by Vitalik Buterin, Ethereum was developed to enable smart contracts and decentralized applications beyond Bitcoin's financial use cases.",
            image: "https://media.istockphoto.com/id/1289956604/photo/digital-security-concept.webp?a=1&b=1&s=612x612&w=0&k=20&c=zNeSQ3IrO7uuLLiVyD1hVHYWmC2FoBkBB3WyOPws2yA="
        },
        {
            title: "Development Evolution",
            content: "Hardhat emerged as a powerful development environment for Ethereum software with debugging features like stack traces and console.log for smart contracts.",
            image: "https://media.istockphoto.com/id/2123156327/photo/legal-technology-concept-businessman-use-tablet-on-legal-technology-icon-global-networking.webp?a=1&b=1&s=612x612&w=0&k=20&c=JgHeyBmRruMITOZCONUfpFX-1welQnm2KygnhonvG1g="
        }
    ];

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev === historyData.length - 1 ? 0 : prev + 1));
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev === 0 ? historyData.length - 1 : prev - 1));
    };

    return (
        <section className="history-carousel-section">
            <div className="container">
                <h2 className="carousels-titled">History of Blockchain Technology</h2>
                <div className="carousel-container">
                    <div className="carousel-wrapper">
                        <div
                            className="carousel-track"
                            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                        >
                            {historyData.map((item, index) => (
                                <div className="carousel-slide" key={index}>
                                    <div className="slide-content">
                                        <div className="image-content">
                                            <img src={item.image} alt={item.title} />
                                        </div>
                                        <div className="text-content">
                                            <h3>{item.title}</h3>
                                            <p>{item.content}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <button className="carousel-btn prev" onClick={prevSlide}>&#8249;</button>
                    <button className="carousel-btn next" onClick={nextSlide}>&#8250;</button>
                    <div className="carousel-indicators">
                        {historyData.map((_, index) => (
                            <button
                                key={index}
                                className={`indicator ${index === currentSlide ? 'active' : ''}`}
                                onClick={() => setCurrentSlide(index)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HistoryCarousel;