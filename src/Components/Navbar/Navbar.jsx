import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Navbar.css";

function Navbar() {
  const [username, setUsername] = useState(localStorage.getItem("username") || "Guest");
  const navigate = useNavigate();
  const location = useLocation();
  const brandOnlyRoutes = ["/", "/login", "/register"];
  const showFullNavbar = !brandOnlyRoutes.includes(location.pathname);

  useEffect(() => {
    setUsername(localStorage.getItem("username") || "Guest");
  }, [location.pathname]);

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.clear();
      setUsername("Guest");
      toast.success("Successfully logged out!");
      setTimeout(() => navigate("/"), 1000);
    }
  };

  return (
    <div className="navbar-container">
      <nav className="navbar">
        <div className="navbar-content">
          <Link className="navbar-brand" to="/">
            TaskManager
          </Link>

          {showFullNavbar && (
            <>
              <div className="navbar-links">
                <Link to="/home" className="nav-link">
                  Home
                </Link>
                <Link to="/addtask" className="nav-link">
                  Add Task
                </Link>
                <Link to="/tasklist" className="nav-link">
                  Task List
                </Link>
              </div>

              <div className="navbar-user">
                <span className="username">({username})</span>
                <button onClick={handleLogout} className="logout-btn">
                  <i className="fa-solid fa-right-from-bracket"></i> Sign out
                </button>
              </div>
            </>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
