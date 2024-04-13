

import HttpError from "../http-error.js";
import User from "../model/User.js";

export const getUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find({}, "-password"); //    exclude password field from users
  } catch (error) {
    return next(
      new HttpError("Fetching users failed, please try again later.", 500)
    );
  }

  res.json({ users: users.map((user) => user.toObject({ getters: true })) });
};

export const getUserById = async (req, res) => {
  if (!req?.params?.id) return res.status(400).json({ "message": 'User ID required' });

  const user = await User.findOne({ _id: req.params.id }, "-password").exec();
  if (!user) {
    return res.status(204).json({ 'message': `User ID ${req.params.id} not found` });
  }
  res.json(user);
};

const getUserByEmail = async (req, res, next) => {
  const { email } = req.body;

  let user;
  try {
    user = await User.findOne({ email: email });
    if (!user) return next(new HttpError("User not found", 500));
  } catch (error) {
    return next(
      new HttpError("Get user by email failed, please try again later.", 500)
    );
  }

  res.json({ user: user });
};


