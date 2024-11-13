import Post from '../models/post.model.js';

export const createPost = async (postData) => {
  const post = new Post(postData);
  return await post.save();
};

export const findAllPosts = async () => {
  return await Post.find().populate('author', 'username email');
};

export const findPostsByUserId = async (userId) => {
  return await Post.find({ author: userId });
};

export const findPostById = async (postId) => {
  return await Post.findById(postId).populate('author', 'username email');
};

export const updatePostById = async (postId, updates) => {
  return await Post.findByIdAndUpdate(postId, updates, { new: true });
};

export const deletePostById = async (postId) => {
  return await Post.findByIdAndDelete(postId);
};
