import React, { useState } from "react";
import "./register.css";
import Google from "../assets/google.png";

export default function Login() {
  const [accountType, setAccountType] = useState("volunteer");
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/auth/sign-in", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          accountType // optional if you want to store type
        })
      });

      const token = await response.json();

      if (response.ok) {
        // Save JWT token in localStorage
        localStorage.setItem("token", token);
        alert("Login successful!");
        // Redirect to dashboard or homepage
        window.location.href = "/dashboard";
      } else {
        alert(token.message || "Login failed");
        console.log(token);
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Try again.");
    }
  };

  return (
    <div className="container">
      <h1>Login</h1>

      <div className="account-type">
        <button
          type="button"
          className={accountType === "volunteer" ? "active" : ""}
          onClick={() => setAccountType("volunteer")}
        >
          Volunteer
        </button>
        <button
          type="button"
          className={accountType === "donator" ? "active" : ""}
          onClick={() => setAccountType("donator")}
        >
          Donator
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="you@example.com"
          />
        </div>

        <div className="input-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="Enter your password"
          />
        </div>

        <p className="switch-text">
          Dont have an account? <a href="/Register">Register</a>
        </p>

        <button type="submit" className="submit-btn">Login</button>

        <button className="google-btn">
          <img src={Google} alt="Google logo" />
          <span>Sign in with Google</span>
        </button>

      </form>
    </div>
  );
}
