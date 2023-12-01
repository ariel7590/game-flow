"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jwt_config_1 = require("../../jwt/jwt.config");
const posts_controller_1 = require("./posts.controller");
const postsRouter = express_1.default.Router();
postsRouter.get("/", jwt_config_1.verifyJWT, posts_controller_1.httpGetAllPosts);
postsRouter.post("/", jwt_config_1.verifyJWT, posts_controller_1.httpCreateNewPost);
postsRouter.delete("/:postId", jwt_config_1.verifyJWT, posts_controller_1.httpDeletePost);
exports.default = postsRouter;
