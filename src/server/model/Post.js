import mongoose from "mongoose";
import { MODEL_KEY } from "./constants.js";

const postSchema = new mongoose.Schema({
	user: { type: mongoose.Schema.ObjectId, required: true, ref: MODEL_KEY.User },
    category: { type: String, required: true },
    city: String,
    address: String,
    helpDate: {
        startDate: Date,
        endDate: Date,
        startTime: String, 
        endTime: String,
        allDay: Boolean,
    },
    imgName: String,
    description: String,
    usersLiked: [{ type: mongoose.Schema.ObjectId, ref: MODEL_KEY.User }],
    usersInterested: [{ type: mongoose.Schema.ObjectId, ref: MODEL_KEY.User }],
}, { timestamps: true });

export default mongoose.model(MODEL_KEY.Post, postSchema);