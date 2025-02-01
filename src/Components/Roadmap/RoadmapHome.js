import { useState } from "react";
import Navbar from "../HomePage/Navbar";
import Sidebar from "../HomePage/Sidebar";
import LearningRoadmap from "./subComp/LearningRoadmap";
import CreateTopic from "./subComp/CreateTopic";
import FileUpload from "./subComp/FileUpload";
import YouTubeForm from "./subComp/YoutubeForm";
import Resource from "./subComp/Resource";
import TrackVideoCont from "../VideoViewer/TrackVideoCont";
import Quiz from "../Quiz";
import { useSelector } from "react-redux";

export default function RoadmapHome(props) {

    const [addTopicState, setAddTopicState] = useState(false);
    const [topicId, setTopicId] = useState();
    const [resource, setAddResourceSt] = useState(false);
    const [link, setaddLink] = useState(false);
    const [videoUrl, setVideoUrl] = useState();


    function addTopic(e){
        setAddTopicState(e)
    }

    function setTopic(e){
        setTopicId(e)
    }

    function setAddResource(e){
        setAddResourceSt(e)
    }

    function setAddLinkFunc(e){
        setaddLink(e)
    }

    function setVideo(e){
        setVideoUrl(e)
    }

    console.log(videoUrl)

    return(
        <div className="appan-cont">
        <Navbar addTopicProp={addTopic}/>
        <div className="appan">
        <Sidebar/>
        <LearningRoadmap setTopic={setTopic} addTopicProp={addTopic} resource={resource}/>
        {addTopicState && 
        <div >
        <CreateTopic addTopicProp={addTopic}/>
        </div>
        }

        <Resource topic={topicId} setVideoUrl={setVideo} addResource={setAddResource} addLink={setAddLinkFunc}/>

        {resource && 
        <div className="timeline-container">
        <FileUpload addResource={setAddResource}/>
        {/* <YouTubeForm/> */}
        </div>
        }

        {link && 
        <div className="timeline-container">
        <YouTubeForm setVideoUrl={setVideo} topicId={topicId}/>
        {/* <YouTubeForm/> */}
        </div>
        }

        {videoUrl && <TrackVideoCont videoUrl={videoUrl}/>}

        </div>
        </div>
    )
}