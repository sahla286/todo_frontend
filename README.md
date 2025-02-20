TaskManager

 → Tech Stack
   - Frontend: React
   - Backend: Python Django REST Framework (DRF)
   - Database: MySQL
   - Authentication: JWT (Django Simple JWT)

TaskManager Frontend (React)
 → Pages:
=======
→ Pages:
   - Landing Page: Introduction to the TaskManager app with a call-to-action to log in.
   - Registration Page: Allows users to create an account.
   - Login Page: Secure authentication for returning users.
   - Home Page:
        Uses FullCalendar to display tasks organized by due dates.
        Users can navigate between months to view scheduled tasks.
        Clicking on a date reveals tasks due that day.
   - Add Task Page: Enables users to create new tasks with details like title, description, due date, and priority.
   - Task List View:
        Displays all tasks in a structured format.
        Supports sorting by date, title, or status.
        Includes filtering options (e.g., completed, pending, progress).
 → Features:
     Responsive UI: Works across mobile, tablet, and desktop devices for a smooth user experience.


---
=======
 →  Features:
      Responsive UI: Works across mobile, tablet, and desktop devices for a smooth user experience.


## Setup & Deployment Guide

### Prerequisites:
- Python
- Node.js 
- React
- MySQL Server
- Git



### Frontend Setup (React)
1. Install Node.js & Create React App:
      npm i -g vite -> install vite
      npm create vite@latest <appname> -> create project folder
      cd <appname>
      npm install -> create node module
=======
### Frontend Setup (React)
1. Install Node.js & Create React App:
     - npm i -g vite -> install vite
     - npm create vite@latest [appname] -> create project folder
     - cd [appname]
     - npm install -> create node module
   
2. Install Dependencies:
      npm install axios react-router-dom react-bootstrap bootstrap react-toastify @fullcalendar/react @fullcalendar/daygrid @fullcalendar/interaction react-modal
 
3. Start React Application:
      npm run dev





