import jwt from 'jsonwebtoken';
import AppError from '../utils/AppError.js';

export default function verifyAuth(req, res, next) {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader?.startsWith('Bearer ')) {
        console.log('NOT AUTHENTICATED. AUTH HEADER INVALID.');
        throw new AppError('Not authenticated.', 400);
        // return next(new NotAuthorizedError('Not authenticated.'));
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err) return res.sendStatus(403); //invalid token
            req.user = { ...decoded };
            next();
        }
    );
}