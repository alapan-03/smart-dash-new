import { useEffect, useState } from "react";
import Sidebar from "../HomePage/Sidebar"
import "./path.css"
import url from "../../url"
import { useParams } from "react-router";

export default function LearningRoadmap(props) {

    const {classId} = useParams();

    const [topics, setTopics] = useState([]);
    const [loading, setLoading] = useState(true);
    const [addClassState, setAddClassState] = useState(false);
    
  
    useEffect(() => {
      // Fetch the data when the component mounts
      const fetchData = async () => {
        try {
          const response = await fetch(
            `${url}/education/getAllTopics/${classId}`
          );
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const data = await response.json();
          console.log("dfklgm",data);
          setTopics(data.topic); // Assuming the classes are returned in the user data
          props.addTopicProp(false)
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setLoading(false);
          // window.location.reload()
        }
      };
  
      fetchData();

    }, []);
    
    return (
        <>
        {/* <div className="roadmap-cont">
        <div className="roadmap">
            <div className="path"></div>
            <div className="path-content">
            {topics.map((el, i) => (
                i%2==0? 
                <div className="path-card" style={{position:"relative", left:"-5rem"}}>
                    <p>{el.topicName}</p>
                    </div>
                :
                <div className="path-card" style={{position:"relative", left:"5rem"}}>
                <p>{el.topicName}</p>
                </div>
            ))}
            </div>
        </div>
        </div> */}

<div className="timeline-container-outer">
<div className="timeline-container">
      <div className="timeline">
        {/* Loop through cards and alternate left/right */}
        {topics.map((card, index) => (
          <div
            key={card.id} onClick={() => props.setTopic(card._id)}
            className={`card ${index % 2 === 0 ? 'left-card' : 'right-card'} ${card?.status === "Todo" ? "content-todo" : card?.status === "inprogress" ? "content-inprogress" : card?.status === "done" ? "content-done" : ""}`}

            // className={`card ${index % 2 === 0 ? 'left-card' : 'right-card'} ${card?.status === "Todo" ? "content-todo" : (card?.status === "inprogress" ? "content-inprogress" ? card.status === "done" ? "content-done":"":"")}`}
            >
            <div className="content" >
              <h3>{card.topicName}</h3>
              <span className="card-status" style={{backgroundColor:`${card.status === "Todo" ? "rgb(168, 168, 168, 0.2)" : card.status === "inprogress" ? "rgb(179, 95, 243, 0.2)" : card?.status === "done" ? "rgb(89, 166, 71, 0.2)" : ""}`}}>
                <p className="status-dot" style={{backgroundColor:`${card.status === "Todo" ? "rgb(168, 168, 168)" : card.status === "inprogress" ? "rgb(179, 95, 243)" : card?.status === "done" ? "rgb(89, 166, 71)" : ""}`}}></p>

                <p>{card.status}</p>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
        </>
    )
}