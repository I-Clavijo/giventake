import User from '../model/User.js';
import AppError from '../utils/AppError.js';

export const getUserById = (req, res) => {
    const { userId } = req.body;
    if(!userId) throw new AppError('User ID is required.', 401);

    const user = User.findOne({ _id: userId });
    if(!user) throw AppError('User not found', 404);
    
    res.status(200).json(user);
};