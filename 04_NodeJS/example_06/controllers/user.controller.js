import * as userService from '../services/user.service.js';
import {
  UserAlreadyExistsError,
  InvalidCredentialsError,
  UserNotFoundError,
} from '../errors/errors.js';
import SuccessResponseBuilder from '../helpers/success-response-builder.js';
import ErrorResponseBuilder from '../helpers/error-response-builder.js';

// Registro de usuario
export const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const result = await userService.registerUser({
      username,
      email,
      password,
    });

    res
      .status(201)
      .json(
        new SuccessResponseBuilder()
          .setStatus(201)
          .setMessage('User created successfully')
          .setContent({ result })
          .build()
      );
  } catch (error) {
    // Detecta errores de clave duplicada en MongoDB
    if (error.code === 11000) {
      const field = Object.keys(error.keyValue)[0];
      const value = error.keyValue[field];
      return res
        .status(400)
        .json(
          new ErrorResponseBuilder()
            .setStatus(400)
            .setMessage(`The ${field} '${value}' is already in use.`)
            .build()
        );
    }

    // Maneja la excepción personalizada para usuario ya existente
    if (error instanceof UserAlreadyExistsError) {
      return res
        .status(400)
        .json(
          new ErrorResponseBuilder()
            .setStatus(400)
            .setMessage('Bad request')
            .setError(error.message)
            .build()
        );
    }

    // Maneja otros errores internos del servidor
    res
      .status(500)
      .json(
        new ErrorResponseBuilder()
          .setStatus(500)
          .setMessage('Error registering user')
          .setError(error.message)
          .build()
      );
  }
};

// Login de usuario
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const token = await userService.loginUser({ email, password });
    res
      .status(200)
      .json(
        new SuccessResponseBuilder()
          .setStatus(200)
          .setMessage('Login successful')
          .setContent({ token })
          .build()
      );
  } catch (error) {
    // Maneja la excepción personalizada para credenciales inválidas
    if (error instanceof InvalidCredentialsError) {
      return res
        .status(400)
        .json(
          new ErrorResponseBuilder()
            .setStatus(400)
            .setMessage('Bad request')
            .setError(error.message)
            .build()
        );
    }

    // Maneja otros errores internos del servidor
    res
      .status(500)
      .json(
        new ErrorResponseBuilder()
          .setStatus(500)
          .setMessage('Error logging in')
          .setError(error.message)
          .build()
      );
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res
      .status(200)
      .json(
        new SuccessResponseBuilder()
          .setStatus(200)
          .setMessage('All users retrieved')
          .setContent({ users })
          .build()
      );
  } catch (error) {
    res
      .status(500)
      .json(
        new ErrorResponseBuilder()
          .setStatus(500)
          .setMessage('Error retrieving users')
          .setError(error.message)
          .build()
      );
  }
};

export const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await userService.getUserById(id);
    res
      .status(200)
      .json(
        new SuccessResponseBuilder()
          .setStatus(200)
          .setMessage('User retrieved')
          .setContent({ user })
          .build()
      );
  } catch (error) {
    if (error instanceof UserNotFoundError) {
      return res
        .status(404)
        .json(
          new ErrorResponseBuilder()
            .setStatus(404)
            .setMessage('User not found')
            .setError(error.message)
            .build()
        );
    }

    res
      .status(500)
      .json(
        new ErrorResponseBuilder()
          .setStatus(500)
          .setMessage('Error retrieving user')
          .setError(error.message)
          .build()
      );
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { username, email, password } = req.body;

  try {
    const user = await userService.updateUser(id, {
      username,
      email,
      password,
    });
    res
      .status(200)
      .json(
        new SuccessResponseBuilder()
          .setStatus(200)
          .setMessage('User updated')
          .setContent({ user })
          .build()
      );
  } catch (error) {
    if (error instanceof UserNotFoundError) {
      return res
        .status(404)
        .json(
          new ErrorResponseBuilder()
            .setStatus(404)
            .setMessage('User not found')
            .setError(error.message)
            .build()
        );
    }

    res
      .status(500)
      .json(
        new ErrorResponseBuilder()
          .setStatus(500)
          .setMessage('Error updating user')
          .setError(error.message)
          .build()
      );
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await userService.deleteUser(id);
    res
      .status(200)
      .json(
        new SuccessResponseBuilder()
          .setStatus(200)
          .setMessage('User deleted')
          .setContent({ user })
          .build()
      );
  } catch (error) {
    if (error instanceof UserNotFoundError) {
      return res
        .status(404)
        .json(
          new ErrorResponseBuilder()
            .setStatus(404)
            .setMessage('User not found')
            .setError(error.message)
            .build()
        );
    }

    res
      .status(500)
      .json(
        new ErrorResponseBuilder()
          .setStatus(500)
          .setMessage('Error deleting user')
          .setError(error.message)
          .build()
      );
  }
};
