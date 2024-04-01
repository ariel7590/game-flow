"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.httpRankComment = exports.httpEditComment = exports.httpDeleteComment = exports.httpGetPaginatedComments = exports.httpFindCommentsWithPostId = exports.httpFindCommentWithCommentId = exports.httpCreateNewComment = void 0;
const cloudinary_1 = require("cloudinary");
const comments_da_1 = require("../../data-access/comments/comments.da");
const posts_da_1 = require("../../data-access/posts/posts.da");
const pagination_1 = require("../../utils/pagination");
const httpCreateNewComment = async (req, res) => {
    const commentInput = req.body;
    const post = await (0, posts_da_1.isPostExists)(commentInput.postId);
    if (!post) {
        return res.status(404).json({
            error: "Post not found!",
        });
    }
    const publisherId = +commentInput.publisherId;
    let uploadResult = null;
    let uploadSecureUrl = "";
    if (req.file) {
        uploadResult = await cloudinary_1.v2.uploader.upload(req.file.path, {
            folder: "game-flow"
        });
        console.log("File uploaded to Cloudinary:", uploadResult);
        uploadSecureUrl = uploadResult.secure_url;
    }
    const mediaUrls = [];
    if (uploadResult) {
        mediaUrls.push(uploadSecureUrl);
    }
    const newComment = await (0, comments_da_1.createNewComment)({ ...commentInput, publisherId, media: mediaUrls });
    return res.status(201).json({
        commetId: newComment.commentId,
        publisher: newComment.publisher,
        publisherId: newComment.publisherId,
        body: newComment.body,
        rank: newComment.rank,
        media: mediaUrls
    });
};
exports.httpCreateNewComment = httpCreateNewComment;
const httpFindCommentWithCommentId = async (req, res) => {
    const commentId = req.params.commentId;
    const comment = await (0, comments_da_1.findCommentWithCommentId)(commentId);
    if (!comment) {
        return res.status(404).json({
            error: "Failed at getting comments for this postId!",
        });
    }
    return res.status(200).json(comment);
};
exports.httpFindCommentWithCommentId = httpFindCommentWithCommentId;
const httpFindCommentsWithPostId = async (req, res) => {
    const postId = req.params.postId;
    if (!postId || postId === "") {
        return res.status(404).json({
            error: "Post ID is not found!",
        });
    }
    const comments = await (0, comments_da_1.findCommentsWithPostId)(postId);
    if (!comments) {
        return res.status(404).json({
            error: "Failed at getting comments for this postId!",
        });
    }
    return res.status(200).json(comments);
};
exports.httpFindCommentsWithPostId = httpFindCommentsWithPostId;
const httpGetPaginatedComments = async (req, res) => {
    const page = req.query.page;
    const postId = req.params.postId;
    const perPage = 5;
    const paginationData = (0, pagination_1.paginate)(+page, perPage);
    const comments = await (0, comments_da_1.getPaginatedComments)(postId, paginationData);
    if (!comments) {
        return res.status(404).json({
            error: "Failed at getting comments for this postId!",
        });
    }
    const totalNumOfComments = await (0, comments_da_1.countNumberOfComments)(postId);
    const totalNumOfPages = totalNumOfComments ? Math.ceil(totalNumOfComments / perPage) : 1;
    return res.status(200).json({ comments, pages: totalNumOfPages });
};
exports.httpGetPaginatedComments = httpGetPaginatedComments;
const httpDeleteComment = async (req, res) => {
    const commentId = req.params.commentId;
    const userId = req.userId;
    const comment = await (0, comments_da_1.findCommentWithCommentId)(commentId);
    if (comment) {
        if (comment.publisherId !== userId) {
            return res.status(401).json({
                error: "You are unathorized to delete this comment!",
            });
        }
        const updatedComments = await (0, comments_da_1.deleteComment)(commentId, comment.postId);
        if (!updatedComments) {
            return res.status(500).json({
                error: "Couldn't delete comment",
            });
        }
        return res.status(200).json(updatedComments);
    }
    return res.status(404).json({
        error: "Comment with this ID is not found!",
    });
};
exports.httpDeleteComment = httpDeleteComment;
const httpEditComment = async (req, res) => {
    const comment = req.body;
    const { commentId, newContent, publisherId, editorId, newMedia } = comment;
    const publisherIdNum = +publisherId;
    const editorIdNum = +editorId;
    if (editorIdNum !== publisherIdNum) {
        return res.status(401).json({
            error: "You are unathorized to edit this comment!",
        });
    }
    let mediaUrls = [];
    if (req.file) {
        const uploadResult = await cloudinary_1.v2.uploader.upload(req.file.path, {
            folder: "game-flow"
        });
        console.log("File uploaded to Cloudinary:", uploadResult);
        const uploadSecureUrl = uploadResult.secure_url;
        mediaUrls.push(uploadSecureUrl);
    }
    if (mediaUrls.length === 0 && newMedia?.trim() !== "") {
        mediaUrls = JSON.parse(newMedia);
    }
    const editedComment = await (0, comments_da_1.editComment)(commentId, newContent, mediaUrls);
    if (!editedComment) {
        return res.status(500).json({
            error: "Couldn't edit comment",
        });
    }
    return res.status(200).json({
        commentId,
        newContent,
        newMedia: mediaUrls
    });
};
exports.httpEditComment = httpEditComment;
const httpRankComment = async (req, res) => {
    const rankData = req.body;
    const { commentId, newRank, rankerId } = rankData;
    const comment = await (0, comments_da_1.findCommentWithCommentId)(commentId);
    if (comment?.whoRanked.includes(rankerId)) {
        return res.status(401).json({
            error: "You already ranked this comment and you're not unathorized to rank this comment again!",
        });
    }
    const rankedComment = await (0, comments_da_1.rankComment)(commentId, newRank, rankerId);
    if (!rankedComment) {
        return res.status(500).json({
            error: "Couldn't rank comment",
        });
    }
    return res.status(200).json(rankedComment);
};
exports.httpRankComment = httpRankComment;