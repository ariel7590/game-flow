import express from "express";
import multer from 'multer';
import { verifyJWT } from "../../config/jwt.config";
import {
	httpGetAllPosts,
	httpCreateNewPost,
	httpDeletePost,
	httpEditPost,
	httpGetPostById,
	httpGetPaginatedPosts
} from "../../controllers/posts/posts.controller";
import { validate } from '../../api/middlewares/validate-resourse.middleware';
import { 
	validateGetPaginatedPosts,
	validateGetPostById,
	validateCreateNewPost,
	validateDeletePost,
	validateEditPost,
 } from "../../api/validations/posts/posts.validation";

const postsRouter = express.Router();
const upload = multer({ dest: 'uploads/' });

// postsRouter.get("/", httpGetAllPosts); //for testing only, I can remove it later
postsRouter.get("/", validate(validateGetPaginatedPosts), httpGetPaginatedPosts);
postsRouter.post("/", verifyJWT, upload.single('media'), validate(validateCreateNewPost), httpCreateNewPost);
postsRouter.get("/:postId", validate(validateGetPostById), httpGetPostById);
postsRouter.delete("/:postId", verifyJWT, validate(validateDeletePost), httpDeletePost);
postsRouter.put("/", verifyJWT, upload.single('newMedia'), validate(validateEditPost), httpEditPost);

export default postsRouter;
