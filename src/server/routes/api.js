import express from "express";
import postsRoutes from "./posts.js";
import authRoutes from './auth.js';
import usersRoutes from './users.js';
import reviewsRoutes from './reviews.js';
import friendsRoutes from './friends.js';
import emailsRoutes from './emails.js';


const router = express.Router();

router.use("/auth", authRoutes);
router.use("/posts", postsRoutes);
router.use("/users", usersRoutes);
router.use("/reviews", reviewsRoutes);
router.use("/friends", friendsRoutes);

router.use("/emails", emailsRoutes);

export default router;