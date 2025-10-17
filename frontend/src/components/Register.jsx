import React, { useState } from "react";
import "./register.css";
import Google from "../assets/google.png";

export default function Register() {
  const [accountType, setAccountType] = useState("volunteer");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    cardNumber: "",
    expiry: "",
    cvv: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ ...formData, accountType });
    alert("Registration submitted! Check console for data.");
  };

  return (
    <div className="container">
      <h2>Create Account</h2>

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

        <div className="input-group">
          <label>Credit Card Number</label>
          <input
            type="text"
            name="cardNumber"
            value={formData.cardNumber}
            onChange={handleChange}
            required
            placeholder="1234 5678 9012 3456"
          />
        </div>

        <div className="credit-info">
          <div>
            <label>Expiry</label>
            <input
              type="text"
              name="expiry"
              value={formData.expiry}
              onChange={handleChange}
              required
              placeholder="MM/YY"
            />
          </div>
          <div>
            <label>CVV</label>
            <input
              type="text"
              name="cvv"
              value={formData.cvv}
              onChange={handleChange}
              required
              placeholder="123"
            />
          </div>
        </div>

        <p className="switch-text">
        Already have an account? <a href="/Login">Log in</a>
      </p>

        <button type="submit" className="submit-btn">Register</button>

        <button className="google-btn">
  <img src={Google} alt="Google logo" />
  <span>Sign in with Google</span>
</button>

      </form>
    </div>
  );
}
