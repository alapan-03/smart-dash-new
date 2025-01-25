import React from 'react';
import { ReactTyped } from 'react-typed';
// import './AboutUs.css'; // Import your CSS file

const AboutUs = ({reference}) => (
  <section ref={reference} className="flex flex-col justify-center items-center bg-gray-100 text-gray-800 p-8 h-[100vh]">
    <div className="container mx-auto text-center">
      <h1 className="text-4xl font-bold mb-6">About Us</h1>
      <p className="text-lg mb-6 fade-in">
        We are a passionate team of innovators and experts dedicated to delivering exceptional solutions and services. With a focus on customer satisfaction, we strive to understand and meet the unique needs of each client. Our diverse expertise spans a wide range of industries and technologies, ensuring that we provide comprehensive and effective solutions. Whether you're looking for cutting-edge technology, creative design, or personalized service, we are here to help you achieve your goals. Our commitment to excellence drives us to continuously improve and adapt to the ever-changing landscape of our field. Join us on this journey of innovation and success, and let's create something amazing together.
      </p>
      <div className="mb-8">
        <ReactTyped
          strings={["Innovative Solutions", "Creative Design", "Customer Focused"]}
          typeSpeed={40}
          backSpeed={50}
          loop
          className="text-2xl font-semibold"
        />
      </div>
      <div className="flex justify-center gap-4">
        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg mr-4 hover:bg-blue-700 transition-colors">
          Learn More
        </button>
        <button className="bg-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-400 transition-colors">
          Contact Us
        </button>
      </div>
    </div>
  </section>
);

export default AboutUs;
