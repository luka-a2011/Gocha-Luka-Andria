const express = require("express")
const userRouter = require("./users/user.route")
const connecttodb = require("./db/connecttodb")
const authRouter = require("./auth/auth.route")
const isAuth = require("./middlewares/isauth.middleware")
const postRouter = require("./posts/post.route")
const cors = require("cors")
const app = express()
const {upload} = require ("./config/cloudinary.config")
const swagger = require("./swagger");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");


// const upload = multer({storage})

app.use(cors())
app.use(express.json())
app.use(express.static("uploads"))


const specs = swaggerJsdoc(swagger)
app.use("/docs", swaggerUi.serve, swaggerUi.setup(specs))


app.use("/posts", isAuth, postRouter)
app.use("/users", isAuth, userRouter)
app.use("/auth", authRouter)

app.get("/",  (req, res) => {
    res.send("hello world1")
})


app.post("/uploads", upload.single("image"), (req, res) => {
    res.send(req.file)
})

connecttodb().then(() => {
    app.listen(3000, () => {
        console.log("server running on http://localhost:3000");
    });
})
