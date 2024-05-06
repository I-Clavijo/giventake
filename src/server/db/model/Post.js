import mongoose from "mongoose";
import { MODEL_KEY } from "./constants.js";
const ObjectId = mongoose.Schema.ObjectId;

/**
* @type {mongoose.SchemaDefinitionProperty}
*/
const postSchema = new mongoose.Schema({
	user: { type: ObjectId, required: true, ref: MODEL_KEY.User },
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
    usersSaved: [{ type: ObjectId, ref: MODEL_KEY.User }],
    usersInterested: [{ type: ObjectId, ref: MODEL_KEY.User }],
    usersReported: [{ type: ObjectId, ref: MODEL_KEY.User }],
}, { timestamps: true });

export default mongoose.model(MODEL_KEY.Post, postSchema);