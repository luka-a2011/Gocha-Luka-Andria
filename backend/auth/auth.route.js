const { Router } = require("express");
const userSchema = require("../models/user.model");
const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const isAuth = require("../middlewares/isauth.middleware");
require("dotenv").config()
const authRouter = Router()





/**
 * @swagger
 * /auth/sign-up:
 *   post:
 *     summary: Register a new user
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - fullName
 *               - email
 *               - password
 *             properties:
 *               fullName:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 format: email
 *                 example: john@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: strongPassword123
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: user exist
 *       400:
 *         description: Bad request (validation error or user already exists)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: user exist
 */
authRouter.post("/sign-up", async (req, res) => {
    const { error } = userSchema.validate(req.body || {});
    if (error) {
        return res.status(400).json(error);
    }

    const { fullName, email, password } = req.body;

    const existUser = await userModel.findOne({ email });
    if (existUser) {
        return res.status(400).json({ message: "User already exists" });
    }

    const hashedPass = await bcrypt.hash(password, 10);

    res.status(201).json({ message: "User created successfully" });
});


/**
 * @swagger
 * /auth/sign-in:
 *   post:
 *     summary: Sign in an existing user
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: john@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: strongPassword123
 *     responses:
 *       200:
 *         description: Successfully signed in
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: "your_jwt_token_here"
 *       400:
 *         description: Invalid email or password
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: email and password invalid
 */
authRouter.post("/sign-in", async  (req, res) => {
    const {email, password} = req.body 
    if(!email || !password) {
        return res.status(400).json({message: "email and password"})
    }

    const existUser = await userModel.findOne({email}).select("password role")

    if(!existUser){
        return res.status(400).json({message: "email and password envalid"})
    }

    const isPassEqual = await bcrypt.compare(password, existUser.password)
    if(!isPassEqual){
        return res.status(400).json({message: "email and password envalid"})
    }


    const payload = {
       userId: existUser._id,
       role: existUser.role
    }


    const token = await jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: "1h"})

    res.json({ token, role: existUser.role });

})



/**
 * @swagger
 * /auth/current-user:
 *   get:
 *     summary: Get the currently authenticated user
 *     tags:
 *       - Auth
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved current user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: "60b8d8c3f4f05a7a9c3b8b8e"
 *                 fullName:
 *                   type: string
 *                   example: John Doe
 *                 email:
 *                   type: string
 *                   format: email
 *                   example: john@example.com
 *                 role:
 *                   type: string
 *                   example: user
 *       401:
 *         description: Unauthorized, token is missing or invalid
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Unauthorized
 */
authRouter.get("/current-user", isAuth, async (req, res) => {
    const user = await userModel.findById(req.userId)
    res.json(user)
})

module.exports = authRouter