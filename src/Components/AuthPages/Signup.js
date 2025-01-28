import React, { useState } from 'react';
import axios from 'axios';
import { FaGoogle, FaGithub } from 'react-icons/fa';
import Navbar from '../LandingPage/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import {url} from '../../url';
import './CSS/Signup.css';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      console.error('Passwords do not match');
      return;
    }

    const payload = {
      name,
      email,
      password,
    };

    try {
      console.log(payload, `${url}/auth/register`);
      const response = await axios.post(`${url}/auth/register`, payload);
      console.log(response);
      if (response.status === 201) {
        console.log('Registration successful', response.data);
        navigate('/signin');
      } else {
        console.error('Registration failed');
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  return (
    <>
      <Navbar />
      <div className='signup-container'>
        {/* Left Section: Form */}
        <div className="form-container">
          <div className="form-header">
            <h2>Register a new account</h2>
          </div>

          <form onSubmit={handleSubmit} className="form-content">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirm-password">Confirm Password</label>
              <input
                id="confirm-password"
                name="confirm-password"
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <button type="submit" className="submit-button">
              Register
            </button>

            <div className="login-link">
              <p>Already Have an Account?</p>
              <Link to="/signin" className="login-link-text">
                Login here
              </Link>
            </div>

            {/* Separator */}
            <div className="separator">
              <div className="separator-line"></div>
              <span>Or Continue With</span>
              <div className="separator-line"></div>
            </div>

            {/* Social Sign-In Buttons */}
            <div className="social-buttons">
              <button type="button" className="social-button google">
                <FaGoogle className="social-icon" />
                Register with Google
              </button>
              <button type="button" className="social-button github">
                <FaGithub className="social-icon" />
                Register with GitHub
              </button>
            </div>
          </form>
        </div>

        {/* Right Section: Image */}
        <div className="image-container">
          <img
            className="image"
            src="https://images.unsplash.com/photo-1496917756835-20cb06e75b4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&fit=crop"
            alt="Signup Illustration"
          />
        </div>
      </div>
    </>
  );
}
