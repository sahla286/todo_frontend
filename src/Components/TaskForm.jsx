import { useState } from "react";
import { useNavigate } from "react-router-dom";  // Import useNavigate
import { createTask } from "../Services/api";
import { toast } from "react-toastify";

const TaskForm = ({ refreshTasks }) => {
  const [task, setTask] = useState({ title: "", description: "", status: "pending", due_date: "" });
  const token = localStorage.getItem("access_token");  // ✅ Use correct key

  const navigate = useNavigate();  // Initialize navigate

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

// const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await createTask(task, token);
//       toast.success("Task created successfully!");
//       refreshTasks();
//       setTask({ title: "", description: "", status: "pending", due_date: "" });
      
//       console.log("Navigating to /home");  // ✅ Debugging log
//       navigate("/home", { replace: true });  // ✅ Use replace:true
//     } catch (error) {
//       toast.error("Failed to create task");
//       console.error("Error creating task:", error);
//     }
//   };

const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log("Submitting Task:", task);  // ✅ Debugging

    try {
      await createTask(task);
      toast.success("Task created successfully!");
      refreshTasks();
      setTask({ title: "", description: "", status: "pending", due_date: "" });
      navigate("/home", { replace: true });
    } catch (error) {
      console.error("Error creating task:", error.response?.data || error.message);
      toast.error("Failed to create task");
    }
};

  

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-body">
              <h4 className="mb-3 text-center">Create New Task</h4>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Title</label>
                  <input type="text" className="form-control" name="title" placeholder="Enter Task Title" value={task.title} onChange={handleChange} required />
                </div>

                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <textarea className="form-control" name="description" placeholder="Enter Task Description" value={task.description} onChange={handleChange}></textarea>
                </div>

                <div className="mb-3">
                  <label className="form-label">Due Date</label>
                  <input type="date" className="form-control" name="due_date" value={task.due_date} onChange={handleChange} required />
                </div>

                <div className="text-center">
                  <button type="submit" className="btn btn-primary w-100">Add Task</button>
                </div>

              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskForm;
