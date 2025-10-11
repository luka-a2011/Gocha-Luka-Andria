import React, { useState } from "react";
import "./Report.css"; // optional, create for styling
import cameraIcon from "../assets/camera.png";

function Report() {
  const [photo, setPhoto] = useState(null);
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");

  const handlePhotoChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // handle form submission logic here
    console.log({ photo, description, location });
    alert("Report submitted!");
    // clear form
    setPhoto(null);
    setDescription("");
    setLocation("");
  };

  return (
    <div className="report-container">
      <h2>Report a Trash Spot</h2>
      <p>
        Help your community by reporting areas that need cleanup. Your report
        will help volunteers find and address environmental issues.
      </p>

      <div className="new-report">
        <h3>New Report</h3>
        <p>Provide details about the trash spot to help volunteers understand the situation</p>

        <form onSubmit={handleSubmit} className="report-form">
          <div className="form-group">
            <label>Before Photo *</label>
              <div className="photo-upload">
      <input
        id="photoInput"
        type="file"
        accept="image/*"
        onChange={handlePhotoChange}
        style={{ display: "none" }}
      />
      <label htmlFor="photoInput">
        <img src={cameraIcon} alt="Upload" className="camera-icon" />
      </label>

      {photo && <span className="photo-name">Selected: {photo.name}</span>}
    </div>
            {photo && <span>Selected: {photo.name}</span>}
          </div>

          <div className="form-group">
            <label>Description *</label>
            <textarea
            className="brd"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              maxLength={500}
              placeholder="Describe what type of trash, how much, and any safety concerns..."
            />
            <small>{description.length}/500 characters</small>
          </div>

          <div className="form-group">
            <label>Location *</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter address or landmark (e.g., Central Park, near main entrance)"
            />
          </div>

          <button type="submit" className="reportBTN">Submit Report</button>
        </form>

        <div className="tips">
          <h4>Tips for Good Reports</h4>
          <ul>
            <li>Take clear photos showing the extent of the problem</li>
            <li>Include landmarks or street names for easy location</li>
            <li>Mention any safety hazards (broken glass, chemicals, etc.)</li>
            <li>Describe the type and amount of trash present</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Report;
