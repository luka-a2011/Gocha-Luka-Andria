import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Home from "./components/Home.jsx";
import Report from "./components/Report.jsx";
import CleanUp from "./components/CleanUp.jsx";
import Register from "./components/Register.jsx";
import Login from "./components/Login.jsx";
import homeIcon from "./assets/home.png";

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
        </Routes>
      </div>
    </Router>
  );
}

function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const navigateTo = (path) => {
    if (location.pathname !== path) navigate(path);
  };

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
          src={homeIcon} alt="Home" className="nav-icon"
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

      <div className="auth-buttons">
        <button className="header-btn" onClick={() => navigateTo("/Login")}>
          Login
        </button>
        <button className="header-btn" onClick={() => navigateTo("/Register")}>
          Register
        </button>
      </div>
    </header>
  );
}



export default App;
