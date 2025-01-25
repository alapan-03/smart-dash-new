import "./path.css";
import url from "../../url";
import { useState } from "react";
import DragDrop from "./FileUpload";
import FileUpload from "./FileUpload";
import { useParams } from "react-router";

export default function CreateTopic(props) {

    const {classId} = useParams();

    const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [topicName, setTopicName] = useState(""); // State for class name
  const [description, setDescription] = useState(""); 
  
    const handleSubmit = async (e) => {
        e.preventDefault();
        props.addTopicProp(false);

        const classData = {
          topicName,
          classroomId: classId,
          description
        };
    
        try {
          const response = await fetch(`${url}/education/createTopic`, {
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
          // Optionally, you can clear the form after submission
          setTopicName("");
          setDescription("");
        } catch (error) {
          console.error("Error creating class:", error);
        }
      };

  return (
    <div className="create-class">
      <form className="create-class-inner" onSubmit={handleSubmit}>
        <p className="create-class-p">Create Topic</p>
          <input
            type="text"
            className="classname"
            placeholder="Class Name"
            value={topicName}
            onChange={(e) => setTopicName(e.target.value)} // Update state with input value
          ></input>
          <textarea
            type="text"
            className="class-subject"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)} // Update state with input value
          ></textarea>
          <div className="create-class-btn">
            <button type="button" className="class-cancel" onClick={() => props.addTopicProp(false)}>
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
