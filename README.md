<h1 align="center">
    YETMA SCHOOL MANAGEMENT SYSTEM
</h1>

<h3 align="center">
A  class organization, and add students and faculty.Streamline school management,<br>
track attendance, assess performance, and provide additional feedback. <br>
Access records, view marks, and communicate effortlessly.
</h3>

# About

The School Management System is a web-based application built using the MERN (MongoDB, Express.js, React.js, Node.js) stack. It aims to streamline school management, class organization, and facilitate communication between students, teachers, and administrators.

## Features

- **User Roles:** The system supports three user roles: Admin, Teacher, and Student. Each role has specific functionalities and access levels.

- **Admin Dashboard:** Administrators can add new students and teachers, create classes and subjects, manage user accounts, and oversee system settings.

- **Attendance Tracking:** Teachers can easily take attendance for their classes, mark students as present or absent, and generate attendance reports.

- **Performance Assessment:** Teachers can assess students' performance by providing marks and feedback. Students can view their marks and track their progress over time.

- **Data Visualization:** Students can visualize their performance data through interactive charts and tables, helping them understand their academic performance at a glance.

- **Communication:** Users can communicate effortlessly through the system. Teachers can send messages to students and vice versa, promoting effective communication and collaboration.

## Technologies Used

- Frontend: React.js, Material UI, Redux
- Backend: Node.js, Express.js
- Database: MongoDB

<br>

# Installation

```sh
t
```
Open 2 terminals in separate windows/tabs.

Terminal 1: Setting Up Backend 
```sh
cd backend
npm install
npm start
```

Create a file called .env in the backend folder.
Inside it write this :

```sh
MONGO_URL = mongodb://127.0.0.1/school
```
If you are using MongoDB Compass you can use this database link but if you are using MongoDB Atlas then instead of this link write your own database link.

Terminal 2: Setting Up Frontend
```sh
git clone https://github.com/Adeoye1996/Webstack---Portfolio-Project.git
cd frontend
npm install
npm start
```
Now, navigate to `localhost:3000` in your browser. 
The Backend API will be running at `localhost:5000`.
<br>
```sh
cd frontend
npm start
```
```javascript
const REACT_APP_BASE_URL = "http://localhost:5000";
```
Additionally:

- When testing the project, start by signing up rather than logging in as a guest or using regular login if you haven't created an account yet.
  
  To use guest mode, navigate to `LoginPage.js` and provide an email and password from a project already created in the system. This simplifies the login process, and after creating your account, you can use your credentials.

Don't forget to leave a star for this project if you found the solution helpful. Thank you!

# Deployment
* Render - server side
* Netlify - client side

