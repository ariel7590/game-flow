import express from "express";
import multer from "multer";
import { verifyJWT } from "../../config/jwt.config";
import {
	httpCreateNewComment,
	httpDeleteComment,
	httpEditComment,
	httpFindCommentWithCommentId,
	httpFindCommentsWithPostId,
	httpGetPaginatedComments,
	httpRankComment
} from "../../controllers/comments/comments.controller";

const commentsRouter = express.Router();
const upload = multer({ dest: 'uploads/' });

// commentsRouter.get("/:postId", httpFindCommentsWithPostId);
commentsRouter.get("/:postId", httpGetPaginatedComments);
commentsRouter.post("/", verifyJWT, upload.single('media'), httpCreateNewComment);
commentsRouter.delete("/:commentId", verifyJWT, httpDeleteComment);
commentsRouter.put("/", verifyJWT, upload.single('newMedia'), httpEditComment);
commentsRouter.put("/rank", verifyJWT, httpRankComment)
commentsRouter.get("/find/:commentId",httpFindCommentWithCommentId);

export default commentsRouter;
