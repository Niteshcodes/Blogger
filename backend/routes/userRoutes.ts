import express from "express";
import { handleSignup,handleLogin } from "../controllers/user";
import { handleProfileImage, upload } from "../controllers/File";

const router = express.Router();

router.post("/signup",upload.single('image'), handleSignup);
router.post("/login",handleLogin)
router.get('/profile/:filename', handleProfileImage);

export default router;