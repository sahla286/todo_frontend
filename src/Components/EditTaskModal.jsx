import React, { useState, useEffect } from "react";

const EditTaskModal = ({ task, isOpen, onClose, onSave }) => {
  const [updatedTask, setUpdatedTask] = useState(task);

  useEffect(() => {
    setUpdatedTask(task); // Update state when task changes
  }, [task]);

  const handleChange = (e) => {
    setUpdatedTask({ ...updatedTask, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    onSave(updatedTask); // Call parent function to update task
    onClose(); // Close modal after saving
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Edit Task</h2>
        <label>Title:</label>
        <input type="text" name="title" value={updatedTask.title} onChange={handleChange} />

        <label>Description:</label>
        <textarea name="description" value={updatedTask.description} onChange={handleChange}></textarea>

        <label>Due Date:</label>
        <input type="date" name="due_date" value={updatedTask.due_date} onChange={handleChange} />

        <label>Status:</label>
        <select name="status" value={updatedTask.status} onChange={handleChange}>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>

        <button onClick={handleSave}>Save</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default EditTaskModal;
