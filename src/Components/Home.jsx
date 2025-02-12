import React, { useState, useEffect } from "react";
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
      <CalendarView tasks={tasks} />
    </div>
  );
};

export default Home;
