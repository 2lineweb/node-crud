import express from "express";
import { deleteBlog, getBlog, getUser, logOut, postBlog, putBlog } from "../controllers/userController.js";

const router = express.Router();

router.get('/',getUser);
router.get('/blog/:id',getBlog);
router.post('/blog',postBlog);
router.put('/blog/:id',putBlog);
router.delete('/blog/:id',deleteBlog);
router.get('/logout',logOut);

export default router;
