"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jwt_config_1 = require("../../jwt/jwt.config");
const comments_controller_1 = require("./comments.controller");
const commentsRouter = express_1.default.Router();
commentsRouter.get("/:postId", comments_controller_1.httpFindCommentsWithPostId);
commentsRouter.post("/", jwt_config_1.verifyJWT, comments_controller_1.httpCreateNewComment);
commentsRouter.delete("/:commentId", jwt_config_1.verifyJWT, comments_controller_1.httpDeleteComment);
commentsRouter.put("/", jwt_config_1.verifyJWT, comments_controller_1.httpEditComment);
exports.default = commentsRouter;
