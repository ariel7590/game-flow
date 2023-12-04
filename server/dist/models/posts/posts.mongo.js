"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const postsSchema = new mongoose_1.default.Schema({
    postId: {
        type: String,
        required: true,
    },
    publisher: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    media: {
        type: [String],
    },
    deleted: {
        type: Boolean,
        default: false,
    },
});
exports.postModel = mongoose_1.default.model("Posts", postsSchema);
