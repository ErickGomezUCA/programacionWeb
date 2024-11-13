import express from 'express';
import * as postController from '../controllers/post.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';
import { postValidationRules } from '../validators/post.validator.js';
import validate from '../middlewares/validation.middleware.js';

const router = express.Router();

// Rutas de posts con validación de datos
router.post(
  '/',
  authMiddleware,
  postValidationRules,
  validate,
  postController.createPost
);
router.get('/', postController.getAllPosts);
router.get('/user', authMiddleware, postController.getUserPosts);
router.get('/:id', postController.getPostById);
router.put(
  '/:id',
  authMiddleware,
  postValidationRules,
  validate,
  postController.updatePost
);
router.delete('/:id', authMiddleware, postController.deletePost);

export default router;
