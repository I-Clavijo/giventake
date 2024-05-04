import express from "express";
import { getUserById, updateUser, friendAction, getAllFriends } from "../controllers/users.js";
import { enforceAuth } from "../middleware/verifyAuth.js";
import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const router = express.Router();

router.get('/', getUserById);
router.patch('/', upload.single('attachment'), enforceAuth, updateUser);

router.get('/friends/', enforceAuth, getAllFriends)
router.post('/friends/actions', enforceAuth, friendAction)

export default router;