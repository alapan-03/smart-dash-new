import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './CSS/Navbar.css';

const Navbar = ({ scrollToRef, heroRef, aboutRef, servicesRef, contactRef, transparent }) => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <header className={`navbar-header ${isHomePage ? 'navbar-transparent' : 'navbar-white'}`}>
      <div className="navbar-container">
        <div
          className="navbar-logo"
          onClick={() => scrollToRef(heroRef)}
        >
          Q-Bee
        </div>
        <nav>
          {isHomePage && (
            <ul className="navbar-menu">
              <li>
                <Link className="navbar-link" to="/">
                  Home
                </Link>
              </li>
              <li
                className="navbar-link"
                onClick={() => scrollToRef(aboutRef)}
              >
                About Us
              </li>
              <li
                className="navbar-link"
                onClick={() => scrollToRef(servicesRef)}
              >
                Our Work
              </li>
              <li
                className="navbar-link"
                onClick={() => scrollToRef(contactRef)}
              >
                Contact Us
              </li>
            </ul>
          )}
        </nav>
        <div className="navbar-actions">
          <Link to="/signin" className="navbar-signin">
            Sign In
          </Link>
          <button className="navbar-logout">Logout</button>
          <Link to="/signup" className="navbar-register">
            Register
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
