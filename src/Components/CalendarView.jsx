


// import React, { useEffect, useState } from "react";
// import FullCalendar from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import { fetchCalendarTasks } from "../Services/api";

// const CalendarView = () => {
//   const [tasks, setTasks] = useState([]);

//   useEffect(() => {
//     const token = localStorage.getItem("token"); // Retrieve token from localStorage
//     if (token) {
//       fetchTasks(token);
//     }
//   }, []);

//   const fetchTasks = async (token) => {
//     try {
//       const response = await fetchCalendarTasks(token);
//       console.log("Fetched Tasks:", response.data); // Debugging

//       const formattedTasks = response.data.map((task) => ({
//         title: task.title,
//         start: task.start, // Ensure correct field name
//         backgroundColor: getStatusColor(task.status), // Full cell color
//         borderColor: getStatusColor(task.status), // Border color
//         display: "background", // Full cell highlight
//       }));
//       setTasks(formattedTasks);
//     } catch (error) {
//       console.error("Error fetching tasks:", error);
//     }
//   };

//   // Function to determine event color based on task status
//   const getStatusColor = (status) => {
//     switch (status?.toLowerCase()) {
//       case "pending":
//         return "red";
//       case "in progress":
//         return "yellow";
//       case "completed":
//         return "green";
//       default:
//         return "blue";
//     }
//   };

//   return (
//     <div className="calendar-container">
//       <FullCalendar
//         plugins={[dayGridPlugin]}
//         initialView="dayGridMonth"
//         events={tasks}
//         eventContent={renderEventContent} // Custom function to display title inside the colored cell
//       />
//     </div>
//   );
// };

// // Custom render function to show full cell color + task title
// const renderEventContent = (eventInfo) => {
//   return (
//     <div
//       style={{
//         backgroundColor: eventInfo.event.backgroundColor,
//         width: "100%",
//         height: "100%",
//         borderRadius: "4px",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         color: "white",
//         fontWeight: "bold",
//         fontSize: "14px",
//         textAlign: "center",
//         padding: "5px",
//       }}
//     >
//       {eventInfo.event.title} {/* Show task title */}
//     </div>
//   );
// };

// export default CalendarView;





import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { fetchCalendarTasks } from "../Services/api";

const CalendarView = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token"); // Retrieve token from localStorage
    if (token) {
      fetchTasks(token);
    }
  }, []);

  const fetchTasks = async (token) => {
    try {
      const response = await fetchCalendarTasks(token);
      console.log("Fetched Tasks:", response.data); // Debugging

      const formattedTasks = response.data.map((task) => ({
        title: task.title,
        start: task.start, // Ensure correct field name
        backgroundColor: getStatusColor(task.status), // Full cell color
        borderColor: getStatusColor(task.status), // Border color
      }));
      setTasks(formattedTasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  // Function to determine event color based on task status
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return "red";
      case "in progress":
        return "yellow";
      case "completed":
        return "green";
      default:
        return "blue";
    }
  };

  return (
    <div className="calendar-container">
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={tasks}
        eventContent={(eventInfo) => renderEventContent(eventInfo, tasks)}
      />
    </div>
  );
};

// Custom render function for events
const renderEventContent = (eventInfo, allTasks) => {
  // Check if multiple tasks exist on the same date
  const tasksOnSameDate = allTasks.filter(
    (task) => task.start === eventInfo.event.start
  );

  return (
    <div
      style={{
        backgroundColor: eventInfo.event.backgroundColor,
        width: "100%",
        height: "100%",
        borderRadius: "4px",
        display: "flex",
        alignItems: tasksOnSameDate.length > 1 ? "center" : "flex-start", // Center title only for multiple tasks
        justifyContent: "center",
        color: "white",
        fontWeight: "bold",
        fontSize: "14px",
        textAlign: "center",
        padding: "5px",
      }}
    >
      {eventInfo.event.title} {/* Show task title */}
    </div>
  );
};

export default CalendarView;
