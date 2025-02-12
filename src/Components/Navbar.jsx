// import { Link, useNavigate, useLocation } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { logoutUser } from "../Services/api";

// function Navbar() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   useEffect(() => {
//     // Check if access token exists
//     setIsLoggedIn(!!localStorage.getItem("access_token"));
//   }, [location]); // Update when route changes

//   const handleLogout = async () => {
//     const refreshToken = localStorage.getItem("refresh_token");

//     if (!refreshToken) {
//       alert("You are already logged out!");
//       navigate("/login");
//       return;
//     }

//     try {
//       await logoutUser(refreshToken);

//       // Remove tokens from local storage
//       localStorage.removeItem("access_token");
//       localStorage.removeItem("refresh_token");

//       alert("Logged out successfully!");
//       setIsLoggedIn(false);
//       navigate("/login");
//     } catch (error) {
//       console.error("Logout failed", error);
//       alert("Failed to log out. Try again!");
//     }
//   };

//   // Hide logout button on Home, Login, and Registration pages
// //   const hideLogoutPages = [ "/","/login", "/register"];
// //   const shouldShowLogout = isLoggedIn && !hideLogoutPages.includes(location.pathname);

//   return (
//     <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
//       <div className="space-x-4">
//         <Link to="/home" className="px-3 py-2 hover:bg-gray-700 rounded">Home</Link>
//         <Link to="/addtask" className="px-3 py-2 hover:bg-gray-700 rounded">Add Task</Link>
//         <Link to="/tasklist" className="px-3 py-2 hover:bg-gray-700 rounded">List Task</Link>
//       </div>

//       {/* Show Logout button only if logged in and NOT on Home, Login, or Register pages */}
//       {shouldShowLogout && (
//         <button 
//           onClick={handleLogout} 
//           className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
//         >
//           Logout
//         </button>
//       )}
//     </nav>
//   );
// }

// export default Navbar;


// import { Link, useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { logoutUser } from "../Services/api";

// function Navbar() {
//   const navigate = useNavigate();
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [username, setUsername] = useState("");

//   useEffect(() => {
//     setIsLoggedIn(!!localStorage.getItem("access_token"));
//     const storedUsername = localStorage.getItem("username");
//     setUsername(storedUsername || "Guest");
//   }, []);

//   const handleLogout = async () => {
//     const refreshToken = localStorage.getItem("refresh_token");

//     if (!refreshToken) {
//       alert("You are already logged out!");
//       navigate("/login");
//       return;
//     }

//     try {
//       await logoutUser(refreshToken);
//       localStorage.removeItem("access_token");
//       localStorage.removeItem("refresh_token");
//       localStorage.removeItem("username");

//       alert("Logged out successfully!");
//       setIsLoggedIn(false);
//       navigate("/login");
//     } catch (error) {
//       console.error("Logout failed", error);
//       alert("Failed to log out. Try again!");
//     }
//   };

//   return (
//     <div className="flex">
//       {/* Sidebar Navbar */}
//       <nav className="fixed top-0 left-0 h-screen w-64 bg-white shadow-md p-4 flex flex-col justify-between">
//         <div>
//           <h2 className="text-xl font-bold text-primary mb-4">Task Manager</h2>
//           <div className="flex flex-col space-y-4">
//             <Link to="/home" className="px-3 py-2 rounded hover:bg-gray-200">Home</Link>
//             <Link to="/addtask" className="px-3 py-2 rounded hover:bg-gray-200">Add Task</Link>
//             <Link to="/tasklist" className="px-3 py-2 rounded hover:bg-gray-200">List Task</Link>
//           </div>
//         </div>
        
//         {/* User Info & Logout Button */}
//         <div className="flex flex-col items-center">
//           <span className="font-semibold mb-2">({username || "Guest"})</span>
//           <button
//             onClick={handleLogout}
//             className="border border-gray-600 text-gray-700 px-4 py-2 rounded hover:bg-gray-100 flex items-center"
//           >
//             <i className="fa-solid fa-right-from-bracket mr-2"></i> Logout
//           </button>
//         </div>
//       </nav>
//     </div>
//   );
// }

// export default Navbar;



import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import "./Sidebar.css";

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
            Task Manager
          </Link>

          <div className="flex flex-col space-y-4">
  <Link
    to="/home"
    style={{
      padding: "0.5rem 1rem",
      borderRadius: "0.375rem",
      textDecoration: "none",
      color: "#4A4A4A", // Tailwind's text-gray-700 equivalent
      fontWeight: "600", // Tailwind's font-semibold equivalent
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
    List Task
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

