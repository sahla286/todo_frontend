import React, { useState, useEffect } from "react";
import CalendarView from "../Components/calenderView/CalendarView";
import { getTasks } from "../Services/api";

function Home() {
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
