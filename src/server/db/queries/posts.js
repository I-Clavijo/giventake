import mongoose from "mongoose";
import { Post, User } from "../model/index.js";
const ObjectId = mongoose.Types.ObjectId;


export const getAllPostsQuery = async (auth_userId, filters) => {
    const userIdObjectId = auth_userId ? new ObjectId(auth_userId) : null;

    return await Post.aggregate([
        ...(filters?.userId ? [{  // get ONLY posts that the user with userId created. 
            $match: { user: new ObjectId(filters.userId) }
        }] : []),
        ...(filters?.category ? [{  // get ONLY posts from a specific category only if asked
            $match: { category: filters.category }
        }] : []),
        // {
        //     $geoNear: {
        //         near: {
        //             type: "Point",
        //             coordinates: [-81.093699, 32.074673]
        //         },
        //         maxDistance: 500 * 1609,
        //         key: "location.point",
        //         spherical: true,
        //         distanceField: "distance",
        //         distanceMultiplier: 0.000621371 //Km
        //     }
        // },
        ...(filters?.location && +filters?.radius > 0 ? [{
            $match: {
                $or: [
                  { remoteHelp: true },  // Include documents without location
                  { 'location.geometry': { $geoWithin: { $centerSphere: [ [+filters.location.lat || 0, +filters.location.long || 0], +filters?.radius / 6371 ] } } } // Perform geospatial query only if location exists
                ]
              }
        }] : []),
        // {
            
        //   },
        // {
        //     $geoNear: {
        //         near: { type: "Point", coordinates: [-81.093699, 32.074673] },
        //         distanceField: "distance",
        //         maxDistance: 500 * 1609, // in meters
        //         spherical: true,
        //         query: { location: { $exists: true } }
        //     }
        // },
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
        {
            $sort: { createdAt: -1 } // Sort by createdAt field in descending order (newest first)
        }
    ]);
};