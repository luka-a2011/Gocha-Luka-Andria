// src/components/Dashboard.jsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const userRole = localStorage.getItem("role");
    if (userRole !== "admin") {
      alert("Access denied. Admins only.");
      navigate("/"); 
    }
  }, [navigate]);

  return (
    <div className="dashboard">
      <h1>Admin Dashboard</h1>
      <p>Welcome, Admin! Here you can manage reports, users, and cleanups.</p>

      <div className="admin-controls">
        <button onClick={() => alert("Managing reports...")}>Manage Reports</button>
        <button onClick={() => alert("Managing users...")}>Manage Users</button>
        <button onClick={() => alert("Viewing cleanups...")}>View Cleanups</button>
      </div>
    </div>
  );
};

export default Dashboard;
