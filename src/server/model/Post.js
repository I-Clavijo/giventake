import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
	user: { type: mongoose.Schema.ObjectId, required: true, ref: 'User' },
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
    usersLiked: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
    usersInterestedToHelp: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
}, { timestamps: true });

export default mongoose.model('Post', postSchema);