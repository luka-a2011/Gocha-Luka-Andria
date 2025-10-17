const { default: mongoose,  } = require("mongoose");



const userSchema = new mongoose.Schema({
    email: {
        type: String,
        lowercase: true,
        require: true
    },
    password: {
        type: String,
        require: true,
        select: false
    },
    posts: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "post",
        default: []
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user" // everyone else is user by default
    }
})


module.exports = mongoose.model("user", userSchema)