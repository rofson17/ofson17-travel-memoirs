import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    id: {
        type: String
    },
    date: {
        type: Date,
    }
});

export default mongoose.model('User', userSchema);