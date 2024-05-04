import mongoose from "mongoose";
import { Post, User } from "../model/index.js";
const ObjectId = mongoose.Types.ObjectId;


export const getAllPostsQuery = async (auth_userId, filters) => {
    const userIdObjectId = auth_userId ? new ObjectId(auth_userId) : null;
    
    return await Post.aggregate([
        ...(filters?.userId ? [{  // get ONLY posts that the user with userId created. 
            $match: { user: new ObjectId(filters.userId) } 
        }] : []),
        {
            "$lookup": {
                from: User.collection.name,
                localField: "user",
                foreignField: "_id",
                as: "user",
                pipeline: [{ $project: { firstName: 1, lastName: 1 } }]
            },
        },
        { $unwind: '$user' },
        {
            $project: {
                _id: 1, user: 1, category: 1, city: 1, address: 1, helpDate: 1, imgName: 1, description: 1, usersSaved: 1, createdAt: 1, updatedAt: 1, usersInterested: 1, usersReported: 1,
                ...(userIdObjectId && {
                    isSavedByUser: { $in: [userIdObjectId, '$usersSaved'] },
                    isUserInterested: { $in: [userIdObjectId, '$usersInterested'] },
                    isUserReported: { $in: [userIdObjectId, '$usersReported'] },
                }),

            },
        },
        {
            "$lookup": {
                from: User.collection.name,
                localField: "usersSaved",
                foreignField: "_id",
                as: "usersSaved",
                pipeline: [{ $project: { firstName: 1, lastName: 1 } }]
            }
        },
        {
            "$lookup": {
                from: User.collection.name,
                localField: "usersInterested",
                foreignField: "_id",
                as: "usersInterested",
                pipeline: [{ $project: { firstName: 1, lastName: 1 } }]
            }
        },
        {
            "$lookup": {
                from: User.collection.name,
                localField: "usersReported",
                foreignField: "_id",
                as: "usersReported",
                pipeline: [{ $project: { firstName: 1, lastName: 1 } }]
            }
        },
    ]);
};