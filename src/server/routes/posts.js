import express from "express";
import { verifyAuth, enforceAuth } from '../middleware/verifyAuth.js';
import { createPost, getPosts, postAction } from "../controllers/posts.js";
import multer from 'multer';
import { bodyParse } from "../middleware/formDataBodyParser.js";


const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const router = express.Router();

router.get('/', verifyAuth, getPosts);
router.put('/', upload.single('attachment'), bodyParse, enforceAuth, createPost);
router.post('/action', enforceAuth, postAction);

export default router;