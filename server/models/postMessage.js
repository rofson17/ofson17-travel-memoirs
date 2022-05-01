import mongoose from "mongoose";

const postsSchema = mongoose.Schema({
    title: String,
    message: String,
    author: String,
    tags: [String],
    selectedFile: String,
    likeCount: {
        type: Number,
        default: 0
    },
    date: {
        type: Date,
        default: new Date()
    }
})

const postsMessage = mongoose.model('postsMessage', postsSchema);

export default postsMessage;