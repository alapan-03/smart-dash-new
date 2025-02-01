import { useState, useEffect } from "react";
import axios from "axios";
import Main from "./Main";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import { url } from "../../url";
import TeacherMain from "./TeacherMain";

const RoleBasedComponent = () => {
  const [classrooms, setClassrooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState(null);

  const user = useSelector((state) => state.auth.user);
  const token = Cookies.get("token"); 
  console.log("Component user", user);

  useEffect(() => {
    const verifyToken = async () => {
      try {
        if (user.accountType === "Teacher") {
          setUserRole("Teacher");
          fetchClassrooms();
        } else {
          setLoading(false);
        }
      } catch (error) {
        console.error("Error verifying token:", error);
        setLoading(false);
      }
    };

    const fetchClassrooms = async () => {
      try {
        const response = await axios.post(
          `${url}/api/v1/teacher/meTeacher`,
          { userId: user.id },  // Make sure you're sending user.id in the request body
          { 
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json'  // Set the content type to application/json
            }
          }
        );
        setClassrooms(response.data);
      } catch (error) {
        console.error("Error fetching classrooms:", error);
      } finally {
        setLoading(false);
      }
    };
    
    
    

    verifyToken();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      {userRole === "Teacher" ? (
        <TeacherMain classrooms={classrooms} />
      ) : (
        <Main />
      )}
    </div>
  );
};

const StudentComponent = () => {
  return <p>Welcome, Student! Your dashboard will be here.</p>;
};

export default RoleBasedComponent;
