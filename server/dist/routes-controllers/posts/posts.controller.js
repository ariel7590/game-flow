"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.httpDeletePost = exports.httpCreateNewPost = exports.httpGetAllPosts = void 0;
const posts_model_1 = require("../../models/posts/posts.model");
const httpGetAllPosts = async (req, res) => {
    const posts = await (0, posts_model_1.getAllPosts)();
    return res.status(200).json(posts);
};
exports.httpGetAllPosts = httpGetAllPosts;
const httpCreateNewPost = async (req, res) => {
    const post = req.body;
    if (!post.body) {
        return res.status(400).json({
            error: "Missing required post properties!",
        });
    }
    const postId = await (0, posts_model_1.createNewPost)(post);
    return res.status(201).json({
        postId,
        creatorId: post.creatorId,
        body: post.body,
        media: post.media,
    });
};
exports.httpCreateNewPost = httpCreateNewPost;
const httpDeletePost = async (req, res) => {
    const postId = req.params.postId;
    if (!postId || postId === "") {
        return res.status(400).json({
            error: "Invalid post id",
        });
    }
    const isExists = await (0, posts_model_1.isPostExists)(postId);
    if (isExists) {
        await (0, posts_model_1.deletePost)(postId);
        return res.status(200).json({
            ok: `Post with ID ${postId} has been deleted!`,
        });
    }
    return res.status(404).json({
        error: "Post is not found!",
    });
};
exports.httpDeletePost = httpDeletePost;
