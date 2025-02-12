import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-blue-200">
      <h1 className="text-3xl font-bold">Welcome to Task Manager</h1>
      <Link to="/login" className="btn btn-primary mt-4 px-4 py-2 rounded">
        Go to Login
      </Link>
    </div>
  );
}

export default LandingPage;
