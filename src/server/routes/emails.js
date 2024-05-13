import express from "express";
import { sendVerificationEmail, sendWelcomeEmail, verifyCode } from "../controllers/emails.js";


const router = express.Router();

router.post('/send-welcome-email', sendWelcomeEmail);
router.post('/send-verification-email', sendVerificationEmail);
router.post('/verify-code', verifyCode);

export default router;