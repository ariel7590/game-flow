import express from "express";
import multer from "multer";
import { verifyJWT } from "../../../config/jwt.config";
import {
	httpCreateNewComment,
	httpDeleteComment,
	httpEditComment,
	httpFindCommentWithCommentId,
	httpFindCommentsWithPostId,
	httpGetPaginatedComments,
	httpRankComment
} from "../../controllers/comments/comments.controller";
import {
	validateCreateNewComment,
	validateFindCommentWithCommentId,
	validateGetPaginatedComments,
	validateDeleteComment,
	validateEditComment,
	validateRankComment
} from "../../validations/comments/comments.validations";
import { validate } from '../../middlewares/validate-resourse.middleware';

const commentsRouter = express.Router();
const upload = multer({ dest: 'uploads/' });

// commentsRouter.get("/:postId", httpFindCommentsWithPostId);
commentsRouter.get("/:postId", validate(validateGetPaginatedComments), httpGetPaginatedComments);
commentsRouter.post("/", verifyJWT, upload.single('media'), validate(validateCreateNewComment), httpCreateNewComment);
commentsRouter.delete("/:commentId", verifyJWT, validate(validateDeleteComment), httpDeleteComment);
commentsRouter.put("/", verifyJWT, upload.single('newMedia'), validate(validateEditComment), httpEditComment);
commentsRouter.put("/rank", verifyJWT, validate(validateRankComment), httpRankComment)
commentsRouter.get("/find/:commentId", validate(validateFindCommentWithCommentId
), httpFindCommentWithCommentId);

export default commentsRouter;
