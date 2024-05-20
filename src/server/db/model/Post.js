import mongoose from 'mongoose'
import { MODEL_KEY } from './constants.js'
import { pointSchema } from '../utils/lib.js'
const ObjectId = mongoose.Schema.ObjectId

/**
 * @type {mongoose.SchemaDefinitionProperty}
 */
const postSchema = new mongoose.Schema(
  {
    user: { type: ObjectId, required: true, ref: MODEL_KEY.User },
    category: { type: String, required: true },
    isRemoteHelp: Boolean,
    location: {
      geometry: { type: pointSchema },
      country: String,
      city: String,
      address: String
    },
    helpDate: {
      startDate: Date,
      startTime: String,
      endTime: String,
      endDate: Date,
      isAllDay: Boolean,
      isEndDate: Boolean
    },
    imgName: String,
    title: String,
    description: { type: String, required: true },
    usersSaved: [{ type: ObjectId, ref: MODEL_KEY.User }],
    usersInterested: [{ type: ObjectId, ref: MODEL_KEY.User }],
    usersReported: [{ type: ObjectId, ref: MODEL_KEY.User }],
    reviewToUser: { type: ObjectId, ref: MODEL_KEY.User }
  },
  { timestamps: true }
)

export default mongoose.model(MODEL_KEY.Post, postSchema)
