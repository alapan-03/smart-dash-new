import { BookAudio, LayoutPanelLeft, LogOut, Play, ReceiptIndianRupee, User } from "lucide-react"
import logo from "./Images/logo.jpg"
import "./homepage.css"
import { useDispatch, useSelector } from "react-redux"
import { logout } from "../../Redux/Slices/authSlice";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie"


export default function Sidebar(props) {
    const {user} = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const navigate = useNavigate()

    const handleLogout = () => {
        console.log("Handle Logout Func")
        dispatch(logout());
        Cookies.remove('authToken');
        navigate("/")
    }
    return(
        <>
        <div className="ttv-sidebar">
            {/* <img src={logo} className="ttv-sidebar-logo"></img> */}

            <div className="ttv-sidebar-body">
                <div className="ttv-sidebar-logout-cont">
                    <User strokeWidth={1.75} className="ttv-sidebar-pfp-icon" size={19} color="#333333"/>
                    <p className="ttv-sidebar-pfp-name">{user}</p>
                </div>

                <div className="ttv-sidebar-logout" onClick={handleLogout}>
                    <LogOut strokeWidth={1.75} className="ttv-sidebar-logout-icon" size={19} color="#333333"/>
                    <p className="ttv-sidebar-logout-p">Logout</p>
                </div>

                <div className="ttv-sidebar-items-cont">
                    <p className="ttv-sidebar-items-p1">Hahaiser</p>

                    <div className="ttv-sidebar-items">
                        <LayoutPanelLeft strokeWidth={1.75} className="ttv-sidebar-list-img1" size={19} color="#333333"/>
                        <p className="ttv-sidebar-list-p1">Dashboard</p>
                    </div>
                    <div className="ttv-sidebar-items">
                        <Play strokeWidth={1.75} className="ttv-sidebar-list-img2" size={19} color="#333333"/>
                        <p className="ttv-sidebar-list-p2">Analysis</p>
                    </div>
                </div>
                <hr></hr>

                <div className="ttv-sidebar-items">
                    <ReceiptIndianRupee strokeWidth={1.75} className="ttv-sidebar-list-img3" size={19} color="#333333"/>
                    <p className="ttv-sidebar-list-p3">Billing</p>
                </div>
            </div>
        </div>
        </>
    )
}