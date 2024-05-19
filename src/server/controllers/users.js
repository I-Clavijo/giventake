import { User, Friends } from '../db/model/index.js';
import AppError from '../utils/AppError.js';
import { getImageUrl, putImage } from '../utils/S3.js';
import { removePropsMutable } from '../utils/lib.js';
import sharp from 'sharp';


export const getUserById = async (req, res) => {
    const { userId } = req.query || {};

    if (!userId) throw new AppError('User ID is required.', 400);

    const user = await User.findOne({ _id: userId }).lean();
    if (!user) throw AppError('User not found', 404);

    removePropsMutable(user, ['password', 'refreshToken',])

    res.status(200).json(user);
};

export const updateUser = async (req, res) => {
    const file = req.file;
    const { firstName, lastName, bio, location, interests, flags } = req.body;
    const userId = req.user._id;
    console.log(req.body)
    const user = await User.findOne({ _id: userId });
    if (!user) throw AppError('User not found', 404);

    //update image if requested to update
    let imgName, imgUrl;
    if (file) {
        file.buffer = await sharp(file.buffer)
            .resize({ height: 200, width: 200, fit: "cover" })
            .toBuffer();

        imgName = await putImage(file);
        imgUrl = await getImageUrl(imgName);
    }


    const filter = { _id: userId }
    const newUser = {
        ...(imgName && { imgName }),
        ...(firstName && { firstName }),
        ...(lastName && { lastName }),
        ...(bio && { bio }),
        ...(location && {
            location: {
                geometry: {
                    type: 'Point',
                    coordinates: [+location.lat, +location.long]
                },
                country: location.country,
                city: location.city,
                address: location.address,
            }
        }),
        ...(interests && { interests }),
        ...(flags && {
            flags: {
                ...user.flags,
                ...(flags.hideWelcomeModal && { hideWelcomeModal: flags.hideWelcomeModal })
            }
        }),

    };
    console.log(newUser)

    await User.updateOne(filter, newUser);

    const returnedData = {
        ...(imgUrl && { imgUrl })
    };

    res.status(201).json(returnedData);
};


