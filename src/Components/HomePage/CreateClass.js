import "./homepage.css";
import url from "./../../url";
import { useState } from "react";

export default function CreateClass(props) {

    const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [className, setClassName] = useState(""); // State for class name
  const [subject, setSubject] = useState(""); 
  
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const classData = {
          className,
          subject
        };
    
        try {
          const response = await fetch(`${url.url}/createClassroom`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(classData),
          });
    
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
    
          const data = await response.json();
          console.log("Class created:", data);
          props.addClassProp(false);
          // Optionally, you can clear the form after submission
          setClassName("");
          setSubject("");
        } catch (error) {
          console.error("Error creating class:", error);
        }
      };

  return (
    <div className="create-class">
      <form className="create-class-inner" onSubmit={handleSubmit}>
        <p className="create-class-p">Create Class</p>
          <input
            type="text"
            className="classname"
            placeholder="Class Name"
            value={className}
            onChange={(e) => setClassName(e.target.value)} // Update state with input value
          ></input>
          <input
            type="text"
            className="class-subject"
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)} // Update state with input value
          ></input>
          <div className="create-class-btn">
            <button type="button" className="class-cancel" onClick={() => props.addClassProp(false)}>
              Cancel
            </button>
            <button type="submit" className="class-submit">
              Submit
            </button>
          </div>
      </form>
    </div>
  );
}
