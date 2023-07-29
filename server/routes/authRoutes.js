import { Router } from "express";
import { google_Sign_In, log_In, like_Tv, sign_Up, get_Liked_Tv } from "../controller/authController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = Router()

router.post("/signup",sign_Up)
router.post("/login",log_In)
router.post("/google",google_Sign_In)

router.post("/likeTv",authMiddleware,like_Tv)
router.get("/getLikedTv",authMiddleware,get_Liked_Tv)

export default router