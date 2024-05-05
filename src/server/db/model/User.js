import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
import { MODEL_KEY } from "./constants.js";
const ObjectId = mongoose.Schema.ObjectId;

/**
* @type {mongoose.SchemaDefinitionProperty}
*/
const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 5 },
    imgName: String,
    interests: [String],
    location: {
        lat: String,
        long: String,
        country: String,
        city: String,
        address: String,
    },

    bio: String,
    roles: {
        User: {
            type: Number,
            default: 2001
        },
        Editor: Number,
        Admin: Number
    },
    refreshToken: String,
    savedPosts: [{ type: ObjectId, ref: MODEL_KEY.Post }],
    interestedPosts: [{ type: ObjectId, ref: MODEL_KEY.Post }],
    reportedPosts: [{ type: ObjectId, ref: MODEL_KEY.Post }],
    reviews: [{
        postId: { type: ObjectId, ref: MODEL_KEY.Post },
        fromUser: { type: ObjectId, ref: MODEL_KEY.User },
        rating: {
            type: Number,
            required: true,
            min: 1,
            max: 5
        },
        description: { type: String },
        createdAt: { type: Date },
    }],
}, { timestamps: true });

userSchema.plugin(uniqueValidator);

export default mongoose.model(MODEL_KEY.User, userSchema);