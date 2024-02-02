"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePost = exports.editPost = exports.createNewPost = exports.getPaginatedPosts = exports.getAllPosts = exports.isPostExists = void 0;
const posts_mongo_1 = require("./posts.mongo");
const random_string_1 = require("../../utils/random-string");
async function savePost(post) {
    try {
        await posts_mongo_1.postModel.findOneAndUpdate({
            postId: post.postId,
        }, post, { upsert: true });
    }
    catch (err) {
        console.error(err);
    }
}
async function isPostExists(postId) {
    try {
        return await posts_mongo_1.postModel.findOne({
            postId,
        }, {
            _id: 0,
            __v: 0,
            deleted: 0,
        });
    }
    catch (err) {
        console.error(err);
    }
}
exports.isPostExists = isPostExists;
async function getAllPosts() {
    try {
        return await posts_mongo_1.postModel.find({
            deleted: false,
        }, { _id: 0, __v: 0, deleted: 0 });
    }
    catch (err) {
        console.error(err);
    }
}
exports.getAllPosts = getAllPosts;
async function getPaginatedPosts(paginatedData) {
    try {
        return await posts_mongo_1.postModel
            .find({
            deleted: false,
        }, { _id: 0, __v: 0, deleted: 0 })
            .skip(paginatedData.skip)
            .limit(paginatedData.perPage);
    }
    catch (err) {
        console.error(err);
    }
}
exports.getPaginatedPosts = getPaginatedPosts;
async function createNewPost(post) {
    const newPostId = (0, random_string_1.generateRandomStringId)(10);
    const newPost = { postId: newPostId, deleted: false, ...post };
    await savePost(newPost);
    return newPostId;
}
exports.createNewPost = createNewPost;
async function editPost(postId, newTitle, newContent) {
    try {
        const edited = await posts_mongo_1.postModel.updateOne({
            postId,
            deleted: false,
        }, {
            title: newTitle,
            body: newContent,
        });
        if (edited.acknowledged && edited.matchedCount > 0) {
            return await isPostExists(postId);
        }
        else {
            return null;
        }
    }
    catch (err) {
        console.error(err);
    }
}
exports.editPost = editPost;
async function deletePost(postId) {
    try {
        const deleted = await posts_mongo_1.postModel.updateOne({
            postId: postId,
        }, {
            deleted: true,
        });
        return deleted.acknowledged && deleted.modifiedCount === 1;
    }
    catch (err) {
        console.error(err);
    }
}
exports.deletePost = deletePost;
