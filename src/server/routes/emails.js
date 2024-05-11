import express from "express";
import { verifyAuth, enforceAuth } from '../middleware/verifyAuth.js';
import { sendEmail } from "../controllers/emails.js";
import { verifyEmail } from "../controllers/auth.js";


const router = express.Router();

router.post('/welcome', sendEmail);
router.post('/verify', verifyEmail);

export default router;