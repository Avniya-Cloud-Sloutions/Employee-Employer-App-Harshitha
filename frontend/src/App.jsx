// src/App.jsx

import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import ForgotPassword from "./pages/ForgotPassword";
import AddProfile from "./pages/AddProfile";
import ViewProfiles from "./pages/ViewProfiles";
import DashboardEmployee from "./pages/DashboardEmployee";
import DashboardEmployer from "./pages/DashboardEmployer";
import Header from "./components/Header";
import UpdateProfile from "./pages/UpdateProfile";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // ✅ Loading state

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
    setLoading(false); // ✅ Done checking localStorage
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  if (loading) {
    return <div className="text-center mt-10 text-lg">Loading...</div>; // ✅ Prevent flash redirect
  }

  return (
    <Router>
      <Header user={user} onLogout={handleLogout} />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Employee Dashboard */}
        <Route
          path="/dashboard-employee"
          element={
            user?.role === "employee" ? <DashboardEmployee /> : <Navigate to="/login" />
          }
        />

        {/* Employer Dashboard */}
        <Route
          path="/dashboard-employer"
          element={
            user?.role === "employer" ? <DashboardEmployer /> : <Navigate to="/login" />
          }
        />

        {/* Shared Profile Routes */}
        <Route
          path="/add-profile"
          element={user ? <AddProfile user={user} /> : <Navigate to="/login" />}
        />
        <Route
          path="/view-profiles"
          element={user ? <ViewProfiles user={user} /> : <Navigate to="/login" />}
        />
        <Route
          path="/update-profile/:id"
          element={user ? <UpdateProfile /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
