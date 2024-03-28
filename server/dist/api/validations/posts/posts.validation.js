"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateEditPost = exports.validateDeletePost = exports.validateCreateNewPost = exports.validateGetPostById = exports.validateGetPaginatedPosts = void 0;
const joi_1 = __importDefault(require("joi"));
exports.validateGetPaginatedPosts = joi_1.default.object({
    query: joi_1.default.object({
        page: joi_1.default.string().required(),
    }),
    body: joi_1.default.object(),
    params: joi_1.default.object(),
    file: joi_1.default.object(),
    userId: joi_1.default.number().optional(),
});
exports.validateGetPostById = joi_1.default.object({
    params: joi_1.default.object({
        postId: joi_1.default.string().required(),
    }),
    query: joi_1.default.object(),
    body: joi_1.default.object(),
    file: joi_1.default.object(),
    userId: joi_1.default.number().optional(),
});
exports.validateCreateNewPost = joi_1.default.object({
    body: joi_1.default.object({
        publisher: joi_1.default.string().required(),
        publisherId: joi_1.default.string().required(),
        gameName: joi_1.default.string().required(),
        title: joi_1.default.string().required(),
        body: joi_1.default.string().required(),
        media: [joi_1.default.string().optional()],
    }),
    file: joi_1.default.object({
        fieldname: joi_1.default.string().required(),
        originalname: joi_1.default.string().required(),
        encoding: joi_1.default.string().required(),
        mimetype: joi_1.default.string().valid('image/jpeg', 'image/png').required(),
        destination: joi_1.default.string().required(),
        filename: joi_1.default.string().required(),
        path: joi_1.default.string().required(),
        size: joi_1.default.number().required()
    }),
    params: joi_1.default.object(),
    query: joi_1.default.object(),
    userId: joi_1.default.number().required(),
});
exports.validateDeletePost = joi_1.default.object({
    params: joi_1.default.object({
        postId: joi_1.default.string().required(),
    }),
    userId: joi_1.default.number().required(),
    query: joi_1.default.object(),
    body: joi_1.default.object(),
    file: joi_1.default.object(),
});
exports.validateEditPost = joi_1.default.object({
    body: joi_1.default.object({
        postId: joi_1.default.string().required(),
        newGameName: joi_1.default.string().required(),
        newTitle: joi_1.default.string().required(),
        newContent: joi_1.default.string().required(),
        newMedia: joi_1.default.string().required(),
        publisherId: joi_1.default.string().required()
    }),
    file: joi_1.default.object({
        fieldname: joi_1.default.string().required(),
        originalname: joi_1.default.string().required(),
        encoding: joi_1.default.string().required(),
        mimetype: joi_1.default.string().valid('image/jpeg', 'image/png').required(),
        destination: joi_1.default.string().required(),
        filename: joi_1.default.string().required(),
        path: joi_1.default.string().required(),
        size: joi_1.default.number().required()
    }),
    userId: joi_1.default.number().required(),
    params: joi_1.default.object(),
    query: joi_1.default.object(),
});
