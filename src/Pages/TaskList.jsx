import { useEffect, useState } from "react";
import { fetchTasks, deleteTask, updateTask } from "../Services/api";
import { toast } from "react-toastify";
import { Modal, Button, Form } from "react-bootstrap";

function TaskList({ refresh }) {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [sortBy, setSortBy] = useState(""); 
  const [filterBy, setFilterBy] = useState("");
  const token = localStorage.getItem("access_token");

  useEffect(() => {
    fetchTasks(token)
      .then((res) => setTasks(res.data))
      .catch(() => toast.error("Failed to load tasks"));
  }, [refresh]);

  const handleStatusChange = async (id, newStatus) => {
    try {
      const taskToUpdate = tasks.find((task) => task.id === id);
      if (!taskToUpdate) return;

      const updatedTask = { ...taskToUpdate, status: newStatus };
      await updateTask(id, updatedTask, token);
      setTasks(tasks.map((task) => (task.id === id ? updatedTask : task)));
      toast.success("Status updated successfully");
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await deleteTask(id, token);
        setTasks(tasks.filter((task) => task.id !== id));
        toast.success("Task deleted successfully");
      } catch (error) {
        toast.error("Failed to delete task");
      }
    }
  };

  const handleEditChange = (e) => {
    setSelectedTask({ ...selectedTask, [e.target.name]: e.target.value });
  };

  const handleSaveEdit = async () => {
    try {
      await updateTask(selectedTask.id, selectedTask, token);
      setShowModal(false);
      setTasks(tasks.map((task) => (task.id === selectedTask.id ? selectedTask : task)));
      toast.success("Task updated successfully");
    } catch (error) {
      toast.error("Failed to update task");
    }
  };

  const formatDate = (dateString) => new Date(dateString).toLocaleDateString("en-GB");

  const filteredTasks = filterBy ? tasks.filter((task) => task.status === filterBy) : tasks;
  
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortBy === "title") return a.title.localeCompare(b.title);
    if (sortBy === "due_date") return new Date(a.due_date) - new Date(b.due_date);
    if (sortBy === "status") return a.status.localeCompare(b.status);
    return 0;
  });

  return (
    <div className="container" style={{marginTop:'100px'}}>
      <h3 className="text-center mb-3">Task List</h3>


      <div className="d-flex justify-content-between mb-3">
  <div className="w-auto">
    <select className="form-select form-select-sm me-2" onChange={(e) => setSortBy(e.target.value)}>
      <option value="">Sort By</option>
      <option value="title">Title</option>
      <option value="due_date">Due Date</option>
      <option value="status">Status</option>
    </select>
  </div>

  <div className="w-auto">
    <select className="form-select form-select-sm" onChange={(e) => setFilterBy(e.target.value)}>
      <option value="">Filter By Status</option>
      <option value="pending">Pending</option>
      <option value="progress">In Progress</option>
      <option value="completed">Completed</option>
    </select>
  </div>
</div>


      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Due Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedTasks.map((task) => (
            <tr key={task.id}>
              <td>{task.title}</td>
              <td>{task.description}</td>
              <td>{formatDate(task.due_date)}</td>
              <td>
                <select
                  className="form-select"
                  value={task.status}
                  onChange={(e) => handleStatusChange(task.id, e.target.value)}
                >
                  <option value="pending">Pending</option>
                  <option value="progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </td>
              <td>
                <button className="btn btn-primary btn-sm me-2" onClick={() => { setSelectedTask(task); setShowModal(true); }}>
                  Edit
                </button>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(task.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-2">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" name="title" value={selectedTask?.title || ""} onChange={handleEditChange} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" name="description" value={selectedTask?.description || ""} onChange={handleEditChange} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Due Date</Form.Label>
              <Form.Control type="date" name="due_date" value={selectedTask?.due_date || ""} onChange={handleEditChange} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Status</Form.Label>
              <Form.Select name="status" value={selectedTask?.status || "pending"} onChange={handleEditChange}>
                <option value="pending">Pending</option>
                <option value="progress">In Progress</option>
                <option value="completed">Completed</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
          <Button variant="primary" onClick={handleSaveEdit}>Save</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default TaskList;