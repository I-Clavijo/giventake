import express from "express";
import { enforceAuth } from '../middleware/verifyAuth.js';
import { addMessage, getMessages } from "../controllers/messages.js";

const router = express.Router();

router.get("/", enforceAuth, getMessages);
router.put("/", enforceAuth, addMessage);

export default router;