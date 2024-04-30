import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
import { MODEL_KEY } from "./constants.js";
const ObjectId = mongoose.Schema.ObjectId;

const userSchema = new mongoose.Schema({
	firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 5 },
    imgName: String,
    interests: [String],
    city: String,
    address: String,
    roles: {
        User: {
            type: Number,
            default: 2001
        },
        Editor: Number,
        Admin: Number
    },
    refreshToken: String,
    savedPosts: [ObjectId],
    interestedPosts: [ObjectId],
    reportedPosts: [ObjectId]
}, { timestamps: true });

userSchema.plugin(uniqueValidator); 

export default mongoose.model(MODEL_KEY.User, userSchema);