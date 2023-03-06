import express from "express";
import { getLogIn, getSignUp, postLogIn, postSignUp } from "../controllers/authController.js";
import isLogedIn from "../middleware/isLogedIn.js";

const router = express.Router();

router.get('/signup',getSignUp);
router.post('/signup',postSignUp);

router.get('/login',isLogedIn,getLogIn);
router.post('/login',isLogedIn,postLogIn);

export default router;