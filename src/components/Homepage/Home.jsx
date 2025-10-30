import React from 'react';
import Hero from './Hero';
import About from './About';
import Features from './Features';
import HowItWorks from './HowItWorks';
import Team from './Team';
import CTA from './CTA';

const Home = () => {
  return (
    <div className="home-page">
      <Hero />
      <About />
      <Features />
      <HowItWorks />
      <Team />
      <CTA />
    </div>
  );
};

export default Home;