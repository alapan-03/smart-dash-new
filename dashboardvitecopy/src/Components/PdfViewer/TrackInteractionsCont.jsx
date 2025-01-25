import { useRef } from "react"
import TrackInteractions from "./TrackInteractions";
import "./style.css"
import { useParams } from "react-router";

export default function TrackInteractionsCont(second) {

  const {fileUrl} = useParams()

  return (
    <div className="popupStyle">
      <div className="popupContentStyle">
        <TrackInteractions fileUrl={"https://res.cloudinary.com/doruvdkrj/image/upload/v1726759355/uploads/bpxjvgspos764rzi8mbd.pdf"}/>
        {/* <button onClick={closePopup}>Close Popup</button> */}
      </div>
    </div>
  );
};


