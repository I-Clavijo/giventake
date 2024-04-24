import jwt from 'jsonwebtoken';
import { NotAuthorizedError } from '../utils/errors.js';

export default function verifyAuth(req, res, next) {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader?.startsWith('Bearer ')) {
        console.log('NOT AUTHENTICATED. AUTH HEADER INVALID.');
        return next(new NotAuthorizedError('Not authenticated.'));
    }

    const token = authHeader.split(' ')[1];
    console.log(token)

    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err) return res.sendStatus(403); //invalid token
            
            req.user._id = decoded._id
            req.user.email = decoded.email;
            req.user.roles = decoded.roles;
            next();
        }
    );
}