import React from 'react';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa'; // Social Media Icons
import { MdEmail, MdPhone, MdLocationOn } from 'react-icons/md'; // Email, Phone, Location Icons

const Footer = () => {
  return (
    <footer className="bg-white text-gray-700 py-12 border-t border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          {/* About Us Section */}
          <div className="w-full md:w-1/3 mb-8 md:mb-0">
            <h4 className="text-xl font-semibold mb-4">About Us</h4>
            <p className="text-gray-600">
              We are committed to providing <br /> world-class educational resources <br />
              that empower students and educators<br /> to excel.
            </p>
          </div>

          {/* Resources Section */}
          <div className="w-full md:w-1/5 mb-8 md:mb-0">
            <h4 className="text-xl font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-blue-500">Blog</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-500">FAQs</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-500">Library</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-500">Support</a></li>
            </ul>
          </div>

          {/* Contact Us Section */}
          <div className="w-full md:w-1/5 mb-8 md:mb-0">
            <h4 className="text-xl font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-2">
              <li className="flex items-center">
                <MdEmail className="mr-2 text-blue-500" />
                <a href="mailto:info@educationalwebsite.com" className="text-gray-600 hover:text-blue-500">Email Us</a>
              </li>
              <li className="flex items-center">
                <MdPhone className="mr-2 text-blue-500" />
                <a href="#" className="text-gray-600 hover:text-blue-500">+123-456-7890</a>
              </li>
              <li className="flex items-center">
                <MdLocationOn className="mr-2 text-blue-500" />
                <a href="#" className="text-gray-600 hover:text-blue-500">Office Locations</a>
              </li>
            </ul>
          </div>

          {/* Follow Us Section */}
          <div className="w-full md:w-1/5">
            <h4 className="text-xl font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-blue-500"><FaFacebook size={24} /></a>
              <a href="#" className="text-gray-600 hover:text-blue-500"><FaTwitter size={24} /></a>
              <a href="#" className="text-gray-600 hover:text-blue-500"><FaLinkedin size={24} /></a>
              <a href="#" className="text-gray-600 hover:text-blue-500"><FaInstagram size={24} /></a>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-12 text-center text-sm text-gray-500">
          © 2024 Educational Website. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
