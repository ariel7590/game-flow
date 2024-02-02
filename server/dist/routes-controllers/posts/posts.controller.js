"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.httpEditPost = exports.httpDeletePost = exports.httpCreateNewPost = exports.httpGetPostById = exports.httpGetPaginatedPosts = exports.httpGetAllPosts = void 0;
const posts_model_1 = require("../../models/posts/posts.model");
const pagination_1 = require("../../utils/pagination");
const httpGetAllPosts = async (req, res) => {
    const posts = await (0, posts_model_1.getAllPosts)();
    return res.status(200).json(posts);
};
exports.httpGetAllPosts = httpGetAllPosts;
const httpGetPaginatedPosts = async (req, res) => {
    const page = req.query.page;
    console.log(page);
    const paginationData = (0, pagination_1.paginate)(+page);
    const posts = await (0, posts_model_1.getPaginatedPosts)(paginationData);
    return res.status(200).json(posts);
};
exports.httpGetPaginatedPosts = httpGetPaginatedPosts;
const httpGetPostById = async (req, res) => {
    const postId = req.params.postId;
    const post = await (0, posts_model_1.isPostExists)(postId);
    if (post) {
        return res.status(200).json(post);
    }
    else {
        return res.status(404).json({
            error: "Post not found!",
        });
    }
};
exports.httpGetPostById = httpGetPostById;
const httpCreateNewPost = async (req, res) => {
    const post = req.body;
    if (!post) {
        return res.status(400).json({
            error: "Missing required post!",
        });
    }
    if (post.body === "" || post.publisher === "" || post.title === "") {
        return res.status(400).json({
            error: "Missing required post properties!",
        });
    }
    const postId = await (0, posts_model_1.createNewPost)(post);
    return res.status(201).json({
        postId,
        publisher: post.publisher,
        publisherId: post.publisherId,
        gameName: post.gameName,
        title: post.title,
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
    const userId = req.userId;
    if (!userId) {
        return res.status(400).json({
            auth: false,
            message: "Invalid user id",
        });
    }
    const isExists = await (0, posts_model_1.isPostExists)(postId);
    if (isExists) {
        if (isExists.publisherId !== userId) {
            return res.status(401).json({
                error: "You are unathorized to delete this post!",
            });
        }
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
const httpEditPost = async (req, res) => {
    const post = req.body;
    const userId = req.userId;
    if (!userId) {
        return res.status(400).json({
            auth: false,
            message: "Invalid user id",
        });
    }
    const { postId, newTitle, newContent, publisherId } = post;
    if (!post ||
        postId === "" ||
        newTitle === "" ||
        newContent === "" ||
        !publisherId) {
        return res.status(404).json({
            error: "Missing required fields!",
        });
    }
    if (publisherId !== userId) {
        return res.status(401).json({
            error: "You are unathorized to edit this post!",
        });
    }
    const editedPost = await (0, posts_model_1.editPost)(postId, newTitle, newContent);
    if (!editedPost) {
        return res.status(500).json({
            error: "Couldn't edit post",
        });
    }
    return res.status(200).json(editedPost);
};
exports.httpEditPost = httpEditPost;
