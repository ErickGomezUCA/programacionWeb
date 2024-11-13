// errors.js
export class UserAlreadyExistsError extends Error {
  constructor(message = 'User already exists') {
    super(message);
    this.name = 'UserAlreadyExistsError';
  }
}

export class InvalidCredentialsError extends Error {
  constructor(message = 'Invalid credentials') {
    super(message);
    this.name = 'InvalidCredentialsError';
  }
}

export class UserNotFoundError extends Error {
  constructor(message = 'User not found') {
    super(message);
    this.name = 'UserNotFoundError';
  }
}

export class PostNotFoundError extends Error {
  constructor(message = 'Post not found') {
    super(message);
    this.name = 'PostNotFoundError';
  }
}
