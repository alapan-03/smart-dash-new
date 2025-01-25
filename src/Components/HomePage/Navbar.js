import { Bell, Plus } from "lucide-react";
import { useLocation } from "react-router-dom";

export default function Navbar(props) {
  const location = useLocation();
  console.log(location);
  return (
    <div className="bg-dark p-4 flex justify-between items-center">
      <p className="text-white">Hello, Alapan 😊</p>
      <div className="flex items-center space-x-4">
        <Bell color="#e0e0e0" />
        {location?.pathname === "/" ? (
          <button
            className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded"
            onClick={() => props.addClassProp(true)}
          >
            <Plus />
            <span>Add Classroom</span>
          </button>
        ) : (
          <button
            className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded"
            onClick={() => props.addTopicProp(true)}
          >
            <Plus />
            <span>Add Topic</span>
          </button>
        )}
      </div>
    </div>
  );
}