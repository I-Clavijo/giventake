import express from "express";
import verifyAuth from '../middleware/verifyAuth.js';
import { createPost, getPosts } from "../controllers/posts.js";
import multer from 'multer';


const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

const router = express.Router();

router.get('/', getPosts);
router.put('/', upload.single('attachment'), verifyAuth, createPost);

export default router;