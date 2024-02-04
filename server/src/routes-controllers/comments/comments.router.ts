import express from "express";
import { verifyJWT } from "../../jwt/jwt.config";
import {
	httpCreateNewComment,
	httpDeleteComment,
	httpEditComment,
	httpFindCommentsWithPostId,
	httpGetPaginatedComments,
	httpRankComment
} from "./comments.controller";

const commentsRouter = express.Router();

// commentsRouter.get("/:postId", httpFindCommentsWithPostId);
commentsRouter.get("/:postId", httpGetPaginatedComments);
commentsRouter.post("/", verifyJWT, httpCreateNewComment);
commentsRouter.delete("/:commentId", verifyJWT, httpDeleteComment);
commentsRouter.put("/", verifyJWT, httpEditComment);
commentsRouter.put("/rank",verifyJWT, httpRankComment)

export default commentsRouter;
