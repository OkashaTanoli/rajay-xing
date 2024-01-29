import mongoose, { Schema } from "mongoose";

const User = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    }

}, { timestamps: true })

export default mongoose.models.User || mongoose.model('User', User)                                                                                                                                                                                                                                                     