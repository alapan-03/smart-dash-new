import React, { useState } from 'react';
import { FaPhoneAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import './CSS/ContactForm.css'; // Link to the updated CSS file

const ContactForm = ({ reference }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    industry: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <section ref={reference} className="contact-form-section">
      <div className="glass-card-container">
        {/* Form Section */}
        <div className="glass-card form-section">
          <h1 className="section-title">Contact Us</h1>
          <p className="section-subtitle">
            We'd love to hear from you! Please fill out the form below, and we'll get back to you as soon as possible.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex space-x-4">
              <div className="w-1/2">
                <label className="form-label">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  placeholder="e.g. Howard"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="input-field"
                />
              </div>
              <div className="w-1/2">
                <label className="form-label">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  placeholder="e.g. Thurman"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="input-field"
                />
              </div>
            </div>

            <div className="flex space-x-4">
              <div className="w-1/2">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="e.g. howard@gmail.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="input-field"
                />
              </div>
              <div className="w-1/2">
                <label className="form-label">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="e.g. +1 (234) 567-8910"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="input-field"
                />
              </div>
            </div>

            <div>
              <label className="form-label">Industry</label>
              <select
                name="industry"
                value={formData.industry}
                onChange={handleChange}
                required
                className="input-field"
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

            <div>
              <label className="form-label">Message</label>
              <textarea
                name="message"
                placeholder="Your message..."
                value={formData.message}
                onChange={handleChange}
                required
                className="input-field textarea-field"
              />
            </div>

            <button type="submit" className="cta-button">
              Submit
            </button>
          </form>
        </div>

        {/* Info Section */}
        <div className="glass-card info-section">
          <h2 className="info-title">Get in Touch</h2>
          <p className="info-description">
            Have a question? Reach out to us through the following channels:
          </p>
          <div className="info-item">
            <FaLocationDot className="info-icon" />
            <span>45 Green Street, USA</span>
          </div>
          <div className="info-item">
            <FaPhoneAlt className="info-icon" />
            <span>+1 (234) 567-8910</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
