import { PostNotFoundError } from '../errors/errors.js';
import * as postRepository from '../repositories/post.repository.js';

export const createNewPost = async (title, content, author) => {
  return await postRepository.createPost({
    title,
    content,
    author,
  });
};

export const getAllPosts = async () => {
  return await postRepository.findAllPosts();
};

export const getPostsByUser = async (userId) => {
  return await postRepository.findPostsByUserId(userId);
};

export const getPostById = async (postId) => {
  const post = await postRepository.findPostById(postId);

  if (!post) {
    throw new PostNotFoundError();
  }

  return post;
};

export const updatePost = async (postId, updates) => {
  const post = await postRepository.updatePostById(postId, updates);

  if (!post) {
    throw new PostNotFoundError();
  }

  return post;
};

export const deletePost = async (postId) => {
  const post = await postRepository.deletePostById(postId);

  if (!post) {
    throw new PostNotFoundError();
  }

  return post;
};
