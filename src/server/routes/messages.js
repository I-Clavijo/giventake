import express from "express";
import { enforceAuth } from '../middleware/verifyAuth.js';
import { addMessage, getContacts } from "../controllers/messages.js";

const router = express.Router();

router.get("/contacts", enforceAuth, getContacts);
router.put("/", enforceAuth, addMessage);

export default router;