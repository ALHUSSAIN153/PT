import React from 'react';

import Hero from './Hero';
import AboutMe from './AboutMe';
import Footer from '../../components/Footert';
import FAQShowcase from './FAQShowcase';
import ServicesSection from './ServicesSection';
import Header from '../../components/header';



const Home: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Header/>

      <main>

        <Hero />

        <AboutMe />

        <div id="ServicesSection">
          <ServicesSection />
        </div>

        <FAQShowcase/>
      </main>

      <Footer />
    </div>
  );
};

export default Home;