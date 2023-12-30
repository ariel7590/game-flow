"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.httpEditComment = exports.httpDeleteComment = exports.httpFindCommentsWithPostId = exports.httpCreateNewComment = void 0;
const comments_model_1 = require("../../models/comments/comments.model");
const posts_model_1 = require("../../models/posts/posts.model");
const httpCreateNewComment = async (req, res) => {
    const commentInput = req.body;
    if (!commentInput) {
        return res.status(400).json({
            error: "Missing required comment!",
        });
    }
    if (commentInput.body === "" ||
        commentInput.postId === "" ||
        commentInput.publisher === "") {
        return res.status(400).json({
            error: "Missing required comment properties!",
        });
    }
    const post = await (0, posts_model_1.isPostExists)(commentInput.postId);
    if (!post) {
        return res.status(404).json({
            error: "Post not found!",
        });
    }
    const newComment = await (0, comments_model_1.createNewComment)(commentInput);
    return res.status(201).json({
        commetId: newComment.commentId,
        publisher: newComment.publisher,
        body: newComment.body,
        rank: newComment.rank,
    });
};
exports.httpCreateNewComment = httpCreateNewComment;
const httpFindCommentsWithPostId = async (req, res) => {
    const postId = req.params.postId;
    if (!postId || postId === "") {
        return res.status(404).json({
            error: "Post ID is not found!",
        });
    }
    const comments = await (0, comments_model_1.findCommentsWithPostId)(postId);
    if (!comments) {
        return res.status(404).json({
            error: "Failed at getting comments for this postId!",
        });
    }
    return res.status(200).json(comments);
};
exports.httpFindCommentsWithPostId = httpFindCommentsWithPostId;
const httpDeleteComment = async (req, res) => {
    const commentId = req.params.commentId;
    if (!commentId || commentId === "") {
        return res.status(404).json({
            error: "Comment ID is not found!",
        });
    }
    const comment = await (0, comments_model_1.findCommentWithCommentId)(commentId);
    if (!comment) {
        return res.status(404).json({
            error: "Comment with this ID is not found!",
        });
    }
    const updatedComments = await (0, comments_model_1.deleteComment)(commentId, comment.postId);
    if (!updatedComments) {
        return res.status(500).json({
            error: "Couldn't delete comment",
        });
    }
    return res.status(200).json(updatedComments);
};
exports.httpDeleteComment = httpDeleteComment;
const httpEditComment = async (req, res) => {
    const comment = req.body;
    const { commentId, newContent } = comment;
    if (!comment || commentId === "" || newContent === "") {
        return res.status(404).json({
            error: "Missing required fields!",
        });
    }
    const editedComment = await (0, comments_model_1.editComment)(commentId, newContent);
    if (!editedComment) {
        return res.status(500).json({
            error: "Couldn't edit comment",
        });
    }
    return res.status(200).json({
        commentId,
        newContent,
    });
};
exports.httpEditComment = httpEditComment;
