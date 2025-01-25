import React, { useState } from 'react';
import { FaPhoneAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

const ContactForm = ({reference}) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    industry: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <section ref={reference} className="flex flex-col lg:flex-row max-w-5xl mx-auto p-6 h-[100vh]">
      {/* Left Section with Form */}
      <div className="lg:w-1/2 bg-white p-8 shadow-lg rounded-lg">
        {/* Heading */}
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Contact Us</h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* First Name and Last Name in one line */}
          <div className="flex space-x-4">
            <div className="w-1/2">
              <label className="block text-gray-700">First Name</label>
              <input
                type="text"
                name="firstName"
                placeholder="e.g. Howard"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="w-full mt-2 p-2 border border-gray-300 rounded"
              />
            </div>

            <div className="w-1/2">
              <label className="block text-gray-700">Last Name</label>
              <input
                type="text"
                name="lastName"
                placeholder="e.g. Thurman"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="w-full mt-2 p-2 border border-gray-300 rounded"
              />
            </div>
          </div>

          {/* Email and Phone in one line */}
          <div className="flex space-x-4">
            <div className="w-1/2">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                placeholder="e.g. howard@gmail.com"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full mt-2 p-2 border border-gray-300 rounded"
              />
            </div>

            <div className="w-1/2">
              <label className="block text-gray-700">Phone</label>
              <input
                type="tel"
                name="phone"
                placeholder="e.g. +1 (234) 567-8910"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full mt-2 p-2 border border-gray-300 rounded"
              />
            </div>
          </div>

          {/* Industry */}
          <div>
            <label className="block text-gray-700">Industry</label>
            <select
              name="industry"
              value={formData.industry}
              onChange={handleChange}
              required
              className="w-full mt-2 p-2 border border-gray-300 rounded"
            >
              <option value="" disabled>
                Select one...
              </option>
              <option value="Tech">Tech</option>
              <option value="Finance">Finance</option>
              <option value="Health">Health</option>
              <option value="Education">Education</option>
            </select>
          </div>

          {/* Message */}
          <div>
            <label className="block text-gray-700">Message</label>
            <textarea
              name="message"
              placeholder="Your message..."
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full mt-2 p-2 border border-gray-300 rounded"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Submit
          </button>
        </form>
      </div>

      {/* Right Section - Text and Icons */}
      <div className="lg:w-1/2 lg:pl-12 flex flex-col justify-center mt-8 lg:mt-0 text-center lg:text-left">
        <h2 className="text-2xl font-semibold text-gray-800">Have a question for us?</h2>
        <p className="mt-4 text-gray-600">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.
        </p>

        <div className="flex items-center justify-center lg:justify-start mt-6">
        <FaLocationDot />
          <span className="text-gray-700 ml-2">45 Green Street, USA</span>
        </div>

        <div className="flex items-center justify-center lg:justify-start mt-4">
        <FaPhoneAlt />
          <span className="text-gray-700 ml-2">+1 (234) 567-8910</span>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
