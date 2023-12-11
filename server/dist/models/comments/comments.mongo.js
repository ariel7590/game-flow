"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const commentSchema = new mongoose_1.default.Schema({
    commentId: {
        type: String,
        required: true,
    },
    postId: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    publisher: {
        type: String,
        required: true,
    },
    rank: {
        type: Number,
        required: true,
    },
    deleted: {
        type: Boolean,
        required: true,
    },
});
exports.commentModel = mongoose_1.default.model("Comments", commentSchema);
