import express from 'express';
import * as userController from '../controllers/user.controller.js';
import {
  userLoginValidationRules,
  userRegisterValidationRules,
} from '../validators/user.validator.js';
import validate from '../middlewares/validation.middleware.js';

const router = express.Router();

// Ruta de registro con validación de datos
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.post(
  '/register',
  userRegisterValidationRules,
  validate,
  userController.register
);
router.post('/login', userLoginValidationRules, validate, userController.login);
router.put(
  '/:id',
  userRegisterValidationRules,
  validate,
  userController.updateUser
);
router.delete('/:id', userController.deleteUser);

export default router;
