import mongoose from "mongoose";

const postsSchema = mongoose.Schema({
    title: String,
    message: String,
    name: String,
    author: String,
    tags: [String],
    selectedFile: String,
    likes: {
        type: [String],
        default: []
    },
    date: {
        type: Date,
        default: new Date()
    }
})

const postsMessage = mongoose.model('postsMessage', postsSchema);

export default postsMessage;