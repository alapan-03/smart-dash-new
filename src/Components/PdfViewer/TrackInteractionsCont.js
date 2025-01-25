import { useRef } from "react"
import TrackInteractions from "./TrackInteractions";
import "./style.css"
import { useParams } from "react-router";

export default function TrackInteractionsCont(second) {

  const {fileUrl} = useParams()

  return (
    <div className="popupStyle">
      <div className="popupContentStyle">
        <TrackInteractions fileUrl={fileUrl}/>
        {/* <button onClick={closePopup}>Close Popup</button> */}
      </div>
    </div>
  );
};


