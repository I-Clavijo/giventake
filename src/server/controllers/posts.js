import Post from '../model/Post.js';
import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, S3_BUCKET, S3_REGION } from '../config.js';
import crypto from 'crypto';
import sharp from 'sharp';
import AppError from '../utils/AppError.js';


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
    console.log("sav:", req.file)
    console.log("sav2:", req.body)

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
    const posts = await Post
        .find()
        .populate({ path: 'user', select: 'firstName lastName' })
        .populate('usersLiked')
        .populate('usersInterestedToHelp')
        .lean();

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

    res.status(200).json(posts)
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