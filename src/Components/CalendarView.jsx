


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




// import React, { useEffect, useState } from "react";
// import FullCalendar from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import { fetchCalendarTasks } from "../Services/api";

// const CalendarView = () => {
//   const [tasks, setTasks] = useState([]);

//   useEffect(() => {
//     const token = localStorage.getItem("access_token"); // Retrieve token from localStorage
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
//         extendedProps: { status: task.status, description: task.description }, // Additional data for event
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
//         return "#f87171"; // Tailwind's red-400
//       case "in progress":
//         return "#fbbf24"; // Tailwind's yellow-400
//       case "completed":
//         return "#34d399"; // Tailwind's green-400
//       default:
//         return "#60a5fa"; // Tailwind's blue-400
//     }
//   };

//   return (
//     <div className="calendar-container">
//       <FullCalendar
//         plugins={[dayGridPlugin]}
//         initialView="dayGridMonth"
//         events={tasks}
//         eventContent={(eventInfo) => renderEventContent(eventInfo)}
//       />
//     </div>
//   );
// };

// // Custom render function for events
// const renderEventContent = (eventInfo) => {
//   const { title, backgroundColor, extendedProps } = eventInfo.event;
//   const { status, description } = extendedProps;

//   return (
//     <div
//       style={{
//         backgroundColor: backgroundColor,
//         width: "100%",
//         height: "100%",
//         borderRadius: "6px",
//         display: "flex",
//         flexDirection: "column",
//         justifyContent: "space-between",
//         alignItems: "center",
//         color: "white",
//         fontWeight: "bold",
//         fontSize: "14px",
//         textAlign: "center",
//         padding: "5px",
//         position: "relative",
//         boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Subtle shadow for depth
//         cursor: "pointer",
//       }}
//       className="calendar-event"
//       title={`Status: ${status}\nDescription: ${description}`} // Tooltip with extra info
//     >
//        <span>{title}</span>
//      {/* <div
//         className="status-badge"
//         style={{
//           position: "absolute",
//           top: "5px",
//           left: "50%",
//           transform: "translateX(-50%)",
//           padding: "2px 8px",
//           borderRadius: "12px",
//           backgroundColor: "#333",
//           color: "white",
//           fontSize: "12px",
//         }}
//       >
//         {status}
//       </div> */}
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
    const token = localStorage.getItem("access_token"); // Retrieve token from localStorage
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
        extendedProps: { status: task.status, description: task.description }, // Additional data for event
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
        return "#f87171"; // Tailwind's red-400
      case "progress":
        return  "#60a5fa"; // Tailwind's yellow-400
      case "completed":
        return "#34d399"; // Tailwind's green-400
      default:
        return "#fbbf24"; // Tailwind's blue-400
    }
  };

  return (
    <div className="calendar-container">
      {/* Status Indicators Section */}
      <div className="status-indicators mb-6" style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "8px", width: "100%" }}>
  <div className="status-item" style={{ textAlign: "center", flexShrink: 0 }}>
    <span
      style={{
        backgroundColor: "#f87171",
        color: "white",
        padding: "4px 8px", // Reduced padding for smaller size
        borderRadius: "12px",
        fontWeight: "bold",
        display: "inline-block",
      }}
    >
      Pending
    </span>
  </div>
  <div className="status-item" style={{ textAlign: "center", flexShrink: 0 }}>
    <span
      style={{
        backgroundColor: "#60a5fa",
        color: "white",
        padding: "4px 8px", // Reduced padding for smaller size
        borderRadius: "12px",
        fontWeight: "bold",
        display: "inline-block",
      }}
    >
      In Progress
    </span>
  </div>
  <div className="status-item" style={{ textAlign: "center", flexShrink: 0 }}>
    <span
      style={{
        backgroundColor: "#34d399",
        color: "white",
        padding: "4px 8px", // Reduced padding for smaller size
        borderRadius: "12px",
        fontWeight: "bold",
        display: "inline-block",
      }}
    >
      Completed
    </span>
  </div>
</div>




      {/* Full Calendar */}
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={tasks}
        eventContent={(eventInfo) => renderEventContent(eventInfo)}
      />
    </div>
  );
};

// Custom render function for events
const renderEventContent = (eventInfo) => {
  const { title, backgroundColor, extendedProps } = eventInfo.event;
  const { status, description } = extendedProps;

  return (
    <div
      style={{
        backgroundColor: backgroundColor,
        width: "100%",
        height: "100%",
        borderRadius: "6px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        color: "white",
        fontWeight: "bold",
        fontSize: "14px",
        textAlign: "center",
        padding: "5px",
        position: "relative",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Subtle shadow for depth
        cursor: "pointer",
      }}
      className="calendar-event"
      title={`Status: ${status}\nDescription: ${description}`} // Tooltip with extra info
    >
      <span>{title}</span>
    </div>
  );
};

export default CalendarView;
