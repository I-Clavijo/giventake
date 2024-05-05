import express from "express";
import { verifyAuth, enforceAuth } from '../middleware/verifyAuth.js';
import { getFriends, friendAction } from "../controllers/friends.js";

const router = express.Router();

router.get('/', getFriends);
router.post('/friend-action', enforceAuth, friendAction)

export default router;