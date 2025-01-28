import "./homepage.css";
import {url} from "./../../url"; // Assuming this is the base API URL
import { useEffect, useState, useContext } from "react";
import { context2 } from "./Main"; // Assuming this handles loading context
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios"; // Import axios

export default function Body() {
  const { user } = useSelector((state) => state.auth); // Get the logged-in user from Redux
  const [classrooms, setClassrooms] = useState([]); // State to store classrooms
  const [loading, setLoading] = useState(true); // Loading state from context

  const colors = [
    "#009788",
    "rgb(227, 148, 0)",
    "#3367D5",
    "#36474F",
    "#357FEE",
    "#566E7A",
  ];

  // Function to fetch classrooms using axios
  const fetchClassrooms = async () => {
    setLoading(true); // Set loading to true while fetching data
    try {
      console.log(user);
      const response = await axios.get(
        `${url}/api/v1/student/studentClassrooms/${user.id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`, // Token-based authentication
          },
        }
      );
  
      // Extract enrolledClassrooms from the response
      if (response.data && response.data.student && Array.isArray(response.data.student.enrolledClassrooms)) {
        console.log("Fetched classrooms:", response.data.student.enrolledClassrooms);
        setClassrooms(response.data.student.enrolledClassrooms); // Update classrooms state
      } else {
        console.error("Unexpected response format:", response.data);
        setClassrooms([]); // Fallback to an empty array if data is not as expected
      }
    } catch (error) {
      console.error("Error fetching classrooms:", error);
      setClassrooms([]); // Fallback to an empty array on error
    } finally {
      setLoading(false); // Set loading to false once fetching is complete
    }
  };
  
  

  useEffect(() => {
    if (user) {
      fetchClassrooms(); // Fetch classrooms when the component mounts
    }
  }, [user]);

  return (
    <div className="body">
  {loading ? (
    <div className="loader">
      <l-dot-wave size="47" speed="1" color="#6e6e6e"></l-dot-wave>
    </div>
  ) : Array.isArray(classrooms) && classrooms.length > 0 ? (
    classrooms
      .slice() // Create a shallow copy of the array to avoid mutating the original
      .reverse()
      .map((data, i) => (
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
              <p>{user?.name.slice(0, 1).toUpperCase()}</p>
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
    <p>No classrooms found.</p> // Fallback message when no classrooms are available
  )}
</div>


  );
}
