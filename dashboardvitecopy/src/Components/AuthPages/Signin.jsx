import React, { useState } from 'react';
import axios from 'axios';
import { FaGoogle, FaGithub } from "react-icons/fa";
import Navbar from '../LandingPage/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import url from '../../url';
import Cookies from 'js-cookie';

import { useDispatch } from 'react-redux';
import { login } from '../../Redux/Slices/authSlice';

export default function Signin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  // const [accountType, setAccountType] = useState("")

  const navigate = useNavigate();

  const dispatch = useDispatch();

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

      const response2 = await axios.post(`${url}/auth/verifyAuth`, {token}, { withCredentials: true });
      const name = response2.data.user.name;

      dispatch(login(name));
      
      navigate("/main");
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <>
    <Navbar />
    <div className='flex flex-col lg:flex-row h-[90vh] w-[100vw] p-6 lg:p-10 bg-white'>
      <div className="flex min-h-full flex-1 lg:max-w-[50%] lg:ml-36 flex-col justify-center">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 flex sm:mx-auto sm:w-full sm:max-w-sm">
          {/* Form Section */}
          <div className="flex-1">
            <form onSubmit={handleSubmit} className="space-y-6 border-solid p-5">
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-700">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-gray-300 sm:text-sm sm:leading-6"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-700">
                  Password
                </label>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    autoComplete="current-password"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-gray-300 sm:text-sm sm:leading-6"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex justify-between items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                />
                <label htmlFor="remember-me" className="ml-[-100px] block text-sm text-gray-700">
                  Remember me
                </label>
                <div className="text-sm">
                  <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Forgot password?
                  </a>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
                >
                  Sign in
                </button>
              </div>
              <div className='flex justify-center'>
                <p className='text-sm'>Don't Have an Account ?</p>
                <Link to="/signup" className='text-sm ml-3 underline'>Register here</Link>
              </div>
              {/* Separator */}
              <div className="relative mt-6 flex items-center">
                <div className="flex-grow border-t border-gray-300"></div>
                <span className="mx-4 text-gray-500">Or Continue With</span>
                <div className="flex-grow border-t border-gray-300"></div>
              </div>

              {/* Social Sign-In Buttons */}
              <div className="flex justify-center space-x-4 mt-4">
                <button
                  type="button"
                  className="flex items-center justify-center rounded-md border border-gray-300 bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                  <FaGoogle className='text-2xl' />
                  Sign in with Google
                </button>
                <button
                  type="button"
                  className="flex items-center justify-center rounded-md border border-gray-300 bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                  <FaGithub className='text-3xl' />
                  Sign in with GitHub
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* The image is hidden on small and medium devices */}
      <img className="hidden lg:block mt-16 mr-60 h-[500px] ml-[-150px] w-[30%] rounded-lg shadow-lg" src="https://images.unsplash.com/photo-1496917756835-20cb06e75b4e?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;fit=crop" alt="" />
    </div>
    </>
  );
  };