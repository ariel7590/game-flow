"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRankComment = exports.validateEditComment = exports.validateDeleteComment = exports.validateGetPaginatedComments = exports.validateFindCommentWithCommentId = exports.validateCreateNewComment = void 0;
const joi_1 = __importDefault(require("joi"));
exports.validateCreateNewComment = joi_1.default.object({
    body: joi_1.default.object({
        postId: joi_1.default.string().required(),
        body: joi_1.default.string().required(),
        media: [joi_1.default.string().optional()],
        publisher: joi_1.default.string().required(),
        publisherId: joi_1.default.number().required()
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
    userId: joi_1.default.number()
});
exports.validateFindCommentWithCommentId = joi_1.default.object({
    params: joi_1.default.object({
        commentId: joi_1.default.string().required()
    }),
    body: joi_1.default.object(),
    query: joi_1.default.object(),
    file: joi_1.default.object(),
    userId: joi_1.default.number().optional()
});
exports.validateGetPaginatedComments = joi_1.default.object({
    query: joi_1.default.object({
        page: joi_1.default.string().required()
    }),
    params: joi_1.default.object({
        postId: joi_1.default.string().required()
    }),
    body: joi_1.default.object(),
    file: joi_1.default.object(),
    userId: joi_1.default.number().optional()
});
exports.validateDeleteComment = joi_1.default.object({
    params: joi_1.default.object({
        commentId: joi_1.default.string().required()
    }),
    userId: joi_1.default.number().required(),
    query: joi_1.default.object(),
    body: joi_1.default.object(),
    file: joi_1.default.object(),
});
exports.validateEditComment = joi_1.default.object({
    body: joi_1.default.object({
        commentId: joi_1.default.string().required(),
        newContent: joi_1.default.string().required(),
        publisherId: joi_1.default.string().required(),
        editorId: joi_1.default.number().required(),
        newMedia: joi_1.default.string().optional()
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
    query: joi_1.default.object()
});
exports.validateRankComment = joi_1.default.object({
    body: joi_1.default.object({
        commentId: joi_1.default.string().required(),
        newRank: joi_1.default.number().required(),
        rankerId: joi_1.default.number().required()
    }),
    userId: joi_1.default.number().required(),
    params: joi_1.default.object(),
    query: joi_1.default.object(),
    file: joi_1.default.object()
});
