import { LogOut, User, LayoutPanelLeft, Play, ReceiptIndianRupee } from "lucide-react"; // Add missing imports
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../Redux/Slices/authSlice'; // Adjust the import path as needed
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import "./homepage.css";
import Cookies from 'js-cookie';

export default function Sidebar(props) {
    const { user, isAuthenticated } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Get the navigate function

    // Function to handle logout
    const handleLogout = () => {
        // Dispatch the logout action to clear Redux state
        dispatch(logout());

        // Clear the token from cookies
        Cookies.remove('authToken'); // Replace 'token' with the actual cookie name used for the JWT

        // Clear the user data from localStorage
        localStorage.removeItem('user'); // Assuming the user data is stored under the key 'user'

        // Redirect the user to the login page after logging out
        navigate('/signin');
    };
    return (
        <div className="ttv-sidebar">
            <div className="ttv-sidebar-body">
                <div className="ttv-sidebar-logout-cont">
                    <User strokeWidth={1.75} className="ttv-sidebar-pfp-icon" size={19} color="#333333" />
                    <p className="ttv-sidebar-pfp-name">{user.name}</p>
                </div>

                <div className="ttv-sidebar-logout" onClick={handleLogout}>
                    <LogOut strokeWidth={1.75} className="ttv-sidebar-logout-icon" size={19} color="#333333" />
                    <p className="ttv-sidebar-logout-p">Logout</p>
                </div>

                <div className="ttv-sidebar-items-cont">
                    <p className="ttv-sidebar-items-p1">Hahaiser</p>

                    <div className="ttv-sidebar-items">
                        <LayoutPanelLeft strokeWidth={1.75} className="ttv-sidebar-list-img1" size={19} color="#333333" />
                        <p className="ttv-sidebar-list-p1">Dashboard</p>
                    </div>
                    <div className="ttv-sidebar-items">
                        <Play strokeWidth={1.75} className="ttv-sidebar-list-img2" size={19} color="#333333" />
                        <p className="ttv-sidebar-list-p2">Analysis</p>
                    </div>
                </div>
                <hr></hr>

                <div className="ttv-sidebar-items">
                    <ReceiptIndianRupee strokeWidth={1.75} className="ttv-sidebar-list-img3" size={19} color="#333333" />
                    <p className="ttv-sidebar-list-p3">Billing</p>
                </div>
            </div>
        </div>
    );
}
