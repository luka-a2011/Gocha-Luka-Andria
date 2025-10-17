const { default: mongoose,  } = require("mongoose");


const postSchema = new mongoose.Schema({
    content: {
        type: String
    },
    title: {
        type: String
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        require: true
    },
    comments: [{
        author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        content: { type: String, required: true },
        createdAt: { type: Date, default: Date.now }
      }],
    
   
}, {timestamps: true})


module.exports = mongoose.model("post", postSchema)