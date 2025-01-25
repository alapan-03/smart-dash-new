import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './CSS/Navbar.css'

import { useSelector, useDispatch } from 'react-redux';

import { logout } from '../../Redux/Slices/authSlice';
import Cookies from 'js-cookie';

const Navbar = ({ scrollToRef, heroRef, aboutRef, servicesRef, contactRef, transparent }) => {

  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const {isAuthenticated, user} = useSelector((state) => state.auth)

  console.log("Landing Page ", isAuthenticated, user)

  const dispatch = useDispatch();

  const handleLogout = () => {
    console.log("Handle Logout Func")
    dispatch(logout());
    Cookies.remove('authToken');
}

  return (
    <header className={`shadow-sm pl-10 ${isHomePage ? 'bg-transparent' : 'bg-white'} transition-colors duration-300`}>
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div
          className="text-2xl font-bold text-[#f98a1b] cursor-pointer"
          onClick={() => scrollToRef(heroRef)}
        >
          Q-Bee
        </div>
        <nav>
          {isHomePage && <ul className="flex space-x-16 text-gray-400 font-bold">
            {/* Use Link inside li for better structure */}
            <li>
              <Link
                className="cursor-pointer text-gray-800 hover:text-gray-300"
                to="/"
              >
                Home
              </Link>
            </li>
            <li
              className="cursor-pointer text-gray-800 hover:text-gray-300"
              onClick={() => scrollToRef(aboutRef)}
            >
              About Us
            </li>
            <li
              className="cursor-pointer text-gray-800 hover:text-gray-300"
              onClick={() => scrollToRef(servicesRef)}
            >
              Our Work
            </li>
            <li
              className="cursor-pointer text-gray-800 hover:text-gray-300"
              onClick={() => scrollToRef(contactRef)}
            >
              Contact Us
            </li>
          </ul>}
        </nav>
        <div className="flex space-x-4 items-center mr-10">
         {!isAuthenticated ? <Link to="/signin" className="text-[#f98a1b] hover:text-orange-600 mr-2">
            Sign In
          </Link> 
          : 
          <button className="text-[#f98a1b] hover:text-orange-600 mr-2" onClick={handleLogout}>Logout</button>}
          {!isAuthenticated ? <Link to="/signup" className="bg-[#f98a1b] hover:bg-orange-600 text-white px-4 py-2 rounded-lg">
            Register
          </Link> : <p>{user}</p>}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
