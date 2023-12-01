import express from "express";
import { verifyJWT } from "../../jwt/jwt.config";
import {
	httpGetAllPosts,
	httpCreateNewPost,
	httpDeletePost,
} from "./posts.controller";

const postsRouter = express.Router();

postsRouter.get("/", verifyJWT, httpGetAllPosts);
postsRouter.post("/", verifyJWT, httpCreateNewPost);
postsRouter.delete("/:postId", verifyJWT, httpDeletePost);

export default postsRouter;
