require("dotenv").config();
const mongoose = require("mongoose");

const connecttodb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB connected successfully");
  } catch (e) {
    console.error("MongoDB connection failed:", e.message);
  }
};

module.exports = connecttodb;
