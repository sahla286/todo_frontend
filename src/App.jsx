import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./Components/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import LandingPage from "./Pages/LandingPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./Components/Navbar";
import TaskForm from "./Components/TaskForm";
import TaskList from "./Components/TaskList";

function App() {
  const location = useLocation();

  // Hide Navbar on Landing Page, Login, and Registration pages
  const hideNavbarRoutes = ["/", "/login", "/register"];
  const shouldShowNavbar = !hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      <ToastContainer />
      {shouldShowNavbar && <Navbar />} {/* Show Navbar only if allowed */}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/addtask" element={<TaskForm />} />
        <Route path="/tasklist" element={<TaskList />} />
      </Routes>
    </>
  );
}

export default App;
