


// import { Link, useNavigate } from "react-router-dom";
// import { logoutUser } from "../Services/api";

// function Navbar() {
//   const navigate = useNavigate();

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
//       navigate("/login");
//     } catch (error) {
//       console.error("Logout failed", error);
//       alert("Failed to log out. Try again!");
//     }
//   };

//   return (
//     <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
//       <div className="space-x-4">
//         <Link to="/home" className="px-3 py-2 hover:bg-gray-700 rounded">Home</Link>
//         <Link to="/addtask" className="px-3 py-2 hover:bg-gray-700 rounded">Add Task</Link>
//         <Link to="/tasklist" className="px-3 py-2 hover:bg-gray-700 rounded">List Task</Link>
//       </div>

//       <button 
//         onClick={handleLogout} 
//         className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
//       >
//         Logout
//       </button>
//     </nav>
//   );
// }

// export default Navbar;


import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { logoutUser } from "../Services/api";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if access token exists
    setIsLoggedIn(!!localStorage.getItem("access_token"));
  }, [location]); // Update when route changes

  const handleLogout = async () => {
    const refreshToken = localStorage.getItem("refresh_token");

    if (!refreshToken) {
      alert("You are already logged out!");
      navigate("/login");
      return;
    }

    try {
      await logoutUser(refreshToken);

      // Remove tokens from local storage
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");

      alert("Logged out successfully!");
      setIsLoggedIn(false);
      navigate("/login");
    } catch (error) {
      console.error("Logout failed", error);
      alert("Failed to log out. Try again!");
    }
  };

  // Hide logout button on Home, Login, and Registration pages
  const hideLogoutPages = [ "/","/login", "/register"];
  const shouldShowLogout = isLoggedIn && !hideLogoutPages.includes(location.pathname);

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <div className="space-x-4">
        <Link to="/home" className="px-3 py-2 hover:bg-gray-700 rounded">Home</Link>
        <Link to="/addtask" className="px-3 py-2 hover:bg-gray-700 rounded">Add Task</Link>
        <Link to="/tasklist" className="px-3 py-2 hover:bg-gray-700 rounded">List Task</Link>
      </div>

      {/* Show Logout button only if logged in and NOT on Home, Login, or Register pages */}
      {shouldShowLogout && (
        <button 
          onClick={handleLogout} 
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      )}
    </nav>
  );
}

export default Navbar;
