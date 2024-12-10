"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.httpEditPost = exports.httpDeletePost = exports.httpCreateNewPost = exports.httpGetPostById = exports.httpGetPaginatedPosts = exports.httpGetAllPosts = void 0;
const cloudinary_service_1 = require("../../services/cloudinary.service");
const posts_da_1 = require("../../data-access/posts/posts.da");
const pagination_1 = require("../../utils/pagination");
const dompurify_1 = __importDefault(require("dompurify"));
const jsdom_1 = require("jsdom");
const window = new jsdom_1.JSDOM('').window;
const domPurify = (0, dompurify_1.default)(window);
const httpGetAllPosts = async (req, res) => {
    //for testing only, I can remove it later
    const posts = await (0, posts_da_1.getAllPosts)();
    return res.status(200).json(posts);
};
exports.httpGetAllPosts = httpGetAllPosts;
const httpGetPaginatedPosts = async (req, res) => {
    try {
        const page = req.query.page;
        const paginationData = (0, pagination_1.paginate)(+page);
        const posts = await (0, posts_da_1.getPaginatedPosts)(paginationData);
        if (!posts) {
            return res.status(404).json({
                error: "Posts were not found!",
            });
        }
        const totalNumOfPosts = await (0, posts_da_1.countNumberOfPosts)();
        const totalNumOfPages = totalNumOfPosts
            ? Math.ceil(totalNumOfPosts / 10)
            : 1;
        return res.status(200).json({ posts, pages: totalNumOfPages });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            error,
        });
    }
};
exports.httpGetPaginatedPosts = httpGetPaginatedPosts;
const httpGetPostById = async (req, res) => {
    try {
        const postId = req.params.postId;
        const post = await (0, posts_da_1.isPostExists)(postId);
        if (post) {
            return res.status(200).json(post);
        }
        else {
            return res.status(404).json({
                error: "Post not found!",
            });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            error,
        });
    }
};
exports.httpGetPostById = httpGetPostById;
const httpCreateNewPost = async (req, res) => {
    try {
        const post = req.body;
        if (!post) {
            return res.status(400).json({
                error: "Missing required post!",
            });
        }
        const publisherId = +post.publisherId;
        const cleanPostBody = domPurify.sanitize(post.body);
        let uploadSecureUrl;
        if (req.file) {
            uploadSecureUrl = await (0, cloudinary_service_1.uploadToCloudinary)(req.file.path);
        }
        const mediaUrls = [];
        typeof uploadSecureUrl !== "undefined"
            ? mediaUrls.push(uploadSecureUrl)
            : null;
        const postId = await (0, posts_da_1.createNewPost)({
            ...post,
            publisherId,
            body: cleanPostBody,
            media: mediaUrls,
        });
        return res.status(201).json({
            postId,
            publisher: post.publisher,
            publisherId: publisherId,
            gameName: post.gameName,
            title: post.title,
            body: cleanPostBody,
            media: mediaUrls,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            error,
        });
    }
};
exports.httpCreateNewPost = httpCreateNewPost;
const httpDeletePost = async (req, res) => {
    try {
        const postId = req.params.postId;
        const userId = req.userId;
        const isExists = await (0, posts_da_1.isPostExists)(postId);
        if (isExists) {
            if (isExists.publisherId !== userId) {
                return res.status(401).json({
                    error: "You are unathorized to delete this post!",
                });
            }
            await (0, posts_da_1.deletePost)(postId);
            return res.status(200).json({
                ok: `Post with ID ${postId} has been deleted!`,
            });
        }
        return res.status(404).json({
            error: "Post is not found!",
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            error,
        });
    }
};
exports.httpDeletePost = httpDeletePost;
const httpEditPost = async (req, res) => {
    try {
        const post = req.body;
        const userId = req.userId;
        const { postId, newGameName, newTitle, newContent, publisherId, newMedia } = post;
        const publisherIdNum = +publisherId;
        if (publisherIdNum !== userId) {
            return res.status(401).json({
                error: "You are unathorized to edit this post!",
            });
        }
        const cleanNewContent = domPurify.sanitize(newContent);
        let mediaUrls = [];
        if (req.file) {
            const uploadSecureUrl = await (0, cloudinary_service_1.uploadToCloudinary)(req.file.path);
            typeof uploadSecureUrl !== "undefined"
                ? mediaUrls.push(uploadSecureUrl)
                : null;
        }
        if (mediaUrls.length === 0 && newMedia?.trim() !== "") {
            mediaUrls = JSON.parse(newMedia);
        }
        const editedPost = await (0, posts_da_1.editPost)(postId, newGameName, newTitle, cleanNewContent, mediaUrls);
        if (!editedPost) {
            return res.status(500).json({
                error: "Couldn't edit post",
            });
        }
        return res.status(200).json(editedPost);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            error,
        });
    }
};
exports.httpEditPost = httpEditPost;
