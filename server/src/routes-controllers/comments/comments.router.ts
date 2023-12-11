import express from "express";
import { verifyJWT } from "../../jwt/jwt.config";
import {
	httpCreateNewComment,
	httpDeleteComment,
	httpEditComment,
	httpFindCommentsWithPostId,
} from "./comments.controller";

const commentsRouter = express.Router();

commentsRouter.get("/:postId", httpFindCommentsWithPostId);
commentsRouter.post("/", verifyJWT, httpCreateNewComment);
commentsRouter.delete("/:commentId", verifyJWT, httpDeleteComment);
commentsRouter.put("/", verifyJWT, httpEditComment);

export default commentsRouter;
