
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import Body from './Body';
import url from "../../url";
import { useEffect, useState, createContext } from "react";
import CreateClass from './CreateClass';

// import Appan2 from './Components/Roadmap/Appan2';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


const context = createContext();
const context2 = createContext();
function Main() {


  console.log(url.url);
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addClassState, setAddClassState] = useState(false);
  

  useEffect(() => {
    // Fetch the data when the component mounts
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${url}/api/v1/teacher/meTeacher`
        );
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
  
  let name = "alap"


  function addClass(e){
    setAddClassState(e)
  }

  return (
    <div className="App">
      <context.Provider value={classes}>
      {/* <TrackInteractionsCont/> */}
      {/* <ZigZagPath/> */}
      {/* <TrackVideoCont/> */}
      <context2.Provider value={loading}>
      <Navbar addClassProp={addClass}/>
      <div className='nav-body'>
      <Sidebar/>
      <Body/>
      </div>

      {addClassState && <CreateClass addClassProp={addClass}/>}

      </context2.Provider>
      </context.Provider>
    </div>
  );
}

export default Main;
export {context, context2};
