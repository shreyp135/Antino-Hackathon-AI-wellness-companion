import express from "express";
import {newPost,allPosts} from "../controllers/post_controllers.js";

const router = express.Router();

router.post("/",newPost);
router.get("/",allPosts);

export default router;