import { HttpStatusCode } from 'axios';
import { Review, User } from '../model/index.js';
import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, S3_BUCKET, S3_REGION } from '../config.js';
import crypto from 'crypto';
import sharp from 'sharp';
import AppError from '../utils/AppError.js';
import { runInTransaction } from '../utils/runInTransaction.js';
import { REPORTS_KEYS } from '../model/constants.js';
import mongoose from 'mongoose';
import Review from '../model/Review.js';

// Set up AWS credentials
const s3Client = new S3Client({
    region: S3_REGION,
    credentials: {
        accessKeyId: AWS_ACCESS_KEY_ID,
        secretAccessKey: AWS_SECRET_ACCESS_KEY,
    },
});

const generateFileName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex');

export const createReview = async (req, res) => {
    const file = req.file;
   
    const { fullName, date,  location, reviewText,  rating } = req.body;

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

    const newReview = {
        user: req.user._id,
        profilePic,
        date,
        location,
        reviewText,
        rating
    };
    console.log(newReview)

    await Review.create(newReview);
    //maybe create a new status code
    res.status(201).send('Review Created Successfuly');
}

export const getReviews = async (req, res) => {
    //get all reviews from DB
    const userIdObjectId = req.user ? new mongoose.Types.ObjectId(req.user._id) : null;
    let reviews = await Reviews.aggregate([
        {
            "$lookup": {
                from: User.collection.name,//foreign collection
                localField: "user",//the field i'm joining in local collection
                foreignField: "_id",////the field i'm joining in foreign collection
                as: "user",
                pipeline: [{ $project: { firstName: 1, lastName: 1 } }]
            },
        },
        { $unwind: '$user' },//ensuring each review document has the corresponding user information
        {
   
            $project: {//specify the final set of fields that will be included in the output documents
                _id: 1, user: 1,profilePic:1, date: 1, location: 1, reviewText: 1, rating: 1,
                ...(req.user  )
            },
        }
    ]);
    {/**maybe don't need this as we don't store profilePicture in the S3 bucket */}
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

export const deleteReview = async (req, res) => {
    const { _id: reviewId } = req.body || {};
    //get all reviews from DB

    const review = await Review.findOne({ _id: reviewId }).exec();

    if (!review) {
        res.status(404).json({ message: 'Review not found.' })
        return;
    }

    // delete post image from S3 bucket
    const getObjectParams = {
        Bucket: S3_BUCKET,
        Key: post.img
    };
    const command = new DeleteObjectCommand(getObjectParams);
    const url = await getSignedUrl(s3Client, command, { expiresIn: 60 });

    // delete review from DB
    await Review.deleteOne({ _id: reviewId });

    res.status(201).send();
}
//maybe don't need this as well-no actions needed for reviews after posting
export const reviewAction = async (req, res) => {
    const { reviewId, actions } = req.body || {};
    console.log('reviewId: ', reviewId);
    console.log('actions: ', actions);

    let filter, updateQuery;
    
}