import React from 'react';
import HeroSection from './HeroSection';
import HistoryCarousel from './HistoryCarousel';
import InfoCard from './InfoCard';
import Timeline from './Timeline';
import './BlockchainEducation.css';

const BlockchainEducation = () => {
    return (
        <div className="blockchain-edu-page">
            <HeroSection />
            <HistoryCarousel />
            <InfoCard />
            <Timeline />
        </div>
    );
};

export default BlockchainEducation;