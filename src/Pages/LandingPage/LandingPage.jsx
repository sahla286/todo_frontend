import { Link } from "react-router-dom";
import "./LandingPage.css"; 

function LandingPage() {
  return (
    <div className="landing-container">
      <div className="landing-content">
        <h1 className="landing-title">Manage Your Tasks Efficiently</h1>
        <p className="landing-subtitle">
          Stay on top of your schedule with <span className="app-name">TaskManager</span>, 
          a powerful to-do list management system with calendar integration.
        </p>

        <h2 className="features-heading">Key Features:</h2>
        <ul className="features-list">
          <li>✔ Create, edit, and delete tasks effortlessly</li>
          <li>✔ Assign task details including title, description, status, and due date</li>
          <li>✔ View tasks in a sortable and filterable list</li>
          <li>✔ Seamless calendar integration to track deadlines</li>
          {/* <li>✔ Navigate between months and view daily task summaries</li> */}
        </ul>

        <p className="lt-text">Stay productive and organized with 
          <span className="app-name"> TaskManager</span>!
        </p>

        <Link to="/login" className="btn-primary">
          Get Started
        </Link>
      </div>
    </div>
  );
}

export default LandingPage;

