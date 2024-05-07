import express from "express";
import postsRoutes from "./posts.js";
import authRoutes from './auth.js';
import usersRoutes from './users.js';
import userEmails from './emails.js';


const router = express.Router();

router.use("/auth", authRoutes);
router.use("/posts", postsRoutes);
router.use("/users", usersRoutes);
router.use("/emails", userEmails);

export default router;