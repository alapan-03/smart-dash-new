import logo from "./logo.svg";
import "./App.css";
import TrackInteractions from "./Components/PdfViewer/TrackInteractions";
import TrackInteractionsCont from "./Components/PdfViewer/TrackInteractionsCont";
import ZigZagPath from "./Components/Roadmap/subComp/Path";
import TrackVideo from "./Components/VideoViewer/TrackVideo";
import TrackVideoCont from "./Components/VideoViewer/TrackVideoCont";
import Sidebar from "./Components/HomePage/Sidebar";
import Navbar from "./Components/HomePage/Navbar";
import Body from "./Components/HomePage/Body";
import url from "./url";
import { useEffect, useState, createContext } from "react";
import CreateClass from "./Components/HomePage/CreateClass";
import LearningRoadmap from "./Components/Roadmap/subComp/LearningRoadmap";
import App2 from "./Components/Roadmap/RoadmapHome";
import Appan2 from "./Components/Roadmap/RoadmapHome";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./Components/HomePage/Main";
import RoadmapHome from "./Components/Roadmap/RoadmapHome";
import Leaderboard from "./Components/Leaderboard";
import './index.css';
import Home from "./Components/LandingPage/Home";
import { Signal } from "lucide-react";
import Signup from "./Components/AuthPages/Signup";
import Signin from "./Components/AuthPages/Signin";
import { Provider, useDispatch } from "react-redux";
import store from "./Redux/store";
import SigninTeacher from "./Components/AuthPages/SigninTeacher";
import RoleBasedComponent from "./Components/HomePage/RoleBasedComponent";


const context = createContext();
const context2 = createContext();
function App() {
  console.log(url.url);
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeData, setTimeData] = useState({})
  const [addClassState, setAddClassState] = useState(false);

  // console.log("Store is :-> ", store);

  // const dispatch = useDispatch();
  // console.log("Dispatch is :-> ", dispatch);

  useEffect(() => {
    // Fetch the data when the component mounts
    const fetchData = async () => {
      try {
        const response = await fetch(`${url.url}/api/v1/teacher/meTeacher`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log(data);
        setClasses(data.teacher); // Assuming the classes are returned in the user data
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    // Fetch the data when the component mounts
    const fetchData = async () => {
      try {
        const response = await fetch(`${url.url}/api/v1/student/me/67037ca9ca0f48418cf7dc4b`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setTimeData({timeSpent: data.student.timeSpent, totalWatchTime: data.student.totalWatchTime})
        console.log(data);
        setClasses(data.teacher); // Assuming the classes are returned in the user data
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  let name = "alap";

  function addClass(e) {
    setAddClassState(e);
  }

  console.log(timeData)

  // console.log(context);

  return (
    <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/dashboard" element={<RoleBasedComponent />} />
        <Route path="/class/:classId" element={<RoadmapHome />} />
        <Route path="/viewPdf/:fileUrl" element={<TrackInteractionsCont />} />
        <Route path="/teacherSignin" element={<SigninTeacher />} />
        {timeData.timeSpent && timeData.totalWatchTime ? (
          <Route path="/leader" element={<Leaderboard data={timeData} />} />
        ) : (
          // Optional: render a message or a different route if timeData is missing
          <Route path="/leader" element={<p>Leaderboard data is not available yet</p>} />
        )}      </Routes>
      {/* <Main/> */}
    </BrowserRouter>
    </Provider>
  );
}

export default App;
export { context, context2 };
