import express from "express";
import verifyAuth from '../middleware/verifyAuth.js';
import usersRoutes from "./users.js";


const router = express.Router();

router.use("/users", verifyAuth, usersRoutes);


export default router;