import { useState } from "react";
import TrackVideo from "./TrackVideo";
import "./style.css"

export default function TrackVideoCont(props) {

  const [url, setUrl] = useState("");
  const [embedUrl, setEmbedUrl] = useState("");

  const extractVideoId = (youtubeUrl) => {
    const regex = /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^&\n?#]+)/;
    const matches = youtubeUrl.match(regex);
    return matches ? matches[1] : null;
  };

  const videoId = extractVideoId(props.videoUrl);

  console.log(videoId)
  
  return (
    <div className="popupStyle">
      <div className="popupContentStyle">
        <TrackVideo videoId={videoId} userId="66faae7e4a64611470e14fe6" />
        {/* <button onClick={closePopup}>Close Popup</button> */}
      </div>
    </div>
  );
}
