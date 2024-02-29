"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const jwt_config_1 = require("../../jwt/jwt.config");
const comments_controller_1 = require("./comments.controller");
const commentsRouter = express_1.default.Router();
const upload = (0, multer_1.default)({ dest: 'uploads/' });
// commentsRouter.get("/:postId", httpFindCommentsWithPostId);
commentsRouter.get("/:postId", comments_controller_1.httpGetPaginatedComments);
commentsRouter.post("/", jwt_config_1.verifyJWT, upload.single('media'), comments_controller_1.httpCreateNewComment);
commentsRouter.delete("/:commentId", jwt_config_1.verifyJWT, comments_controller_1.httpDeleteComment);
commentsRouter.put("/", jwt_config_1.verifyJWT, upload.single('newMedia'), comments_controller_1.httpEditComment);
commentsRouter.put("/rank", jwt_config_1.verifyJWT, comments_controller_1.httpRankComment);
commentsRouter.get("/find/:commentId", comments_controller_1.httpFindCommentWithCommentId);
exports.default = commentsRouter;
