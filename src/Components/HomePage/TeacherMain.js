
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import Body from './Body';
import url from "./../../url";
import { useEffect, useState, createContext } from "react";
import CreateClass from './CreateClass';
// import './index.css';
import TeacherBody from './TeacherBody';

// import Appan2 from './Components/Roadmap/Appan2';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


const context = createContext();
const context2 = createContext();
function Main({classrooms}) {


  console.log(url.url);
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addClassState, setAddClassState] = useState(false);

    // console.log(classrooms);
  
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
      <TeacherBody classrooms={classrooms}/>
      </div>

      {addClassState && <CreateClass addClassProp={addClass}/>}

      </context2.Provider>
      </context.Provider>
    </div>
  );
}

export default Main;
export {context, context2};
