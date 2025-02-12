// import { useEffect, useState } from "react";
// import { fetchTasks, deleteTask, updateTask } from "../Services/api";
// import { toast } from "react-toastify";

// const TaskList = ({ refresh }) => {
//   const [tasks, setTasks] = useState([]);
//   const [editingTask, setEditingTask] = useState(null);
//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     fetchTasks(token)
//       .then((res) => setTasks(res.data))
//       .catch(() => toast.error("Failed to load tasks"));
//   }, [refresh]);

//   const handleStatusChange = async (id, newStatus) => {
//     try {
//       const taskToUpdate = tasks.find(task => task.id === id);
//       if (!taskToUpdate) return;

//       const updatedTask = { ...taskToUpdate, status: newStatus };
//       await updateTask(id, updatedTask, token);
//       setTasks(tasks.map(task => task.id === id ? updatedTask : task));
//       toast.success("Status updated successfully");
//     } catch (error) {
//       toast.error("Failed to update status");
//     }
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure you want to delete this task?")) {
//       try {
//         await deleteTask(id, token);
//         setTasks(tasks.filter(task => task.id !== id));
//         toast.success("Task deleted successfully");
//       } catch (error) {
//         toast.error("Failed to delete task");
//       }
//     }
//   };

//   const handleEditChange = (e) => {
//     setEditingTask({ ...editingTask, [e.target.name]: e.target.value });
//   };

//   const handleSaveEdit = async () => {
//     try {
//       await updateTask(editingTask.id, editingTask, token);
//       setTasks(tasks.map(task => task.id === editingTask.id ? editingTask : task));
//       toast.success("Task updated successfully");
//       setEditingTask(null);
//     } catch (error) {
//       toast.error("Failed to update task");
//     }
//   };

//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleDateString("en-GB");
//   };

//   return (
//     <div className="container mt-4">
//       <h3>Task List</h3>
//       <table className="table table-striped table-hover">
//         <thead>
//           <tr>
//             <th>Title</th>
//             <th>Description</th>
//             <th>Due Date</th>
//             <th>Status</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {tasks.length > 0 ? (
//             tasks.map((task) => (
//               <tr key={task.id}>
//                 <td>{task.title}</td>
//                 <td>{task.description}</td>
//                 <td>{formatDate(task.due_date)}</td>
//                 <td>
//                   <select
//                     className="form-select"
//                     value={task.status}
//                     onChange={(e) => handleStatusChange(task.id, e.target.value)}
//                   >
//                     <option value="pending">Pending</option>
//                     <option value="progress">In Progress</option>
//                     <option value="completed">Completed</option>
//                   </select>
//                 </td>
//                 <td>
//                   <button
//                     className="btn btn-primary btn-sm me-2"
//                     onClick={() => setEditingTask(task)}
//                   >
//                     Edit
//                   </button>
//                   <button
//                     className="btn btn-danger btn-sm"
//                     onClick={() => handleDelete(task.id)}
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="5" className="text-center">No tasks available</td>
//             </tr>
//           )}
//         </tbody>
//       </table>

//       {editingTask && (
//         <div className="modal show d-block" tabIndex="-1">
//           <div className="modal-dialog">
//             <div className="modal-content">
//               <div className="modal-header">
//                 <h5 className="modal-title">Edit Task</h5>
//                 <button type="button" className="btn-close" onClick={() => setEditingTask(null)}></button>
//               </div>
//               <div className="modal-body">
//                 <input
//                   type="text"
//                   className="form-control mb-2"
//                   name="title"
//                   value={editingTask.title}
//                   onChange={handleEditChange}
//                 />
//                 <textarea
//                   className="form-control mb-2"
//                   name="description"
//                   value={editingTask.description}
//                   onChange={handleEditChange}
//                 ></textarea>
//                 <input
//                   type="date"
//                   className="form-control mb-2"
//                   name="due_date"
//                   value={editingTask.due_date}
//                   onChange={handleEditChange}
//                 />
//                 <select
//                   className="form-select"
//                   name="status"
//                   value={editingTask.status}
//                   onChange={handleEditChange}
//                 >
//                   <option value="pending">Pending</option>
//                   <option value="progress">In Progress</option>
//                   <option value="completed">Completed</option>
//                 </select>
//               </div>
//               <div className="modal-footer">
//                 <button type="button" className="btn btn-secondary" onClick={() => setEditingTask(null)}>Cancel</button>
//                 <button type="button" className="btn btn-success" onClick={handleSaveEdit}>Save Changes</button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default TaskList;




import { useEffect, useState } from "react";
import { fetchTasks, deleteTask, updateTask } from "../Services/api";
import { toast } from "react-toastify";

const TaskList = ({ refresh }) => {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [sortBy, setSortBy] = useState(""); // Sorting option
  const [filterBy, setFilterBy] = useState(""); // Filtering option
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
    setEditingTask({ ...editingTask, [e.target.name]: e.target.value });
  };

  const handleSaveEdit = async () => {
    try {
      await updateTask(editingTask.id, editingTask, token);
      setTasks(tasks.map((task) => (task.id === editingTask.id ? editingTask : task)));
      toast.success("Task updated successfully");
      setEditingTask(null);
    } catch (error) {
      toast.error("Failed to update task");
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-GB");
  };

  // Filter tasks by status
  const filteredTasks = filterBy ? tasks.filter((task) => task.status === filterBy) : tasks;

  // Sort tasks based on selection
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortBy === "title") return a.title.localeCompare(b.title);
    if (sortBy === "due_date") return new Date(a.due_date) - new Date(b.due_date);
    if (sortBy === "status") return a.status.localeCompare(b.status);
    return 0;
  });

  return (
    <div className="container mt-4">
      <h3 className="text-center">Task List</h3>


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
          {sortedTasks.length > 0 ? (
            sortedTasks.map((task) => (
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
                  <button className="btn btn-primary btn-sm me-2" onClick={() => setEditingTask(task)}>
                    Edit
                  </button>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDelete(task.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">No tasks available</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Edit Task Modal */}
      {editingTask && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Task</h5>
                <button type="button" className="btn-close" onClick={() => setEditingTask(null)}></button>
              </div>
              <div className="modal-body">
                <input
                  type="text"
                  className="form-control mb-2"
                  name="title"
                  value={editingTask.title}
                  onChange={handleEditChange}
                />
                <textarea
                  className="form-control mb-2"
                  name="description"
                  value={editingTask.description}
                  onChange={handleEditChange}
                ></textarea>
                <input
                  type="date"
                  className="form-control mb-2"
                  name="due_date"
                  value={editingTask.due_date}
                  onChange={handleEditChange}
                />
                <select
                  className="form-select"
                  name="status"
                  value={editingTask.status}
                  onChange={handleEditChange}
                >
                  <option value="pending">Pending</option>
                  <option value="progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setEditingTask(null)}>
                  Cancel
                </button>
                <button type="button" className="btn btn-success" onClick={handleSaveEdit}>
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskList;
