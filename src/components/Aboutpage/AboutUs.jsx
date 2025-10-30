import React from 'react';
import VisionSection from './VisionSection';
import TechnologyStack from './TechnologyStack';
import ValuesSection from './ValuesSection';
import AchievementSection from './AchievementSection';

const AboutUs = () => {
  return (
    <div className="about-us-page">
      <VisionSection />
      <TechnologyStack />
      <ValuesSection />
      <AchievementSection />
    </div>
  );
};

export default AboutUs;