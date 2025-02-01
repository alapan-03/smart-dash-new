import "./homepage.css";
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

export default function Body({ classrooms }) {
  const { user } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    setLoading(false);
  }, []); // UseEffect to set loading state to false when component mounts

  console.log("Classrooms:", classrooms.classrooms);

  const colors = [
    "#009788",
    "rgb(227, 148, 0)",
    "#3367D5",
    "#36474F",
    "#357FEE",
    "#566E7A",
  ];

  return (
    <div className="body">
      {loading ? (
        <div className="loader">
          <l-dot-wave size="47" speed="1" color="#6e6e6e"></l-dot-wave>
        </div>
      ) : Array.isArray(classrooms.classrooms) && classrooms.classrooms.length > 0 ? (
        classrooms.classrooms.map((data, i) => (
          <div key={data._id} className="body-card-cont">
            <div
              className="body-card-color"
              style={{ backgroundColor: colors[i % colors.length] }}
            >
              <div className="color-dp-cont">
                <div className="body-card">{data?.className || "Classroom"}</div>
                <div className="teacher-name">{data?.name || "Teacher"}</div>
              </div>
              <span className="teacher-dp">
                {/* <p>{user?.name.slice(0, 1).toUpperCase()}</p> */}
              </span>
            </div>

            <Link to={`/class/${data._id}`}>
              <div className="card-enter">
                <ArrowRight color="rgb(227, 148, 0)" />
              </div>
            </Link>
          </div>
        ))
      ) : (
        <p>No classrooms found.</p>
      )}
    </div>
  );
}
