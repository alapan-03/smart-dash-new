import React, { useRef } from 'react';
import Navbar from './Navbar';
import HeroSection from './HeroSection';
import AboutUs from './AboutUs';
import Services from './Services';
import Footer from './Footer';
import ContactUs from './ContactUs';
import { useLocation } from 'react-router-dom';

const Home = () => {
    const heroRef = useRef(null);
  const aboutRef = useRef(null);
  const servicesRef = useRef(null);
  const contactRef = useRef(null);
  const footerRef = useRef(null);

  const scrollToRef = (ref) => {
    ref.current.scrollIntoView({ behavior: 'smooth' });
  };

  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <div>
      {!isHomePage && <Navbar
        scrollToRef={scrollToRef}
        aboutRef={aboutRef}
        servicesRef={servicesRef}
        contactRef={contactRef}
        footerRef={footerRef}
        transparent={false}
      />}
      <HeroSection
      scrollToRef={scrollToRef}
      aboutRef={aboutRef}
      servicesRef={servicesRef}
      contactRef={contactRef}
      footerRef={footerRef}
      transparent={false} />
      <AboutUs reference={aboutRef} />
      <Services reference={servicesRef} />
      <ContactUs reference={contactRef} />
      <Footer reference={footerRef} />
    </div>
  )
}

export default Home