import express from "express";
import multer from 'multer';
import { verifyJWT } from "../../jwt/jwt.config";
import {
	httpGetAllPosts,
	httpCreateNewPost,
	httpDeletePost,
	httpEditPost,
	httpGetPostById,
	httpGetPaginatedPosts
} from "../../controllers/posts/posts.controller";

const postsRouter = express.Router();
const upload = multer({ dest: 'uploads/' });

// postsRouter.get("/", httpGetAllPosts); //for testing only, I can remove it later
postsRouter.get("/", httpGetPaginatedPosts);
postsRouter.post("/", verifyJWT, upload.single('media'), httpCreateNewPost);
postsRouter.get("/:postId", httpGetPostById);
postsRouter.delete("/:postId", verifyJWT, httpDeletePost);
postsRouter.put("/",verifyJWT, upload.single('newMedia'), httpEditPost);

export default postsRouter;
