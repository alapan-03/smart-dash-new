import './App.css';
import url from './url.jsx';
import { useEffect, useState, createContext } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Main from './Components/HomePage/Main.jsx';
import Appan2 from './Components/Roadmap/Appan2.jsx';
import TrackInteractionsCont from './Components/PdfViewer/TrackInteractionsCont.jsx';
import Quiz from './Components/Assignment/Quiz.jsx';
import Leaderboard from './Components/Assignment/Leaderboard.jsx';
import Home from './Components/LandingPage/Home.jsx';
import Signin from './Components/AuthPages/Signin.jsx';
import Signup from './Components/AuthPages/Signup.jsx';

const context = createContext();
const context2 = createContext();

function App() {
  console.log(url);
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addClassState, setAddClassState] = useState(false);
  const [topicId, setTopicId] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${url}/api/v1/teacher/meTeacher`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data);
        setClasses(data.teacher); // Assuming the classes are returned in the user data
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  let name = 'alap';

  function addClass(e) {
    setAddClassState(e);
  }

  function setTopicFunc(e) {
    setTopicId(e);
    console.log(e);
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/main" element={<Main />} />
        <Route path="/class/:classId" element={<Appan2 topicId={setTopicFunc} />} />
        <Route path="/viewPdf/:fileUrl" element={<TrackInteractionsCont />} />
        <Route path="/assignment/:assignId" element={<Quiz topicId={topicId} />} />
        <Route path="/:assignId/leaderboard" element={<Leaderboard />} />
      </Routes>
    </Router>
  );
}

export default App;
export { context, context2 };
