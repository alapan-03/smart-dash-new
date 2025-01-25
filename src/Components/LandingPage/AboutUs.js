import React from 'react';
import {ReactTyped} from 'react-typed';
import './CSS/AboutUs.css'; // Link to the updated CSS file

const AboutUs = ({ reference }) => (
  <section ref={reference} className="about-us-section">
    <div className="about-us-content">
      <h1 className="about-us-heading">About Us</h1>
      <p className="about-us-description">
        We are a passionate team of innovators and experts dedicated to delivering exceptional solutions and services. 
        With a focus on customer satisfaction, we strive to understand and meet the unique needs of each client. 
        Our diverse expertise spans a wide range of industries and technologies, ensuring that we provide comprehensive and effective solutions. 
        Whether you're looking for cutting-edge technology, creative design, or personalized service, we are here to help you achieve your goals. 
        Our commitment to excellence drives us to continuously improve and adapt to the ever-changing landscape of our field. 
        Join us on this journey of innovation and success, and let's create something amazing together.
      </p>
      <div className="about-us-typed">
        <ReactTyped
          strings={["Innovative Solutions", "Creative Design", "Customer Focused"]}
          typeSpeed={40}
          backSpeed={50}
          loop
        />
      </div>
      <div className="about-us-buttons">
        <button className="learn-more-button">Learn More</button>
        <button className="contact-us-button">Contact Us</button>
      </div>
    </div>
  </section>
);

export default AboutUs;
