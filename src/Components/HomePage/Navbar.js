import { Bell, Plus } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import axios from "axios";
import "./CSS/Navbar.css"; // Ensure styles are imported
import { url } from "../../url";

export default function Navbar({ addTopicProp }) {
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [classroomCode, setClassroomCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleJoinClassroom = () => setIsPopupOpen(true);

  const handlePopupClose = () => {
    setIsPopupOpen(false);
    setClassroomCode("");
  };

  const handleClassroomJoin = async () => {
    if (!classroomCode) {
      alert("Please enter a classroom code");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${url}/classroom/join`, {
        classroomCode,
        studentId: user.id,
      });
      console.log("Classroom joined:", response.data);
      alert("Successfully joined the classroom!");
      handlePopupClose();
    } catch (err) {
      console.error("Error:", err);
      setError("Failed to join the classroom. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const renderJoinClassroomButton = () => {
    if (location?.pathname === "/dashboard") {
      return (
        <button className="join-classroom-btn" onClick={handleJoinClassroom}>
          <Plus />
          <span>Join Classroom</span>
        </button>
      );
    } else {
      return (
        <button className="add-topic-btn" onClick={() => addTopicProp(true)}>
          <Plus />
          <span>Add Topic</span>
        </button>
      );
    }
  };

  return (
    <div className="navbar">
      <p className="navbar-text">Hello, {user.name} 😊</p>
      <div className="navbar-buttons">
        <Bell color="#e0e0e0" />
        {renderJoinClassroomButton()}
      </div>

      {/* Popup for entering classroom code */}
      {isPopupOpen && (
        <div
          className="popup-overlay"
          onClick={handlePopupClose} // Close popup on outside click
        >
          <div
            className="popup-content"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the popup
          >
            <h2 className="popup-title">Join a Classroom</h2>
            <input
              type="text"
              className="popup-input"
              placeholder="Enter Classroom Code"
              value={classroomCode}
              onChange={(e) => setClassroomCode(e.target.value)}
            />
            {error && <p className="error-text">{error}</p>}
            <div className="popup-buttons">
              <button className="popup-btn-cancel" onClick={handlePopupClose}>
                Cancel
              </button>
              <button
                className="popup-btn-submit"
                onClick={handleClassroomJoin}
                disabled={loading}
              >
                {loading ? "Joining..." : "Submit"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
