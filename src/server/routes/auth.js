import express from "express";
import { check } from "express-validator";
import { signUp, login, logout, handleRefreshToken } from "../controllers/auth.js";

const router = express.Router();

router.post(
	"/signup",
	[
		check("firstName").not().isEmpty(),
		check("lastName").not().isEmpty(),
		check("email").normalizeEmail().isEmail(),
		check("password").isLength({ min: 6 }),
		// check("shippingAddress").not().isEmpty(),
		// check("phone").not().isEmpty(),
	],
	signUp
);

router.post("/login", login);
router.post("/logout", logout);
router.post("/refresh", handleRefreshToken);

export default router;