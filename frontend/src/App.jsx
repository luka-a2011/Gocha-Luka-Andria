import React, { useState, useRef, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Home from "./components/Home.jsx";
import Report from "./components/Report.jsx";
import CleanUp from "./components/CleanUp.jsx";
import Register from "./components/Register.jsx";
import Login from "./components/Login.jsx";
import Dashboard from "./components/Dashboard.jsx";
import Profile from "./components/Profile.jsx";
import homeIcon from "./assets/home.png";
import settingsIcon from "./assets/setting.png";

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Report" element={<Report />} />
          <Route path="/CleanUp" element={<CleanUp />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/Profile" element={<Profile />} />
        </Routes>
      </div>
    </Router>
  );
}

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const navigateTo = (path) => {
    if (location.pathname !== path) navigate(path);
    setOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isLoggedIn = localStorage.getItem("loggedIn") === "true";
  const role = localStorage.getItem("role"); // admin, user, or null

  return (
    <header className="header">
      <img
        onClick={() => navigateTo("/")}
        className="logo"
        src="https://i0.wp.com/discoverandshare.org/wp-content/uploads/2025/07/da62b-recycling_sign_green.png?fit=1024%2C1024&ssl=1"
        alt="Logo"
      />
      <h4 className="main">CleanQuest</h4>

      {/* Main navigation buttons */}
      <div className="btn-group">
        <label className={`btn ${location.pathname === "/" ? "active" : ""}`}>
          <input
            src={homeIcon}
            alt="Home"
            className="nav-icon"
            type="radio"
            name="nav"
            hidden
            checked={location.pathname === "/"}
            onChange={() => navigateTo("/")}
          />
          <span>Feed</span>
        </label>

        <label className={`btn ${location.pathname === "/Report" ? "active" : ""}`}>
          <input
            type="radio"
            name="nav"
            hidden
            checked={location.pathname === "/Report"}
            onChange={() => navigateTo("/Report")}
          />
          <span>Report</span>
        </label>

        <label className={`btn ${location.pathname === "/CleanUp" ? "active" : ""}`}>
          <input
            type="radio"
            name="nav"
            hidden
            checked={location.pathname === "/CleanUp"}
            onChange={() => navigateTo("/CleanUp")}
          />
          <span>CleanUp</span>
        </label>
      </div>

      <div className="auth-buttons" ref={dropdownRef}>
        <img
          src={settingsIcon}
          alt="Settings"
          className="settings-icon"
          onClick={() => setOpen(!open)}
        />

        <div className={`dropdown ${open ? "open" : ""}`}>
          {/* Dashboard visible only if logged in AND admin */}
          {isLoggedIn && role === "admin" && (
            <button className="header-btn" onClick={() => navigateTo("/Dashboard")}>
              Dashboard
            </button>
          )}

          {/* Show Profile & Logout only if logged in */}
          {isLoggedIn ? (
            <>
              <button className="header-btn" onClick={() => navigateTo("/Profile")}>
                Profile
              </button>
              <button
                className="header-btn"
                onClick={() => {
                  localStorage.removeItem("loggedIn");
                  localStorage.removeItem("role");
                  navigateTo("/Login");
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button className="header-btn" onClick={() => navigateTo("/Login")}>
                Login
              </button>
              <button className="header-btn" onClick={() => navigateTo("/Register")}>
                Register
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default App;
