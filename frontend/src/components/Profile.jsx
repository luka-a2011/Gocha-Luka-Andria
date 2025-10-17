import React from "react";
import "./Profile.css";

const Profile = () => {
  return (
    <div className="profile-container">
      <h2>My Profile</h2>
      <div className="profile-card">
        <img
          src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
          alt="Profile"
          className="profile-photo"
        />
        <div className="profile-info">
          <h3>John Doe</h3>
          <p>Email: johndoe@example.com</p>
          <p>Status: Volunteer</p>
          <button className="edit-btn">Edit Profile</button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
