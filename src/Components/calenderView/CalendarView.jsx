import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { fetchCalendarTasks, deleteTask, updateTask } from "../../Services/api";
import { Modal, Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import "./CalendarView.css"; 

const CalendarView = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      fetchTasks(token);
    }
  }, []);

  const fetchTasks = async (token) => {
    try {
      const response = await fetchCalendarTasks(token);
      const formattedTasks = response.data.map((task) => ({
        id: task.id,
        title: task.title,
        start: task.start,
        backgroundColor: getStatusColor(task.status),
        borderColor: getStatusColor(task.status),
        extendedProps: {
          status: task.status,
          description: task.description,
          due_date: task.due_date,
        },
      }));
      setTasks(formattedTasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return "#f87171";
      case "progress":
        return "#60a5fa";
      case "completed":
        return "#34d399";
      default:
        return "#fbbf24";
    }
  };

  const handleEventClick = (clickInfo) => {
    setSelectedTask({
      id: clickInfo.event.id,
      title: clickInfo.event.title,
      description: clickInfo.event.extendedProps?.description || "",
      due_date: clickInfo.event.extendedProps?.due_date || "",
      status: clickInfo.event.extendedProps?.status || "pending",
    });
    setShowModal(true);
  };

  const handleEditChange = (e) => {
    setSelectedTask({ ...selectedTask, [e.target.name]: e.target.value });
  };

  const handleSaveEdit = async () => {
    try {
      await updateTask(selectedTask.id, selectedTask);
      setShowModal(false);
      fetchTasks(localStorage.getItem("access_token"));
      toast.success("Task updated successfully");
    } catch (error) {
      toast.error("Failed to update task");
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await deleteTask(selectedTask.id);
        setShowModal(false);
        fetchTasks(localStorage.getItem("access_token"));
        toast.success("Task deleted successfully");
      } catch (error) {
        toast.error("Failed to delete task");
      }
    }
  };

  return (
    <div className="calendar-container mb-5">
      <div className="status-indicators">
        <div className="status-item">
          <span className="pending">Pending</span>
        </div>
        <div className="status-item">
          <span className="progress">In Progress</span>
        </div>
        <div className="status-item">
          <span className="completed">Completed</span>
        </div>
      </div>

      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={tasks}
        eventClick={handleEventClick}
      />

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control
                name="title"
                value={selectedTask?.title || ""}
                onChange={handleEditChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                value={selectedTask?.description || ""}
                onChange={handleEditChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Due Date</Form.Label>
              <Form.Control
                type="date"
                name="due_date"
                value={selectedTask?.due_date || ""}
                onChange={handleEditChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Status</Form.Label>
              <Form.Select
                name="status"
                value={selectedTask?.status || ""}
                onChange={handleEditChange}
              >
                <option value="pending">Pending</option>
                <option value="progress">In Progress</option>
                <option value="completed">Completed</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
          <Button variant="primary" onClick={handleSaveEdit}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CalendarView;
