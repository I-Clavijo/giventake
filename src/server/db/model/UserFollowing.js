import mongoose from "mongoose";
import { MODEL_KEY } from "./constants.js";
import uniqueValidator from "mongoose-unique-validator";
const ObjectId = mongoose.Schema.ObjectId;

const userFollowingSchema = new mongoose.Schema({
	user: { type: ObjectId, required: true, unique: true, ref: MODEL_KEY.User }, // <- this user 
    follow: { type: ObjectId, required: true, unique: true, ref: MODEL_KEY.User }, // <- is following this user
}, { timestamps: true });

userFollowingSchema.plugin(uniqueValidator);

export default mongoose.model(MODEL_KEY.UserFollowing, userFollowingSchema);