import * as userRepository from '../repositories/user.repository.js';
import jwt from 'jsonwebtoken';
import { config } from '../config/config.js';
import {
  UserAlreadyExistsError,
  InvalidCredentialsError,
  UserNotFoundError,
} from '../errors/errors.js';

export const registerUser = async ({ username, email, password }) => {
  const userExists = await userRepository.findUserByEmail(email);
  if (userExists) {
    throw new UserAlreadyExistsError();
  }

  const newUser = await userRepository.createUser({
    username,
    email,
    password,
  });
  return newUser;
};

export const loginUser = async ({ email, password }) => {
  const user = await userRepository.findUserByEmail(email);
  if (!user || !(await user.comparePassword(password))) {
    throw new InvalidCredentialsError();
  }

  const token = jwt.sign(
    { id: user._id, username: user.username },
    config.jwtSecret,
    {
      expiresIn: '1h',
    }
  );

  return token;
};

export const getAllUsers = async () => {
  return await userRepository.findAllUsers();
};

export const getUserById = async (id) => {
  const user = await userRepository.findUserById(id);

  if (!user) {
    throw new UserNotFoundError();
  }

  return user;
};

export const updateUser = async (id, { username, email, password }) => {
  const userExists = await userRepository.findUserById(id);

  if (!userExists) {
    throw new UserNotFoundError();
  }

  return await userRepository.updateUserById(id, {
    username,
    email,
    password,
  });
};

export const deleteUser = async (id) => {
  const userExists = await userRepository.findUserById(id);

  if (!userExists) {
    throw new UserNotFoundError();
  }

  return await userRepository.deleteUserById(id);
};
