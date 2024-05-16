import mongoose from "mongoose";
import { Conversation, Message, Post, User } from "../model/index.js";
const ObjectId = mongoose.Types.ObjectId;


// const contacts = [{
//     conversationId: '',
//     otherParticipants: [{ // without the selfUser
//         userId: '',
//         firstName: '',
//         lastName: '',
//         imgUrl: ''
//     }],
//     lastMessage:
//         {
//             sender: {
//                 userId: '',
//                 firstName: '',
//                 lastName: '',
//                 imgUrl: ''
//             }, 
//             fromSelf: boolean,
//             message: {
//                 text: ''
//             },
//             createdAt: '',
//         }
//     },
//     post?: {
//         postId: '',
//         imgUrl: '',
//         title: ''
//     }
// }]

export const getContactsQuery = async (userId) => {
    const userConversations = await Conversation.aggregate([
        { $match: { users: new ObjectId(userId) } },
        { // get only the other pariticipants not incl. the selfUser
            $addFields: {
                otherParticipants: {
                    $filter: {
                        input: '$users',
                        as: 'user',
                        cond: { $ne: ['$$user', new ObjectId(userId)] },
                    },
                },
            },
        },
        { // populate users
            $lookup: {
                from: User.collection.name,
                localField: "otherParticipants",
                foreignField: "_id",
                as: "otherParticipants",
                pipeline: [{
                    $project: {
                        firstName: 1, lastName: 1, imgName: 1
                    }
                }]
            }
        },
        {
            $lookup: {
                from: Message.collection.name,
                localField: "_id",
                foreignField: "conversation",
                as: "lastMessage",
                pipeline: [
                    { $sort: { _id: -1 } },            // Sort documents by _id in descending order
                    { $limit: 1 },                     // Limit the result to the last document
                    {
                        $lookup: {
                            from: User.collection.name,
                            localField: "sender",
                            foreignField: "_id",
                            as: "sender",
                            pipeline: [{
                                $project: {
                                    firstName: 1, lastName: 1, imgName: 1
                                }
                            }]
                        }
                    },
                    { $unwind: "$sender" },
                    {
                        $addFields: {
                            fromSelf: { $eq: ['$sender._id', new ObjectId(userId)] },
                        },
                    },
                    {
                        $project: {
                            sender: 1, message: 1, createdAt: 1, fromSelf: 1
                        }
                    }
                ]
            },
        },
        { $unwind: "$lastMessage" },
        {
            $lookup: {
                from: Post.collection.name,
                localField: "post",
                foreignField: "_id",
                as: "post",
            }
        },
        {
            $unwind: {
                path: "$post",
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $project: {
                _id: 0,
                conversationId: "$_id",
                otherParticipants: 1,
                lastMessage: 1,
                post: 1
            }
        }
    ]);

    return userConversations;
};
