import User from '../db/model/User.js';
import AppError from '../utils/AppError.js';
import { getImageUrl, putImage } from '../utils/S3.js';
import { removePropsMutable } from '../utils/lib.js';
import sharp from 'sharp';


export const getUserById = async (req, res) => {
    const { userId } = req.query || {};

    if (!userId) throw new AppError('User ID is required.', 400);

    const user = await User.findOne({ _id: userId }).lean();
    if (!user) throw AppError('User not found', 404);

    removePropsMutable(user, ['password', 'refreshToken', ])

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
        file.buffer = await sharp(file.buffer)
            .resize({ height: 200, width: 200, fit: "fill" })
            .toBuffer();

        profileImgName = await putImage(file);
    }

    const profileImgUrl = profileImgName ? await getImageUrl(profileImgName) : '';

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
