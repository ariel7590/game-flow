"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const jwt_config_1 = require("../../jwt/jwt.config");
const posts_controller_1 = require("./posts.controller");
const postsRouter = express_1.default.Router();
const upload = (0, multer_1.default)({ dest: 'uploads/' });
// postsRouter.get("/", httpGetAllPosts); //for testing only, I can remove it later
postsRouter.get("/", posts_controller_1.httpGetPaginatedPosts);
postsRouter.post("/", jwt_config_1.verifyJWT, upload.single('media'), posts_controller_1.httpCreateNewPost);
postsRouter.get("/:postId", posts_controller_1.httpGetPostById);
postsRouter.delete("/:postId", jwt_config_1.verifyJWT, posts_controller_1.httpDeletePost);
postsRouter.put("/", jwt_config_1.verifyJWT, posts_controller_1.httpEditPost);
exports.default = postsRouter;
