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
        accountType // optional
      }),
    });

    // ✅ Parse response properly
    const data = await response.json();

    if (response.ok) {
      // ✅ Save token and role separately
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);

      alert("Login successful!");
      // ✅ Redirect user
      window.location.href = "/dashboard";
    } else {
      alert(data.message || "Login failed");
      console.log(data);
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
