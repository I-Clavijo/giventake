import express from "express";
import verifyAuth from '../middleware/verifyAuth.js';
import { createPost, getPosts, postAction } from "../controllers/posts.js";
import multer from 'multer';


const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

const router = express.Router();

router.get('/', getPosts);
router.put('/', upload.single('attachment'), verifyAuth, createPost);
router.post('/action', verifyAuth, postAction);

export default router;