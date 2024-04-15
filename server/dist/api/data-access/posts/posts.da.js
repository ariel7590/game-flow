"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.countNumberOfPosts = exports.deletePost = exports.editPost = exports.createNewPost = exports.getPaginatedPosts = exports.getAllPosts = exports.isPostExists = void 0;
const posts_model_1 = require("../../models/posts/posts.model");
const random_string_1 = require("../../utils/random-string");
async function savePost(post) {
    await posts_model_1.postModel.findOneAndUpdate({
        postId: post.postId,
    }, post, { upsert: true });
}
async function isPostExists(postId) {
    return await posts_model_1.postModel.findOne({
        postId,
    }, {
        _id: 0,
        __v: 0,
        deleted: 0,
    });
}
exports.isPostExists = isPostExists;
async function getAllPosts() {
    return await posts_model_1.postModel.find({
        deleted: false,
    }, { _id: 0, __v: 0, deleted: 0 });
}
exports.getAllPosts = getAllPosts;
async function getPaginatedPosts(paginatedData) {
    return await posts_model_1.postModel
        .find({
        deleted: false,
    }, { _id: 0, __v: 0, deleted: 0 })
        .skip(paginatedData.skip)
        .limit(paginatedData.perPage);
}
exports.getPaginatedPosts = getPaginatedPosts;
async function createNewPost(post) {
    const newPostId = (0, random_string_1.generateRandomStringId)(10);
    const newPost = { postId: newPostId, deleted: false, ...post };
    await savePost(newPost);
    return newPostId;
}
exports.createNewPost = createNewPost;
async function editPost(postId, newGameName, newTitle, newContent, newMedia) {
    const edited = await posts_model_1.postModel.updateOne({
        postId,
        deleted: false,
    }, {
        gameName: newGameName,
        title: newTitle,
        body: newContent,
        media: newMedia,
    });
    if (edited.acknowledged && edited.matchedCount > 0) {
        return await isPostExists(postId);
    }
    else {
        return null;
    }
}
exports.editPost = editPost;
async function deletePost(postId) {
    const deleted = await posts_model_1.postModel.updateOne({
        postId: postId,
    }, {
        deleted: true,
    });
    return deleted.acknowledged && deleted.modifiedCount === 1;
}
exports.deletePost = deletePost;
async function countNumberOfPosts() {
    return await posts_model_1.postModel.countDocuments({
        deleted: false,
    });
}
exports.countNumberOfPosts = countNumberOfPosts;
