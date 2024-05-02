import { S3_BUCKET } from '../config.js';
import { s3Client } from '../config/s3Client.js';
import User from '../model/User.js';
import AppError from '../utils/AppError.js';
import { generateFileName } from '../utils/lib.js';
import { PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import sharp from 'sharp';


export const getUserById = async (req, res) => {
    const { userId } = req.body;
    if (!userId) throw new AppError('User ID is required.', 401);

    const user = await User.findOne({ _id: userId });
    if (!user) throw AppError('User not found', 404);

    res.status(200).json(user);
};

export const updateUser = async (req, res) => {
    const file = req.file;
    const { firstName, lastName, bio, country, city, address, interests } = req.body;
    const userId = req.user._id;

    const user = await User.findOne({ _id: userId });
    if (!user) throw AppError('User not found', 404);

    let profileImgName = user.imgName;
    if (file) {
        // //check if image already exists in S3 and delete it
        // if (oldImage) {
        //     // delete profile image from S3 bucket
        //     const getObjectParams = {
        //         Bucket: S3_BUCKET,
        //         Key: oldImage
        //     };
        //     const command = new DeleteObjectCommand(getObjectParams);
        //     await s3Client.send(command)
        // }

        const fileBuffer = await sharp(file.buffer)
            .resize({ height: 200, width: 200, fit: "fill" })
            .toBuffer();
        profileImgName = generateFileName();
        const params = {
            Bucket: S3_BUCKET,
            Key: profileImgName,
            Body: fileBuffer,
            ContentType: file.mimetype,
        };

        const cmdInsert = new PutObjectCommand(params);
        await s3Client.send(cmdInsert);
        console.log('File uploaded successfully');
    }

    let profileImgUrl = '';
    if (profileImgName) {
        // get profile image url from S3
        const getObjectParams = {
            Bucket: S3_BUCKET,
            Key: profileImgName
        };
        const cmdGet = new GetObjectCommand(getObjectParams);
        profileImgUrl = await getSignedUrl(s3Client, cmdGet, { expiresIn: 60 * 1000 });
    }


    const filter = { _id: userId }
    const newUser = {
        imgName: profileImgName,
        firstName,
        lastName,
        bio,
        location: {
            country,
            city,
            address
        },
        interests,
    };
    console.log(newUser)

    await User.updateOne(filter, newUser);

    res.status(201).json({ imgUrl: profileImgUrl });
};
