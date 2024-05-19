import mongoose from "mongoose";
import { MODEL_KEY } from "./constants.js";
const ObjectId = mongoose.Schema.ObjectId;

/**
* @type {mongoose.SchemaDefinitionProperty}
*/
const conversationSchema = new mongoose.Schema({
    users: [{ type: ObjectId, ref: MODEL_KEY.User, required: true }],
    post: { type: ObjectId, ref: MODEL_KEY.Post },
}, { timestamps: true });

export default mongoose.model(MODEL_KEY.Conversation, conversationSchema);