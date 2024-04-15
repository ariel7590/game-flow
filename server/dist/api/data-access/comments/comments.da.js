"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rankComment = exports.editComment = exports.deleteComment = exports.createNewComment = exports.findCommentWithCommentId = exports.countNumberOfComments = exports.getPaginatedComments = exports.findCommentsWithPostId = void 0;
const comments_model_1 = require("../../models/comments/comments.model");
const random_string_1 = require("../../utils/random-string");
async function saveToDB(comment) {
    return await comments_model_1.commentModel.findOneAndUpdate({
        commentId: comment.commentId,
    }, comment, {
        upsert: true,
    });
}
async function findCommentsWithPostId(postId) {
    return await comments_model_1.commentModel.find({ postId: postId, deleted: false }, { _id: 0, __v: 0, deleted: 0 });
}
exports.findCommentsWithPostId = findCommentsWithPostId;
async function getPaginatedComments(postId, paginatedData) {
    return await comments_model_1.commentModel
        .find({
        postId: postId,
        deleted: false,
    }, { _id: 0, __v: 0, deleted: 0 })
        .skip(paginatedData.skip)
        .limit(paginatedData.perPage);
}
exports.getPaginatedComments = getPaginatedComments;
async function countNumberOfComments(postId) {
    return await comments_model_1.commentModel.countDocuments({
        postId: postId,
        deleted: false,
    });
}
exports.countNumberOfComments = countNumberOfComments;
async function findCommentWithCommentId(commentId) {
    return await comments_model_1.commentModel.findOne({
        commentId,
    }, {
        _id: 0,
        __v: 0,
        deleted: 0,
    });
}
exports.findCommentWithCommentId = findCommentWithCommentId;
async function createNewComment(comment) {
    const commentId = (0, random_string_1.generateRandomStringId)(10);
    const newComment = {
        commentId,
        ...comment,
        rank: 0,
        deleted: false,
    };
    await saveToDB(newComment);
    return newComment;
}
exports.createNewComment = createNewComment;
async function deleteComment(commentId, postId) {
    const deleted = await comments_model_1.commentModel.updateOne({
        commentId: commentId,
        deleted: false,
    }, {
        deleted: true,
    });
    if (deleted.acknowledged && deleted.matchedCount > 0) {
        const updatedComments = await findCommentsWithPostId(postId);
        return updatedComments;
    }
}
exports.deleteComment = deleteComment;
async function editComment(commentId, newContent, newMedia) {
    const edited = await comments_model_1.commentModel.updateOne({
        commentId: commentId,
        deleted: false,
    }, {
        body: newContent,
        media: newMedia
    });
    return edited.acknowledged && edited.matchedCount > 0;
}
exports.editComment = editComment;
async function rankComment(commentId, newRank, rankerId) {
    const ranked = await comments_model_1.commentModel.updateOne({
        commentId: commentId,
        deleted: false,
    }, {
        rank: newRank,
        $push: { whoRanked: rankerId },
    });
    if (ranked.acknowledged && ranked.matchedCount > 0) {
        return await findCommentWithCommentId(commentId);
    }
}
exports.rankComment = rankComment;
