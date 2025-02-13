import { useState } from "react";
import { useNavigate } from "react-router-dom";  
import { createTask } from "../Services/api";
import { toast } from "react-toastify";

const TaskForm = ({ refreshTasks }) => {
  const [task, setTask] = useState({ title: "", description: "", status: "pending", due_date: "" });
  const navigate = useNavigate();  

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log("Submitting Task:", task);  

    try {
      const response = await createTask(task);
      console.log("Task Created Response:", response);  
      
      if (response?.status === 201 || response?.status === 200) {
        toast.success("Task created successfully!");
        
        if (typeof refreshTasks === "function") {
          refreshTasks();
        } else {
          console.warn("refreshTasks is not a function");
        }
        setTask({ title: "", description: "", status: "pending", due_date: "" });
        setTimeout(() => {
          navigate("/home", { replace: true });
        }, 2000);
      } else {
        throw new Error("Unexpected response");
      }
      
    } catch (error) {
      console.error("Error creating task:", error.response?.data || error.message);
      toast.error("Failed to create task");
    }
  };

  return (
    <div className="container" >
      <div className="row justify-content-center" style={{marginTop:'120px'}}>
        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-body">
              <h4 className="mb-3 text-center">Create New Task</h4>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Title</label>
                  <input type="text" className="form-control" name="title" placeholder="Enter Title" value={task.title} onChange={handleChange} required />
                </div>

                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <textarea className="form-control" name="description" placeholder="Enter Description" value={task.description} onChange={handleChange}></textarea>
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

