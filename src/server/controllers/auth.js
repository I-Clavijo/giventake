import bcrypt from 'bcrypt';
import User from '../model/User.js';
import jwt from 'jsonwebtoken';
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET, S3_BUCKET } from '../config.js';
import { GetObjectCommand } from '@aws-sdk/client-s3';
import { s3Client } from '../config/s3Client.js';
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import AppError from '../utils/AppError.js';

// mutable!!
const removePropsFromArray = (obj, propertiesToRemove) => {
    propertiesToRemove.forEach(prop => {
        delete obj[prop];
    });
}


const generateAccessToken = (data) => jwt.sign(
    data,
    ACCESS_TOKEN_SECRET,
    { expiresIn: '15m' }
);

const generateRefreshToken = (data) => jwt.sign(
    data,
    REFRESH_TOKEN_SECRET,
    { expiresIn: '7d' }
);

export const signUp = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    if (!email || !password) throw new AppError('Email and password are required.', 400);

    // check for duplicate usernames in the db
    const duplicate = await User.findOne({ email }).exec();
    if (duplicate) throw new AppError('Conflict. User already exists.', 409);


    //encrypt the password
    const hashedPassword = await bcrypt.hash(password, 10);
    const defaultRoles = { 'User': 2001 };
    const refreshToken = generateRefreshToken({ email });

    // create and store the new user
    let userDB = await User.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        refreshToken,
        roles: defaultRoles
    });

    // Delete keys from the user object
    userDB = userDB.toObject();
    removePropsFromArray(userDB, ['password', 'refreshToken', '__v']);
    const roles = Object.values(userDB.roles).filter(Boolean);
    userDB.roles = roles;
    const accessToken = generateAccessToken({ _id: userDB._id, email, roles });

    // Creates Secure Cookie with refresh token and sends to client
    res.cookie('jwt', refreshToken, {
        httpOnly: true, //accessible only by web server
        secure: true,  // TLS (https)
        sameSite: 'None', // not a cross-site cookie
        maxAge: null  //cookie expiry: set to match refreshToken
    });

    // Send authorization roles and access token to user
    res.json({ accessToken, ...userDB });

}

export const login = async (req, res) => {
    const { email, password, persist } = req.body;

    if (!email || !password) throw new AppError('Email and password are required.', 400);

    let foundUser = await User.findOne({ email }).exec();
    if (!foundUser) throw new AppError('Unauthorized', 401);
    // evaluate password 
    const match = await bcrypt.compare(password, foundUser.password);
    if (match) {
        const roles = Object.values(foundUser.roles).filter(Boolean);

        // create JWT
        const refreshToken = generateRefreshToken({ email });

        // Saving refreshToken with current user
        foundUser.refreshToken = refreshToken;
        await foundUser.save()
        foundUser = foundUser.toObject();
        foundUser.roles = roles;
        removePropsFromArray(foundUser, ['password', 'refreshToken', '__v']);
        const accessToken = generateAccessToken({ _id: foundUser._id, email, roles });

        // get profile image url from S3
        let url = '';
        if (foundUser.imgName) {
            const getObjectParams = {
                Bucket: S3_BUCKET,
                Key: foundUser.imgName
            };
            const command = new GetObjectCommand(getObjectParams);
            url = await getSignedUrl(s3Client, command, { expiresIn: 60 * 1000 });
        }
        foundUser.imgUrl = url;

        // Creates Secure Cookie with refresh token and sends to client
        res.cookie('jwt', refreshToken, {
            httpOnly: true, //accessible only by web server
            secure: true,  // TLS (https)
            sameSite: 'None', // not a cross-site cookie
            maxAge: persist ? 7 * 24 * 60 * 60 * 1000 : null  //cookie expiry: set to match refreshToken
        });

        // Send authorization roles and access token to user
        res.json({ accessToken, ...foundUser });

    } else {
        res.sendStatus(401);
    }
}

export const handleRefreshToken = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) throw new AppError('Unauthorized', 401);
    const refreshToken = cookies.jwt;

    const foundUser = await User.findOne({ refreshToken }).lean();
    if (!foundUser) throw new AppError('Forbidden', 403);
    // evaluate jwt 
    jwt.verify(
        refreshToken,
        REFRESH_TOKEN_SECRET,
        async (err, decoded) => {
            if (err || foundUser.email !== decoded.email) return res.sendStatus(403);
            const roles = Object.values(foundUser.roles);
            const accessToken = generateAccessToken({ _id: foundUser._id, email: decoded.username, roles });
            removePropsFromArray(foundUser, ['password', 'refreshToken', '__v']);

            // get profile image url from S3
            let url = '';
            if (foundUser.imgName) {
                const getObjectParams = {
                    Bucket: S3_BUCKET,
                    Key: foundUser.imgName
                };
                const command = new GetObjectCommand(getObjectParams);
                url = await getSignedUrl(s3Client, command, { expiresIn: 60 * 1000 });
            }
            foundUser.imgUrl = url;

            res.status(200).json({ accessToken, ...foundUser });
        }
    );
}

export const logout = async (req, res) => {
    // On client, also delete the accessToken

    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204); //No content
    const refreshToken = cookies.jwt;

    // Is refreshToken in db?
    const foundUser = await User.findOne({ refreshToken }).exec();
    if (foundUser) {
        // Delete refreshToken in db
        foundUser.refreshToken = '';
        const result = await foundUser.save();
    }

    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
    return res.sendStatus(204);


}