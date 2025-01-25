import Navbar from "../HomePage/Navbar";
import Sidebar from "../HomePage/Sidebar";
import LearningRoadmap from "./LearningRoadmap";
import CreateTopic from "./CreateTopic";
import FileUpload from "./FileUpload";
import YouTubeForm from "./YoutubeForm";
import Resource from "./Resource";
import TrackVideoCont from "../VideoViewer/TrackVideoCont.jsx";
import React, { createContext, useContext, useState } from "react";
import Quiz from "../Assignment/Quiz.jsx";

export default function Appan2(props) {
  const StateContext = createContext();

  const [addTopicState, setAddTopicState] = useState(false);
  const [topicId, setTopicId] = useState();
  const [resource, setAddResourceSt] = useState(false);
  const [link, setaddLink] = useState(false);
  const [videoUrl, setVideoUrl] = useState();

  function addTopic(e) {
    setAddTopicState(e);
  }

  function setTopic(e) {
    setTopicId(e);
    props.topicId(e)
  }

  function setAddResource(e) {
    setAddResourceSt(e);
  }

  function setAddLinkFunc(e) {
    setaddLink(e);
  }

  function setVideo(e) {
    setVideoUrl(e);
  }

  console.log(videoUrl);

  return (
    <div className="appan-cont">
      {/* <StateContext.Provider value={{ topicId, setTopicId }}> */}
        <Navbar addTopicProp={addTopic} />
        <div className="appan">
          <Sidebar />
          <LearningRoadmap
            setTopic={setTopic}
            addTopicProp={addTopic}
            resource={resource}
          />
          {addTopicState && (
            <div>
              <CreateTopic addTopicProp={addTopic} />
            </div>
          )}
          {/* <FileUpload topicId={topicId}/>
        <YouTubeForm/> */}

          <Resource
            topic={topicId}
            setVideoUrl={setVideo}
            addResource={setAddResource}
            addLink={setAddLinkFunc}
          />

          {resource && (
            <div className="timeline-container">
              <FileUpload addResource={setAddResource} />
              {/* <YouTubeForm/> */}
            </div>
          )}

          {link && (
            <div className="timeline-container">
              <YouTubeForm setVideoUrl={setVideo} topicId={topicId} />
              {/* <YouTubeForm/> */}
            </div>
          )}

          {videoUrl && <TrackVideoCont videoUrl={videoUrl} />}

        </div>
      {/* </StateContext.Provider> */}
    </div>
  );
}

