"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePost = exports.createNewPost = exports.getAllPosts = exports.isPostExists = void 0;
const posts_mongo_1 = require("./posts.mongo");
const crypto_1 = require("crypto");
function generateRandomStringId(length) {
    const idRandomBytes = (0, crypto_1.randomBytes)(length);
    const randomString = idRandomBytes.toString("hex");
    return randomString;
}
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
        });
    }
    catch (err) {
        console.error(err);
    }
}
exports.isPostExists = isPostExists;
async function getAllPosts() {
    try {
        return await posts_mongo_1.postModel.find({}, { _id: 0, __v: 0, deleted: 0 });
    }
    catch (err) {
        console.error(err);
    }
}
exports.getAllPosts = getAllPosts;
async function createNewPost(post) {
    const newPostId = generateRandomStringId(10);
    const newPost = { postId: newPostId, deleted: false, ...post };
    await savePost(newPost);
    return newPostId;
}
exports.createNewPost = createNewPost;
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
