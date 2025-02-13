import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import LandingPage from "./Pages/LandingPage/LandingPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./Components/Navbar/Navbar";
import TaskForm from "./Pages/TaskForm";
import TaskList from "./Pages/TaskList";

function App() {
  return (
    <>
      <ToastContainer />
      <Navbar />
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
