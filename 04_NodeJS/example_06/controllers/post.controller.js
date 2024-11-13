import * as postService from '../services/post.service.js';
import SuccessResponseBuilder from '../helpers/success-response-builder.js';
import ErrorResponseBuilder from '../helpers/error-response-builder.js';
import { PostNotFoundError } from '../errors/errors.js';

export const createPost = async (req, res) => {
  const { title, content } = req.body;
  const author = req.user.id;

  try {
    const result = await postService.createNewPost(title, content, author);
    res
      .status(201)
      .json(
        new SuccessResponseBuilder()
          .setStatus(201)
          .setMessage('Post created successfully')
          .setContent({ newPost: result })
          .build()
      );
  } catch (error) {
    res
      .status(500)
      .json(
        new ErrorResponseBuilder()
          .setStatus(500)
          .setMessage('Error creating post')
          .setError(error.message)
          .build()
      );
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const posts = await postService.getAllPosts();
    res
      .status(200)
      .json(
        new SuccessResponseBuilder()
          .setStatus(200)
          .setMessage('Posts fetched successfully')
          .setContent({ posts })
          .build()
      );
  } catch (error) {
    res
      .status(500)
      .json(
        new ErrorResponseBuilder()
          .setStatus(500)
          .setMessage('Error fetching posts')
          .setError(error.message)
          .build()
      );
  }
};

export const getUserPosts = async (req, res) => {
  const userId = req.user.id;

  try {
    const posts = await postService.getPostsByUser(userId);
    res
      .status(200)
      .json(
        new SuccessResponseBuilder()
          .setStatus(200)
          .setMessage('User posts fetched successfully')
          .setContent({ posts })
          .build()
      );
  } catch (error) {
    res
      .status(500)
      .json(
        new ErrorResponseBuilder()
          .setStatus(500)
          .setMessage('Error fetching user posts')
          .setError(error.message)
          .build()
      );
  }
};

export const getPostById = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await postService.getPostById(id);
    res
      .status(200)
      .json(
        new SuccessResponseBuilder()
          .setStatus(200)
          .setMessage('Post fetched successfully')
          .setContent({ post })
          .build()
      );
  } catch (error) {
    if (error instanceof PostNotFoundError) {
      return res
        .status(404)
        .json(
          new ErrorResponseBuilder()
            .setStatus(404)
            .setMessage('Post not found')
            .setError(error.message)
            .build()
        );
    }

    res
      .status(500)
      .json(
        new ErrorResponseBuilder()
          .setStatus(500)
          .setMessage('Error fetching post')
          .setError(error.message)
          .build()
      );
  }
};

export const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  try {
    const post = await postService.updatePost(id, { title, content });
    res
      .status(200)
      .json(
        new SuccessResponseBuilder()
          .setStatus(200)
          .setMessage('Post updated successfully')
          .setContent({ post })
          .build()
      );
  } catch (error) {
    if (error instanceof PostNotFoundError) {
      return res
        .status(404)
        .json(
          new ErrorResponseBuilder()
            .setStatus(404)
            .setMessage('Post not found')
            .setError(error.message)
            .build()
        );
    }

    res
      .status(500)
      .json(
        new ErrorResponseBuilder()
          .setStatus(500)
          .setMessage('Error updating post')
          .setError(error.message)
          .build()
      );
  }
};

export const deletePost = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await postService.deletePost(id);
    res
      .status(200)
      .json(
        new SuccessResponseBuilder()
          .setStatus(200)
          .setMessage('Post deleted')
          .setContent({ post })
          .build()
      );
  } catch (error) {
    if (error instanceof PostNotFoundError) {
      return res
        .status(404)
        .json(
          new ErrorResponseBuilder()
            .setStatus(404)
            .setMessage('Post not found')
            .setError(error.message)
            .build()
        );
    }

    res
      .status(500)
      .json(
        new ErrorResponseBuilder()
          .setStatus(500)
          .setMessage('Error deleting post')
          .setError(error.message)
          .build()
      );
  }
};
