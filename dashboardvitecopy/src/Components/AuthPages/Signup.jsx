import React, { useState } from 'react';
import axios from 'axios';
import { FaGoogle, FaGithub } from 'react-icons/fa';
import Navbar from '../LandingPage/Navbar';
import { Link, useNavigate } from 'react-router-dom';

import url from '../../url';

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
      <div className='flex flex-col lg:flex-row h-[90vh] w-full p-6 lg:p-10 bg-white overflow-y-auto'>
        {/* Left Section: Form */}
        <div className="flex flex-1 lg:max-w-[50%] lg:ml-36 flex-col justify-center">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Register a new account
            </h2>
          </div>

          <div className="mt-10 flex sm:mx-auto sm:w-full sm:max-w-sm">
            <div className="flex-1">
              <form onSubmit={handleSubmit} className="space-y-6 p-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <div className="mt-2">
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      className="block w-full rounded-md border-gray-300 py-1.5 shadow-sm focus:ring-gray-300 sm:text-sm"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      className="block w-full rounded-md border-gray-300 py-1.5 shadow-sm focus:ring-gray-300 sm:text-sm"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <div className="mt-2">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      required
                      className="block w-full rounded-md border-gray-300 py-1.5 shadow-sm focus:ring-gray-300 sm:text-sm"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
                    Confirm Password
                  </label>
                  <div className="mt-2">
                    <input
                      id="confirm-password"
                      name="confirm-password"
                      type="password"
                      required
                      className="block w-full rounded-md border-gray-300 py-1.5 shadow-sm focus:ring-gray-300 sm:text-sm"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus:ring-indigo-600"
                  >
                    Register
                  </button>
                </div>

                <div className="flex justify-center mt-4">
                  <p className="text-sm">Already Have an Account?</p>
                  <Link to="/signin" className="text-sm ml-3 underline">
                    Login here
                  </Link>
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
                    className="flex items-center justify-center rounded-md border border-gray-300 bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-200"
                  >
                    <FaGoogle className="text-2xl" />
                    Register with Google
                  </button>
                  <button
                    type="button"
                    className="flex items-center justify-center rounded-md border border-gray-300 bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-200"
                  >
                    <FaGithub className="text-3xl" />
                    Register with GitHub
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Right Section: Image */}
        <div className="hidden lg:block lg:flex-1 lg:flex items-center justify-center ml-[-9rem]">
          <img
            className="h-[550px] w-[500px] rounded-lg shadow-lg object-cover"
            src="https://images.unsplash.com/photo-1496917756835-20cb06e75b4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&fit=crop"
            alt=""
          />
        </div>
      </div>
    </>
  );
}
