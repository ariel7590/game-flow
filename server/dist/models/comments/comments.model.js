"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.editComment = exports.deleteComment = exports.createNewComment = exports.findCommentWithCommentId = exports.getPaginatedComments = exports.findCommentsWithPostId = void 0;
const comments_mongo_1 = require("./comments.mongo");
const random_string_1 = require("../../utils/random-string");
async function saveToDB(comment) {
    try {
        return await comments_mongo_1.commentModel.findOneAndUpdate({
            commentId: comment.commentId,
        }, comment, {
            upsert: true,
        });
    }
    catch (err) {
        console.log(err);
    }
}
async function findCommentsWithPostId(postId) {
    try {
        return await comments_mongo_1.commentModel.find({ postId: postId, deleted: false }, { _id: 0, __v: 0, deleted: 0 });
    }
    catch (err) {
        console.log(err);
    }
}
exports.findCommentsWithPostId = findCommentsWithPostId;
async function getPaginatedComments(postId, paginatedData) {
    try {
        return await comments_mongo_1.commentModel
            .find({
            postId: postId,
            deleted: false
        }, { _id: 0, __v: 0, deleted: 0 })
            .skip(paginatedData.skip)
            .limit(paginatedData.perPage);
    }
    catch (err) {
        console.error(err);
    }
}
exports.getPaginatedComments = getPaginatedComments;
async function findCommentWithCommentId(commentId) {
    try {
        return await comments_mongo_1.commentModel.findOne({
            commentId,
        }, {
            _id: 0,
            __v: 0,
            deleted: 0,
        });
    }
    catch (err) {
        console.log(err);
    }
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
    try {
        const deleted = await comments_mongo_1.commentModel.updateOne({
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
    catch (err) {
        console.error(err);
    }
}
exports.deleteComment = deleteComment;
async function editComment(commentId, newContent) {
    try {
        const edited = await comments_mongo_1.commentModel.updateOne({
            commentId: commentId,
            deleted: false,
        }, {
            body: newContent,
        });
        return edited.acknowledged && edited.matchedCount > 0;
    }
    catch (err) {
        console.error(err);
    }
}
exports.editComment = editComment;
