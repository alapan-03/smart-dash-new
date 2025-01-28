import React from 'react';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa'; // Social Media Icons
import { MdEmail, MdPhone, MdLocationOn } from 'react-icons/md'; // Email, Phone, Location Icons
import './CSS/Footer.css'; // Link to the CSS file

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          {/* About Us Section */}
          <div className="footer-section">
            <h4 className="footer-heading">About Us</h4>
            <p className="footer-text">
              We are committed to providing world-class educational resources that empower students and educators to excel.
            </p>
          </div>

          {/* Contact Us Section */}
          <div className="footer-section">
            <h4 className="footer-heading">Contact Us</h4>
            <ul className="footer-list">
              <li className="footer-item">
                <MdEmail className="footer-icon" />
                <a href="mailto:info@educationalwebsite.com">info@educationalwebsite.com</a>
              </li>
              <li className="footer-item">
                <MdPhone className="footer-icon" />
                <a href="tel:+1234567890">+123-456-7890</a>
              </li>
              <li className="footer-item">
                <MdLocationOn className="footer-icon" />
                <a href="#">1234 Street, City, Country</a>
              </li>
            </ul>
          </div>

          {/* Follow Us Section */}
          <div className="footer-section">
            <h4 className="footer-heading">Follow Us</h4>
            <div className="social-icons">
              <a href="#" className="social-icon">
                <FaFacebook size={30} />
              </a>
              <a href="#" className="social-icon">
                <FaTwitter size={30} />
              </a>
              <a href="#" className="social-icon">
                <FaLinkedin size={30} />
              </a>
              <a href="#" className="social-icon">
                <FaInstagram size={30} />
              </a>
            </div>
          </div>

          {/* Resources Section */}
          <div className="footer-section">
            <h4 className="footer-heading">Resources</h4>
            <ul className="footer-list">
              <li><a href="#" className="footer-link">Blog</a></li>
              <li><a href="#" className="footer-link">FAQs</a></li>
              <li><a href="#" className="footer-link">Library</a></li>
              <li><a href="#" className="footer-link">Support</a></li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          © 2024 Educational Website. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
