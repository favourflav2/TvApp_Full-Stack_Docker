import { Router } from "express";
import { google_Sign_In, log_In, like_Tv, sign_Up, get_Liked_Tv } from "../controller/authController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import rateLimit from 'express-rate-limit'

const limiter = rateLimit({
	windowMs: 1 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	message: "Too many requests from this IP, please try again later."
})

const router = Router()

router.post("/signup",sign_Up)
router.post("/login",log_In)
router.post("/google",google_Sign_In)

router.post("/likeTv",limiter,authMiddleware,like_Tv)
router.get("/getLikedTv",limiter,authMiddleware,get_Liked_Tv)

export default router