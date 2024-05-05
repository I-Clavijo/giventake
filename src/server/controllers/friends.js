import mongoose from 'mongoose';
import { Friends, User } from '../db/model/index.js';
import AppError from '../utils/AppError.js';
import { getImageUrl } from '../utils/S3.js';

const ObjectId = mongoose.Types.ObjectId;


export const getFriends = async (req, res) => {
    const { userId } = req.query;
    console.log(req.query)

    const following = (await Friends.aggregate([
        { $match: { user: new ObjectId(userId) } },
        { $group: { _id: "$user", following: { $addToSet: "$toUser" } } },
        { $lookup: { from: User.collection.name, localField: "following", foreignField: "_id", as: "followingDetails", pipeline: [{ $project: { firstName: 1, lastName: 1, imgName: 1 } }] } },
        { $project: { _id: 0, following: "$followingDetails" } }
    ]))[0]?.following || [];
    // attach a image url to each user I am following
    for (const item of following) {
        const imgName = item?.imgName;
        const url = imgName ? await getImageUrl(imgName) : '';
        item.imgUrl = url;
    }

    const followers = (await Friends.aggregate([
        { $match: { toUser: new ObjectId(userId) } },
        { $group: { _id: "$toUser", followers: { $addToSet: "$user" } } },
        { $lookup: { from: User.collection.name, localField: "followers", foreignField: "_id", as: "followersDetails", pipeline: [{ $project: { firstName: 1, lastName: 1, imgName: 1 } }] } },
        { $project: { _id: 0, followers: "$followersDetails" } }
    ]))[0]?.followers || [];

    // attach a image url to each follower of mine
    for (const follower of followers) {
        const imgName = follower?.imgName;
        const url = imgName ? await getImageUrl(imgName) : '';
        follower.imgUrl = url;
    }

    const friends = { user: userId, following, followers };

    console.log(friends);
    res.status(200).json(friends);
};

export const friendAction = async (req, res) => {
    const { toUser, actions } = req.body;
    if (!toUser || !actions) throw new AppError('Please specify the action and the user.', 400);

    const authUser = req.user._id;
    console.log('authUser', authUser)
    console.log('actions', actions)

    let filter, query;
    filter = { user: authUser, toUser };

    if (actions.follow) {
        query = { user: authUser, toUser }
        await Friends.updateOne(filter, query, { upsert: true })
    } else if (actions.unfollow) {
        await Friends.deleteOne(filter)
    }
    res.sendStatus(200);
};