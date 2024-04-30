import express from "express";
import { verifyAuth, enforceAuth } from '../middleware/verifyAuth.js';
import { createPost, getPosts, postAction } from "../controllers/posts.js";
import multer from 'multer';


const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const router = express.Router();

router.get('/', verifyAuth, getPosts);
router.put('/', upload.single('attachment'), enforceAuth, createPost);
router.post('/action', enforceAuth, postAction);

export default router;