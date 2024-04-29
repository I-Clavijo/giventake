import express from "express";
import postsRoutes from "./posts.js";
import authRoutes from './auth.js';


const router = express.Router();

router.use("/auth", authRoutes);
router.use("/posts", postsRoutes);


export default router;