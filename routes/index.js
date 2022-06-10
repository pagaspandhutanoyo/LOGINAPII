import express from "express";
// import dotenv from "dotenv";
import { getUsers, Register, Login, Logout } from "../controller/User.js";
//import { getUsers } from "../controller/User.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { refreshToken } from "../controller/RefreshToken.js";
// dotenv.config();
const router = express.Router();

router.get('/users',verifyToken, getUsers);
router.post('/users', Register);
router.post('/login', Login);
router.get('/token', refreshToken);
router.delete('/logout', Logout);
export default router;