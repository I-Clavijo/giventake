import { Post, ReportedPost, User } from '../db/model/index.js';
import sharp from 'sharp';
import AppError from '../utils/AppError.js';
import { runInTransaction } from '../db/utils/runInTransaction.js';
import mongoose from 'mongoose';
import { deleteImage, getImageUrl, putImage } from '../utils/S3.js';
import { getAllPostsQuery } from '../db/queries/posts.js';
import { convertToUpperCase } from '../db/utils/lib.js';


export const createPost = async (req, res) => {
    const file = req.file;
    const { category, startDate, startTime, endTime, endDate, isAllDay, isEndDate, location, isRemoteHelp, title, description } = req.body;

    // only if file uploaded
    let fileName = '';
    if (file) {
        // transform image
        file.buffer = await sharp(file.buffer)
            .resize({ height: null, width: 600, fit: "inside" })
            .toBuffer();

        // upload image to S3
        fileName = await putImage(file);
    }

    const newPost = {
        user: req.user._id,
        category,
        title,
        helpDate: {
            startDate,
            startTime,
            endTime,
            endDate,
            isAllDay,
            isEndDate
        },
        imgName: fileName,
        description,
        isRemoteHelp,
        ...(location &&
        {
            location: {
                geometry: {
                    type: 'Point',
                    coordinates: [+location.lat, +location.long]
                },
                country: location.country,
                city: location.city,
                address: location.address,
            }
        }
        )
    };
    console.log(newPost)

    await Post.create(newPost);

    res.status(201).send('Post Created Successfuly');
}

export const getPosts = async (req, res) => {
    const { filters } = req.query || {};
    if (filters)
        filters.category = filters?.category ? convertToUpperCase(filters?.category) : ''; //convert the category to key

    //get all posts from DB
    const auth_userId = req.user?._id;
    let posts = await getAllPostsQuery(auth_userId, filters);

    // get post image from S3 bucket
    for (const post of posts) {
        // For each post, generate a signed URL and save it to the post object
        const imgNamePost = post.imgName;
        const urlPost = imgNamePost ? await getImageUrl(imgNamePost) : '';
        post.imgUrl = urlPost;

        // get profile image of the user 
        const imgNameProfile = post.user.imgName;
        const urlProfile = imgNameProfile ? await getImageUrl(imgNameProfile) : '';
        post.user.imgUrl = urlProfile;
    }

    res.status(200).json(posts);
}

export const deletePost = async (req, res) => {
    const { _id: postId } = req.body || {};

    const post = await Post.findOne({ _id: postId }).exec();
    if (!post) throw AppError('Post not found', 404);

    // delete post image from S3 bucket
    const imgName = post.img;
    await deleteImage(imgName)

    // delete post from DB
    await Post.deleteOne({ _id: postId });

    res.status(201).send();
}

export const postAction = async (req, res) => {
    const { postId, actions } = req.body || {};
    console.log('postId: ', postId);
    console.log('actions: ', actions);

    let filter, updateQuery;
    if (actions.hasOwnProperty('isSavedByUser')) {

        await runInTransaction(async (session) => {

            // update 'User' collection
            filter = { _id: req.user._id };
            updateQuery = actions.isSavedByUser
                ? { '$addToSet': { savedPosts: postId } }
                : { '$pull': { savedPosts: postId } };
            await User.updateOne(filter, updateQuery, { session });

            // update 'Post' collection
            filter = { _id: postId };
            updateQuery = actions.isSavedByUser
                ? { '$addToSet': { usersSaved: req.user._id } }
                : { '$pull': { usersSaved: req.user._id } };
            await Post.updateOne(filter, updateQuery, { session });
        });
    }

    if (actions.hasOwnProperty('isUserInterested')) {

        await runInTransaction(async (session) => {

            // update 'User' collection
            filter = { _id: req.user._id };
            updateQuery = actions.isUserInterested
                ? { '$addToSet': { interestedPosts: postId } }
                : { '$pull': { interestedPosts: postId } };
            await User.updateOne(filter, updateQuery, { session });

            // update 'Post' collection
            filter = { _id: postId };
            updateQuery = actions.isUserInterested
                ? { '$addToSet': { usersInterested: req.user._id } }
                : { '$pull': { usersInterested: req.user._id } };
            await Post.updateOne(filter, updateQuery, { session });
        });
    }

    if (actions.hasOwnProperty('isUserReported')) {
        const errorKey = actions.report.key || 'OTHER';
        const userId = new mongoose.Types.ObjectId(req.user._id);

        await runInTransaction(async (session) => {
            // update 'User' collection
            filter = { _id: req.user._id };
            updateQuery = {
                '$addToSet': { reportedPosts: postId }
            };
            await User.updateOne(filter, updateQuery, { session });

            // update 'Post' collection
            filter = { _id: postId };
            updateQuery = {
                '$addToSet': { usersReported: req.user._id }
            };
            await Post.updateOne(filter, updateQuery, { session });

            // update 'ReportedPost' collection
            // First, check if the document exists
            const existingDocument = await ReportedPost.findOne({ post: postId }, null, { session });
            const reportObj = { user: req.user._id, reasonKey: errorKey, description: actions.report.description || '' };

            // BEHAVIOR: if a user has already reported a post, his old report will remain and the new one will NOT be inserted
            if (existingDocument) {
                // If the document exists, update it
                filter = { post: postId, 'reports.user': { $ne: req.user._id } };
                updateQuery = { $addToSet: { reports: reportObj } };
                await ReportedPost.updateOne(filter, updateQuery, { session });
            } else {
                // If the document doesn't exist, create a new one
                const newReportObj = { post: postId, reports: [reportObj] };
                await ReportedPost.create([newReportObj], { session });
            }
        });
    }

    res.sendStatus(201);
}