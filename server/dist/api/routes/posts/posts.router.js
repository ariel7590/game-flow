"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const jwt_config_1 = require("../../../config/jwt.config");
const posts_controller_1 = require("../../controllers/posts/posts.controller");
const validate_resourse_middleware_1 = require("../../middlewares/validate-resourse.middleware");
const posts_validation_1 = require("../../validations/posts/posts.validation");
const postsRouter = express_1.default.Router();
const upload = (0, multer_1.default)({ dest: 'uploads/' });
// postsRouter.get("/", httpGetAllPosts); //for testing only, I can remove it later
postsRouter.get("/", (0, validate_resourse_middleware_1.validate)(posts_validation_1.validateGetPaginatedPosts), posts_controller_1.httpGetPaginatedPosts);
postsRouter.post("/", jwt_config_1.verifyJWT, upload.single('media'), (0, validate_resourse_middleware_1.validate)(posts_validation_1.validateCreateNewPost), posts_controller_1.httpCreateNewPost);
postsRouter.get("/:postId", (0, validate_resourse_middleware_1.validate)(posts_validation_1.validateGetPostById), posts_controller_1.httpGetPostById);
postsRouter.delete("/:postId", jwt_config_1.verifyJWT, (0, validate_resourse_middleware_1.validate)(posts_validation_1.validateDeletePost), posts_controller_1.httpDeletePost);
postsRouter.put("/", jwt_config_1.verifyJWT, upload.single('newMedia'), (0, validate_resourse_middleware_1.validate)(posts_validation_1.validateEditPost), posts_controller_1.httpEditPost);
exports.default = postsRouter;
