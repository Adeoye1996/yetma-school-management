import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import Homepage from './pages/Homepage';
import AdminDashboard from './pages/admin/AdminDashboard';
import StudentDashboard from './pages/student/StudentDashboard';
import TeacherDashboard from './pages/teacher/TeacherDashboard';
import LoginPage from './pages/LoginPage';
import AdminRegisterPage from './pages/admin/AdminRegisterPage';
import ChooseUser from './pages/ChooseUser';

// A higher-order component for protecting routes
const ProtectedRoute = ({ children, role }) => {
  const { currentRole } = useSelector(state => state.user);
  return currentRole === role ? children : <Navigate to="/" />;
};

const App = () => {
  const { currentRole } = useSelector(state => state.user);

  return (
    <Router>
      <Routes>
        {currentRole === null && (
          <>
            <Route path="/" element={<Homepage />} />
            <Route path="/choose" element={<ChooseUser visitor="normal" />} />
            <Route path="/chooseasguest" element={<ChooseUser visitor="guest" />} />

            <Route path="/Adminlogin" element={<LoginPage role="Admin" />} />
            <Route path="/Studentlogin" element={<LoginPage role="Student" />} />
            <Route path="/Teacherlogin" element={<LoginPage role="Teacher" />} />

            <Route path="/Adminregister" element={<AdminRegisterPage />} />
          </>
        )}

        <Route
          path="/admin"
          element={
            <ProtectedRoute role="Admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student"
          element={
            <ProtectedRoute role="Student">
              <StudentDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/teacher"
          element={
            <ProtectedRoute role="Teacher">
              <TeacherDashboard />
            </ProtectedRoute>
          }
        />

        <Route path='*' element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
