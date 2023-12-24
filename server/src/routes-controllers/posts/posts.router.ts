import express from "express";
import { verifyJWT } from "../../jwt/jwt.config";
import {
	httpGetAllPosts,
	httpCreateNewPost,
	httpDeletePost,
	httpEditPost,
} from "./posts.controller";

const postsRouter = express.Router();

postsRouter.get("/", httpGetAllPosts);
postsRouter.post("/", verifyJWT, httpCreateNewPost);
postsRouter.delete("/:postId", verifyJWT, httpDeletePost);
postsRouter.put("/",verifyJWT, httpEditPost)

export default postsRouter;
