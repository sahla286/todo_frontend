import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [username, setUsername] = useState(""); 
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.clear(); 
      navigate("/login"); 
      window.location.reload(); 
    }
  };

  return (
    <div className="d-flex" style={{ marginBottom: '100px' }}>
      <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top shadow-sm px-3">
        <div className="container-fluid d-flex justify-content-between">
          <Link className="navbar-brand fw-bold fs-4 text-primary" to="/">
            TaskManager
          </Link>

          <div className="flex flex-col space-y-4">
  <Link
    to="/home"
    style={{
      padding: "0.5rem 1rem",
      borderRadius: "0.375rem",
      textDecoration: "none",
      color: "#4A4A4A", 
      fontWeight: "600",
    }}
    className="hover:bg-gray-200"
  >
    Home
  </Link>
  <Link
    to="/addtask"
    style={{
      padding: "0.5rem 1rem",
      borderRadius: "0.375rem",
      textDecoration: "none",
      color: "#4A4A4A",
      fontWeight: "600",
    }}
    className="hover:bg-gray-200"
  >
    Add Task
  </Link>
  <Link
    to="/tasklist"
    style={{
      padding: "0.5rem 1rem",
      borderRadius: "0.375rem",
      textDecoration: "none",
      color: "#4A4A4A",
      fontWeight: "600",
    }}
    className="hover:bg-gray-200"
  >
    Task List
  </Link>
</div>



          <div className="d-flex align-items-center">
            <span className="me-3 fw-bold">({username || "Guest"})</span>
            <button onClick={handleLogout} className="btn btn-outline-dark">
              <i className="fa-solid fa-right-from-bracket me-2"></i> Sign out
            </button>
          </div>
        </div>
      </nav>

          </div>

  );
};

export default Navbar;

