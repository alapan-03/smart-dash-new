import "./homepage.css";
import url from "../../url";
import { useEffect, useState, useContext } from "react";
// import {l-dot-wave } from "ldrs"
import { context, context2 } from "./Main";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function Body(second) {
  let student = useContext(context);
  let loading = useContext(context2);
  console.log(student);

  const colors = ["#009788", "rgb(227, 148, 0)", "#3367D5", "#36474F", "#357FEE", "#566E7A"];

  return (
    <>
      <div className="body">
        {loading ? (
          <div className="loader">
            <l-dot-wave size="47" speed="1" color="#6e6e6e"></l-dot-wave>
          </div>
        ) : (
          student?.classrooms?.slice() // create a shallow copy of the array to avoid mutating the original
          .reverse() .map((data, i) => (
            <div className="body-card-cont" key={i}>
              <div
                className="body-card-color"
                style={{ backgroundColor: colors[i % colors.length] }}
                // style={{ backgroundColor: "#363636" }}
              >
                <div className="color-dp-cont">
                  <div className="body-card">{data?.className}</div>
                  <div className="teacher-name">{data?.name}</div>
                </div>
                <span className="teacher-dp">
                  <p>{student?.name.slice(0, 1).toUpperCase()}</p>
                </span>
              </div>

              <Link to={`/class/${data._id}`}> <div className="card-enter">
                <ArrowRight color="rgb(227, 148, 0)" />
              </div>
              </Link>
              {/* <button className="enroll-btn">Enroll</button> */}
            </div>
          ))
        )}
      </div>
    </>
  );
}
