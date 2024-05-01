import { HttpStatusCode } from 'axios';
import { Post, ReportedPost, User } from '../model/index.js';
import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, S3_BUCKET, S3_REGION } from '../config.js';
import crypto from 'crypto';
import sharp from 'sharp';
import AppError from '../utils/AppError.js';
import { runInTransaction } from '../utils/runInTransaction.js';
import { REPORTS_KEYS } from '../model/constants.js';
import mongoose from 'mongoose';

// Set up AWS credentials
const s3Client = new S3Client({
    region: S3_REGION,
    credentials: {
        accessKeyId: AWS_ACCESS_KEY_ID,
        secretAccessKey: AWS_SECRET_ACCESS_KEY,
    },
});

const generateFileName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex');

export const createPost = async (req, res) => {
    const file = req.file;
    const { category, startDate, endDate, description, startTime, endTime, city, address } = req.body;

    const fileBuffer = await sharp(file.buffer)
        .resize({ height: 1920, width: 1080, fit: "contain" })
        .toBuffer();
    const fileName = generateFileName();
    const params = {
        Bucket: S3_BUCKET,
        Key: fileName,
        Body: fileBuffer,
        ContentType: file.mimetype,
    };

    const command = new PutObjectCommand(params);
    await s3Client.send(command);
    console.log('File uploaded successfully');

    const newPost = {
        user: req.user._id,
        category,
        helpDate: {
            startDate,
            endDate,
            startTime,
            endTime
        },
        imgName: fileName,
        description,
        city,
        address
    };
    console.log(newPost)

    await Post.create(newPost);

    res.status(201).send('Post Created Successfuly');
}

export const getPosts = async (req, res) => {
    //get all posts from DB
    const userIdObjectId = req.user ? new mongoose.Types.ObjectId(req.user._id) : null;
    let posts = await Post.aggregate([
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
                ...(req.user && {
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

    // get post image from S3 bucket
    for (const post of posts) {
        // For each post, generate a signed URL and save it to the post object
        let url = '';
        if (post.imgName) {
            const getObjectParams = {
                Bucket: S3_BUCKET,
                Key: post.imgName
            };
            const command = new GetObjectCommand(getObjectParams);
            url = await getSignedUrl(s3Client, command, { expiresIn: 60 * 1000 });
        }

        post.imgUrl = url;
    }
    console.log(posts)
    res.status(200).json(posts);
}

export const deletePost = async (req, res) => {
    const { _id: postId } = req.body || {};
    //get all posts from DB

    const post = await Post.findOne({ _id: postId }).exec();

    if (!post) {
        res.status(404).json({ message: 'Post not found.' })
        return;
    }

    // delete post image from S3 bucket
    const getObjectParams = {
        Bucket: S3_BUCKET,
        Key: post.img
    };
    const command = new DeleteObjectCommand(getObjectParams);
    const url = await getSignedUrl(s3Client, command, { expiresIn: 60 });

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
}