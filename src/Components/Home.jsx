import React, { useState, useEffect } from "react";
import TaskList from "./TaskList";
import TaskForm from "./TaskForm";
import CalendarView from "./CalendarView";
import { getTasks } from "../Services/api";

const Home = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const response = await getTasks();
    setTasks(response.data);
  };

  return (
    <div className="container">
      {/* <h2>To-Do List Management</h2> */}
      {/* <TaskForm fetchTasks={fetchTasks} />
      <TaskList tasks={tasks} fetchTasks={fetchTasks} /> */}
      <CalendarView tasks={tasks} />
    </div>
  );
};

export default Home;
