import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchTasks, updateTask } from "../Services/api";
import { toast } from "react-toastify";

const EditTaskPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("access_token");
  const [task, setTask] = useState(null);

  useEffect(() => {
    fetchTasks(token)
      .then((res) => {
        const selectedTask = res.data.find((t) => t.id.toString() === id);
        setTask(selectedTask);
      })
      .catch(() => toast.error("Failed to load task"));
  }, [id, token]);

  const handleEditChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSaveEdit = async () => {
    try {
      await updateTask(task.id, task, token);
      toast.success("Task updated successfully");
      navigate("/tasks"); // Redirect back to Task List
    } catch (error) {
      toast.error("Failed to update task");
    }
  };

  if (!task) return <p>Loading...</p>;

  return (
    <div className="container mt-4">
      <h3 className="text-center">Edit Task</h3>
      <div className="card p-4">
        <input
          type="text"
          className="form-control mb-2"
          name="title"
          value={task.title}
          onChange={handleEditChange}
        />
        <textarea
          className="form-control mb-2"
          name="description"
          value={task.description}
          onChange={handleEditChange}
        ></textarea>
        <input
          type="date"
          className="form-control mb-2"
          name="due_date"
          value={task.due_date}
          onChange={handleEditChange}
        />
        <select
          className="form-select mb-2"
          name="status"
          value={task.status}
          onChange={handleEditChange}
        >
          <option value="pending">Pending</option>
          <option value="progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
        <button className="btn btn-secondary me-2" onClick={() => navigate("/tasks")}>
          Cancel
        </button>
        <button className="btn btn-primary" onClick={handleSaveEdit}>
          Save
        </button>
      </div>
    </div>
  );
};

export default EditTaskPage;
