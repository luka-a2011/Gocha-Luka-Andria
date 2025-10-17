const { Router } = require("express");
const userModel = require("../models/user.model");
const { upload } = require("../config/cloudinary.config");


const userRouter = Router()

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     tags:
 *       - Users
 *     description: Returns a list of all registered users sorted by most recent.
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   fullName:
 *                     type: string
 *                   email:
 *                     type: string
 *                   avatar:
 *                     type: string
 *                     nullable: true
 *                 example:
 *                   _id: "60f7e1c8f1e2a72abc123456"
 *                   fullName: "Jane Doe"
 *                   email: "jane@example.com"
 *                   avatar: "https://res.cloudinary.com/demo/image/upload/v1620000000/sample.jpg"
 *       500:
 *         description: Server error
 */
userRouter.get("/", async (req, res) => {
    const user = await userModel.find().sort({_id: -1})
    res.status(200).json(users)
})


/**
 * @swagger
 * /users:
 *   put:
 *     summary: Update user email and avatar
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: newemail@example.com
 *               avatar:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: updated
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
userRouter.put("/", upload.single("avatar"), async (req, res) => {
    const id = req.userId
    const {email} = req.body
    const filePath = req.file.path

    console.log(req.file)

    await userModel.findByIdAndUpdate(id, {email, avatar: filePath})
    await deletefromcloudinary(req.file.filename.split("/")[1])
    res.status(200).json({ message: "updated"})
})


module.exports = userRouter