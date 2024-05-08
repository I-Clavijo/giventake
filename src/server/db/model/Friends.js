import mongoose from "mongoose";
import { MODEL_KEY } from "./constants.js";
import uniqueValidator from "mongoose-unique-validator";
const ObjectId = mongoose.Schema.ObjectId;

/**
* @type {mongoose.SchemaDefinitionProperty}
*/
const friendsSchema = new mongoose.Schema({
	user: { type: ObjectId, required: true, unique: true, ref: MODEL_KEY.User }, // <- this user 
    toUser: { type: ObjectId, required: true, unique: true, ref: MODEL_KEY.User }, // <- is following this user
}, { timestamps: true });

friendsSchema.plugin(uniqueValidator);

export default mongoose.model(MODEL_KEY.Friends, friendsSchema);