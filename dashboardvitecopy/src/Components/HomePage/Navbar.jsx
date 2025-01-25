import { Bell, Plus } from "lucide-react";
import "./homepage.css";
import { Link, useLocation } from "react-router-dom";

import { useEffect, useState } from "react";

import Cookies from 'js-cookie';

import url from "../../url";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import {login} from "../../Redux/Slices/authSlice"

import { FaArrowLeft } from "react-icons/fa";

export default function Navbar(props) {
  const location = useLocation();
  // console.log(location);

  const user = useSelector((state) => state.auth.user)
  console.log(user);

  const dispatch = useDispatch();

  useEffect(() => {
    const func = async () => {
      try {
        const token = Cookies.get('authToken');
        const res = await axios.post(`${url}/auth/verifyAuth`, {token}, { withCredentials: true });
        // console.log("Now Res is : ",res.data);
        const name = res.data.user.name;
        dispatch(login(name));
        console.log("dispatch event success", name);
      } catch (error) {
        console.error("Error during API call:", error.response ? error.response.data : error.message);
      }
    };
    func();
  }, []);
  

  return (
    <div className="navbar">
      <Link to="/" className="flex items-center ml-5 cursor-pointer">
      <FaArrowLeft />
      <p className="ml-3">Home</p>
      </Link>
      <p className="nav-hello">Hello, {user} 😊</p>
      <div className="nav-btn-cont">
        <Bell color="#e0e0e0" />

        {location?.pathname === "/" ? (
          <button onClick={() => props.addClassProp(true)}>
            <Plus />
            Add Classroom
          </button>
        ) : (
          <button onClick={() => props.addTopicProp(true)}>
            <Plus />
            Add Topic
          </button>
        )}
      </div>
    </div>
  );
}
