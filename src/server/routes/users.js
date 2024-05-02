import express from "express";
import { getUserById } from "../controllers/users.js";

const router = express.Router();

router.get('/', getUserById);

export default router;