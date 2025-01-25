import { Bell, Plus } from "lucide-react";
import "./homepage.css";
import { useLocation } from "react-router-dom";

export default function Navbar(props) {
  const location = useLocation();
  console.log(location);
  return (
    <div className="navbar">
      <p className="nav-hello">Hello, Alapan 😊</p>
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
