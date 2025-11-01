import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import "./Home.css";
import ImageCarousel from "./ImageCarousel";

const Home = () => {
  const navigate = useNavigate(); 

  const [showDonateModal, setShowDonateModal] = useState(false);
  const [selectedReportTitle, setSelectedReportTitle] = useState("");
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [customAmount, setCustomAmount] = useState("");
  const [posts, setPosts] = useState([]);

  const userId = localStorage.getItem("userId");
  const userRole = localStorage.getItem("role");

  const openDonateModal = (title) => {
    setSelectedReportTitle(title);
    setShowDonateModal(true);
  };

  const closeDonateModal = () => {
    setShowDonateModal(false);
    setSelectedAmount(null);
    setCustomAmount("");
  };

  const handleAmountSelect = (amount) => {
    setSelectedAmount(amount);
    setCustomAmount("");
  };

  const handleCustomChange = (e) => {
    setCustomAmount(e.target.value);
    setSelectedAmount(null);
  };

  const handleDonate = () => {
    const amount = selectedAmount || customAmount;
    if (!amount) return alert("Please enter or select an amount.");
    alert(`Thank you for donating $${amount} to "${selectedReportTitle}"!`);
    closeDonateModal();
  };

  // Fetch posts from backend
  const fetchPosts = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch("http://localhost:3000/posts", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        setPosts(data);
      } else {
        console.error("Failed to fetch posts:", await response.json());
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // Delete post
  const handleDelete = async (postId) => {
    const confirm = window.confirm("Are you sure you want to delete this post?");
    if (!confirm) return;

    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`http://localhost:3000/posts/${postId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        alert("Post deleted successfully!");
        setPosts(posts.filter((p) => p._id !== postId));
      } else {
        const data = await response.json();
        alert(data.message || "Failed to delete post");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to delete post");
    }
  };

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h1>Transform Your Community</h1>
          <p>
            Report trash spots, volunteer for cleanups, and support environmental heroes.
            Together we create cleaner, healthier communities one spot at a time.
          </p>
          <div className="hero-buttons">
            <button className="report-btn" onClick={() => navigate("/Report")}>
              Report Trash Spot
            </button>
            <button className="join-btn" onClick={() => navigate("/CleanUp")}>
              Join Cleanup
            </button>
          </div>
        </div>
      </section>

      <section className="stats">
        <p className="subtitle">COMMUNITY VOLUNTEERS CLEANING UP THE ENVIRONMENT</p>
        <h2>{posts.length} Active Reports</h2>
      </section>

      <section className="feed">
        <h2>Community Feed</h2>
        <p className="filter">All • Need Cleanup • Cleaned</p>

        <div className="report-list">
          {posts.map((post) => (
            <div className="report-card" key={post._id}>
              <ImageCarousel images={[post.image]} />
              <div className="report-info">
                <h3>{post.descriptione}</h3>
                <p>
                  <strong>Location:</strong> {post.Location} <br />
                  Reported: {new Date(post.createdAt).toLocaleDateString()} 
                </p>
                <p className="donations">0 donations</p>

                <button className="donate-btn" onClick={() => openDonateModal(post.descriptione)}>
                  Donate
                </button>

                {(post.author._id.toString() === userId || userRole === "admin") && (
                  <button className="delete-btn" onClick={() => handleDelete(post._id)}>
                    Delete
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {showDonateModal && (
        <div className="modal-overlay" onClick={closeDonateModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Donate to Support Cleanup</h2>
            <p>{selectedReportTitle}</p>
            <div className="preset-amounts">
              {[5, 10, 25, 50].map((amt) => (
                <button
                  key={amt}
                  className={selectedAmount === amt ? "selected" : ""}
                  onClick={() => handleAmountSelect(amt)}
                >
                  ${amt}
                </button>
              ))}
            </div>
            <div className="custom-amount">
              <label>Custom Amount: </label>
              <input
                type="number"
                min="1"
                value={customAmount}
                onChange={handleCustomChange}
                placeholder="Enter your amount"
              />
            </div>
            <div className="modal-buttons">
              <button className="donate-confirm" onClick={handleDonate}>
                Donate
              </button>
              <button className="donate-cancel" onClick={closeDonateModal}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
