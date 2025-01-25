import React from 'react';
import {ReactTyped} from 'react-typed';
import './CSS/HeroSection.css';
import Navbar from './Navbar';
import { useLocation } from 'react-router-dom';

const HeroSection = ({ heroRef, aboutRef, servicesRef, contactRef, footerRef }) => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const scrollToRef = (ref) => {
    ref.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <section className="hero-section">
        <Navbar
          scrollToRef={scrollToRef}
          aboutRef={aboutRef}
          servicesRef={servicesRef}
          contactRef={contactRef}
          footerRef={footerRef}
          transparent={false}
        />
        <div className="hero-container">
          {/* Text Content */}
          <div className="hero-text-content">
            <h1 className="hero-heading">Getting Quality Education</h1>
            <h1 className="hero-heading">Is Now More Easy</h1>
            <p className="hero-description">
              <ReactTyped
                strings={[
                  "<span class='text-light'>Provides you with the latest online learning system and material</span>",
                  "<span class='text-light'>that helps your knowledge grow.</span>"
                ]}
                typeSpeed={40}
                backSpeed={20}
                backDelay={2000}
                startDelay={1000}
                loop
                renderText={(text) => <span dangerouslySetInnerHTML={{ __html: text }} />}
              />
            </p>
            <div className="hero-button-container">
              <button className="hero-get-started-button">Get Started</button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
