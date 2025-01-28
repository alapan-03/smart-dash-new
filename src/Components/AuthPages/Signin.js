import React, { useState } from 'react';
import axios from 'axios';
import { FaGoogle, FaGithub } from "react-icons/fa";
import Navbar from '../LandingPage/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import {url} from '../../url';
import Cookies from 'js-cookie';
import './CSS/Signin.css';
import { useDispatch } from 'react-redux';
import { login } from '../../Redux/Slices/authSlice';


export default function Signin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(`${url}/auth/login`, { email, password });
      const { token } = response.data;

      // Set token in cookies with js-cookie
      Cookies.set('authToken', token, {
        expires: 7,       // Expires in 7 days
        path: '/',        // Available throughout the entire site
        sameSite: 'Lax'   // Controls cross-site request behavior
      });

      console.log('Token stored in cookies:', Cookies.get('authToken'));

      // console.log('before line post');
      try {
        // Make a POST request to the backend with the token
        const response = await axios.post(
          `${url}/auth/verifyAuth`,
          { token }, // Send the token as a JSON object
          { withCredentials: true } // Include credentials if needed
        );
    
        // Handle the response
        console.log("Verification response:", response.data);
        if (response.data.isAuthenticated) {
          console.log("User is authenticated:", response.data.user);
          const { user } = response.data;
          dispatch(login({ user, token }));
          console.log("Login event dispatched redux");
          localStorage.setItem('user', JSON.stringify(user)); 
        } else {
          console.error("Authentication failed.");
        }
      } catch (error) {
        // Handle any errors
        console.error("Error verifying auth:", error);
      }
      
      navigate("/dashboard");
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="signin-container">
        <div className="signin-form">
          <h2 className="signin-heading">Sign in to your account</h2>

          <form onSubmit={handleSubmit} className="signin-form-content">
            <div className="form-group">
              <label htmlFor="email" className="form-label">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                className="form-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                className="form-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="remember-forgot">
              <div className="remember-checkbox">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="checkbox-input"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                />
                <label htmlFor="remember-me" className="remember-label">Remember me</label>
              </div>
              <div className="forgot-password">
                <a href="#" className="forgot-password-link">Forgot password?</a>
              </div>
            </div>

            <button type="submit" className="signin-button">Sign in</button>

            <div className="register-link">
              <p className="register-text">Don't Have an Account?</p>
              <Link to="/signup" className="register-link-text">Register here</Link>
            </div>

            <div className="separator">
              <span className="separator-text">Or Continue With</span>
            </div>

            <div className="social-signin">
              <button type="button" className="social-button">
                <FaGoogle className="social-icon" />
                Sign in with Google
              </button>
              <button type="button" className="social-button">
                <FaGithub className="social-icon" />
                Sign in with GitHub
              </button>
            </div>
          </form>
        </div>

        <img className="signin-image" src="https://images.unsplash.com/photo-1496917756835-20cb06e75b4e" alt="" />
      </div>
    </>
  );
}
