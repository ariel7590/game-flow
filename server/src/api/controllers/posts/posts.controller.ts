import { RequestHandler, Response } from "express";
import { uploadToCloudinary } from "../../services/cloudinary.service";
import {
  getAllPosts,
  createNewPost,
  deletePost,
  isPostExists,
  editPost,
  getPaginatedPosts,
  countNumberOfPosts,
} from "../../data-access/posts/posts.da";
import { IPostForEditing, IReceivedPostContent } from "../../types/posts.types";
import { AuthenticatedRequest } from "../../types/jwt.types";
import { paginate } from "../../utils/pagination";
import DOMPurify from "dompurify";
import { JSDOM } from 'jsdom';

const window = new JSDOM('').window;
const domPurify = DOMPurify(window);

export const httpGetAllPosts: RequestHandler = async (req, res) => {
  //for testing only, I can remove it later
  const posts = await getAllPosts();
  return res.status(200).json(posts);
};

export const httpGetPaginatedPosts: RequestHandler = async (req, res) => {
  try {
    const page = req.query.page as string;
    const paginationData = paginate(+page);
    const posts = await getPaginatedPosts(paginationData);
    if (!posts) {
      return res.status(404).json({
        error: "Posts were not found!",
      });
    }
    const totalNumOfPosts = await countNumberOfPosts();
    const totalNumOfPages = totalNumOfPosts
      ? Math.ceil(totalNumOfPosts / 10)
      : 1;
    return res.status(200).json({ posts, pages: totalNumOfPages });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error,
    });
  }
};

export const httpGetPostById: RequestHandler = async (req, res) => {
  try {
    const postId = req.params.postId;
    const post = await isPostExists(postId);
    if (post) {
      return res.status(200).json(post);
    } else {
      return res.status(404).json({
        error: "Post not found!",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error,
    });
  }
};

export const httpCreateNewPost: RequestHandler = async (req, res) => {
  try {
    const post = req.body as IReceivedPostContent;
    if (!post) {
      return res.status(400).json({
        error: "Missing required post!",
      });
    }
    const publisherId = +post.publisherId;
    const cleanPostBody = domPurify.sanitize(post.body);
    let uploadSecureUrl: string | undefined;
    if (req.file) {
      uploadSecureUrl = await uploadToCloudinary(req.file.path);
    }
    const mediaUrls: string[] = [];
    typeof uploadSecureUrl !== "undefined"
      ? mediaUrls.push(uploadSecureUrl)
      : null;
    const postId = await createNewPost({
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
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error,
    });
  }
};

export const httpDeletePost = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const postId = req.params.postId;
    const userId = req.userId as number;
    const isExists = await isPostExists(postId);
    if (isExists) {
      if (isExists.publisherId !== userId) {
        return res.status(401).json({
          error: "You are unathorized to delete this post!",
        });
      }
      await deletePost(postId);
      return res.status(200).json({
        ok: `Post with ID ${postId} has been deleted!`,
      });
    }
    return res.status(404).json({
      error: "Post is not found!",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error,
    });
  }
};

export const httpEditPost = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const post = req.body as IPostForEditing;
    const userId = req.userId as number;
    const { postId, newGameName, newTitle, newContent, publisherId, newMedia } =
      post;
    const publisherIdNum = +publisherId;
    if (publisherIdNum !== userId) {
      return res.status(401).json({
        error: "You are unathorized to edit this post!",
      });
    }
    const cleanNewContent = domPurify.sanitize(newContent);
    let mediaUrls: string[] = [];
    if (req.file) {
      const uploadSecureUrl = await uploadToCloudinary(req.file.path);
      typeof uploadSecureUrl !== "undefined"
        ? mediaUrls.push(uploadSecureUrl)
        : null;
    }
    if (mediaUrls.length === 0 && newMedia?.trim() !== "") {
      mediaUrls = JSON.parse(newMedia);
    }
    const editedPost = await editPost(
      postId,
      newGameName,
      newTitle,
      cleanNewContent,
      mediaUrls
    );
    if (!editedPost) {
      return res.status(500).json({
        error: "Couldn't edit post",
      });
    }
    return res.status(200).json(editedPost);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error,
    });
  }
};
