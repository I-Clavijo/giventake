import bcrypt from 'bcrypt';
import User from '../model/User.js';
import jwt from 'jsonwebtoken';
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from '../config.js';

export const signUp = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    console.log("signUp: ", req.body)
    if (!email || !password) return res.status(400).json({ 'message': 'Email and password are required.' });

    // check for duplicate usernames in the db
    const duplicate = await User.findOne({ email }).exec();
    if (duplicate) return res.sendStatus(409); //Conflict 

    try {
        //encrypt the password
        const hashedPassword = await bcrypt.hash(password, 10);
        const defaultRoles = { User: 2001 };
        const userInfo = {
            firstName,
            lastName,
            email
        };

        // create JWTs
        const accessToken = jwt.sign(
            { email, roles: defaultRoles },
            ACCESS_TOKEN_SECRET,
            { expiresIn: '10s' }
        );
        const refreshToken = jwt.sign(
            { email },
            REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        );

        // create and store the new user
        const userDB = await User.create({ ...userInfo, password: hashedPassword, refreshToken, roles: defaultRoles });

        // Creates Secure Cookie with refresh token and sends to client
        res.cookie('jwt', refreshToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });

        // Send authorization roles and access token to user
        res.json({ accessToken, userInfo: { id: userDB._id.valueOf(), ...userInfo } });
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ 'message': 'Email and password are required.' });

    const foundUser = await User.findOne({ email }).exec();
    if (!foundUser) return res.sendStatus(401); //Unauthorized 
    // evaluate password 
    const match = await bcrypt.compare(password, foundUser.password);
    if (match) {
        const roles = Object.values(foundUser.roles).filter(Boolean);
        const userInfo = {
            firstName: foundUser.firstName,
            lastName: foundUser.lastName,
            email: foundUser.email
        };
        // create JWTs
        const accessToken = jwt.sign(
            { email: foundUser.email, roles },
            ACCESS_TOKEN_SECRET,
            { expiresIn: '10s' }
        );
        const refreshToken = jwt.sign(
            { email: foundUser.email },
            REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        );
        // Saving refreshToken with current user
        foundUser.refreshToken = refreshToken;
        const userDB = await foundUser.save();

        // Creates Secure Cookie with refresh token and sends to client
        res.cookie('jwt', refreshToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });

        // Send authorization roles and access token to user
        res.json({ accessToken, userInfo: { id: userDB._id.valueOf(), ...userInfo } });

    } else {
        res.sendStatus(401);
    }
}

export const handleRefreshToken = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;

    const foundUser = await User.findOne({ refreshToken }).exec();
    if (!foundUser) return res.sendStatus(403); //Forbidden 
    // evaluate jwt 
    jwt.verify(
        refreshToken,
        REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err || foundUser.email !== decoded.email) return res.sendStatus(403);
            const roles = Object.values(foundUser.roles);
            const accessToken = jwt.sign(
                {
                    "userInfo": {
                        "email": decoded.username,
                        "roles": roles
                    }
                },
                ACCESS_TOKEN_SECRET,
                { expiresIn: '10s' }
            );
            res.json({ accessToken })
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
    if (!foundUser) {
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
        return res.sendStatus(204);
    }

    // Delete refreshToken in db
    foundUser.refreshToken = '';
    const result = await foundUser.save();
    console.log(result);

    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
    res.sendStatus(204);
}