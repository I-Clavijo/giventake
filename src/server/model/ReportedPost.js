import mongoose from "mongoose";
import { MODEL_KEY, REPORTS_KEYS } from "./constants.js";
import mongooseUniqueValidator from "mongoose-unique-validator";

const reportedPostSchema = new mongoose.Schema({
    post: { type: mongoose.Schema.ObjectId, required: true, ref: MODEL_KEY.Post, unique: true },
    reports: [{
        _id: false,
        user: { type: mongoose.Schema.ObjectId, required: true, ref: MODEL_KEY.User, unique: true },
        reasonKey: { type: String, enum: REPORTS_KEYS },
        description: String
    }]
}, { timestamps: true });

reportedPostSchema.plugin(mongooseUniqueValidator); 

export default mongoose.model(MODEL_KEY.ReportedPost, reportedPostSchema);