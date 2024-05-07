import express from "express";
import { verifyAuth, enforceAuth } from '../middleware/verifyAuth.js';
import { sendEmail } from "../controllers/emails.js";


const router = express.Router();

router.post('/welcome', sendEmail);

export default router;