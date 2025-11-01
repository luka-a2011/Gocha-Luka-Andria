const { Router } = require("express");
const postModels = require("../models/post.model");
const { isValidObjectId } = require("mongoose");
const { upload, deletefromcloudinary } = require("../config/cloudinary.config");
const isAuth = require("../middlewares/isauth.middleware"); // Auth middleware

const postRouter = Router();

/**
 * GET all posts
 * Public route
 */
postRouter.get("/", async (req, res) => {
  try {
    const posts = await postModels
      .find()
      .sort({ _id: -1 })
      .populate({ path: "author", select: "fullName email role" }); // Include full name, email, role
    res.status(200).json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * Create a new post
 * Protected route (requires auth)
 */
postRouter.post("/", isAuth, upload.single("image"), async (req, res) => {
  try {
    const { descriptione, Location } = req.body;
    const image = req.file?.path;

    if (!image || !descriptione || !Location) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const post = await postModels.create({
      image,
      descriptione,
      Location,
      author: req.userId, // Middleware sets req.userId
    });

    res.status(201).json({ message: "Post created successfully", post });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * Delete a post
 * Protected route (author or admin only)
 */
postRouter.delete("/:id", isAuth, async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid post ID" });
    }

    const post = await postModels.findById(id).populate("author", "role");

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Permission check: author OR admin
    if (post.author._id.toString() !== req.userId && req.role !== "admin") {
      return res.status(401).json({ message: "No permission to delete this post" });
    }

    // Delete image from Cloudinary if exists
    if (post.image) {
      const publicId = post.image.split("/").pop().split(".")[0];
      await deletefromcloudinary(`uploads/${publicId}`);
    }

    await postModels.findByIdAndDelete(id);
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = postRouter;
