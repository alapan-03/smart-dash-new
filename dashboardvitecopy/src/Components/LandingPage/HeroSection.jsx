import React, { useState, useEffect } from 'react';
import { ReactTyped } from 'react-typed';
import './CSS/HeroSection.css'
import Navbar from './Navbar';

import { useLocation } from 'react-router-dom';
import { useRef } from 'react';

const HeroSection = ({ heroRef, aboutRef, servicesRef, contactRef, footerRef}) => {

  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const scrollToRef = (ref) => {
    ref.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
    
    <section className="h-screen hero">
    <Navbar
        scrollToRef={scrollToRef}
        aboutRef={aboutRef}
        servicesRef={servicesRef}
        contactRef={contactRef}
        footerRef={footerRef}
        transparent={false}
      />
      <div className="container mx-auto flex flex-col lg:flex-row h-full">
        
        {/* Text Content with 50% width and full background color */}
        <div className="w-[100%] flex flex-col justify-center items-center h-full p-6 text-content ">
          <h1 className="text-6xl font-bold leading-tight mb-4 text-gray-300 mt-[-4rem]">
            Getting Quality Education 
          </h1>
          <h1 className="text-6xl font-bold leading-tight mb-4 text-gray-300 ">Is Now More Easy</h1>
          <p className="text-lg">
            <ReactTyped
              strings={[
                "<span class='text-gray-300'>Provides you with the latest online learning system and material</span>",
                "<span class='text-gray-300'>that helps your knowledge grow.</span>"
              ]}
              typeSpeed={40}
              backSpeed={20}
              backDelay={2000}
              startDelay={1000}
              loop
              className="inline"
              renderText={(text) => <span dangerouslySetInnerHTML={{ __html: text }} />}
            />
          </p>
          <div className="mt-6 flex justify-center lg:justify-start space-x-4">
            <button className="bg-[#f98a1b] text-white px-6 py-3 rounded-lg shadow-md hover:bg-orange-500 hover:shadow-lg transition-colors">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </section>
    </>
  );
};

export default HeroSection;