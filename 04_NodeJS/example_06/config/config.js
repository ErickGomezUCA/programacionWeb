import dotenv from 'dotenv';
import Joi from 'joi';

// Load environment variables from .env.test if in test environment
if (process.env.NODE_ENV === 'test') {
  dotenv.config({ path: '.env.test' });
} else {
  dotenv.config(); // Load .env by default
}

const envSchema = Joi.object({
  PORT: Joi.number().required(),
  MONGO_URI: Joi.string().uri().required(),
  JWT_SECRET: Joi.string().required(),
})
  .required()
  .unknown(); // ? why unknown

const { error, value: envVars } = envSchema.validate(process.env);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export const config = {
  port: envVars.PORT,
  mongoUri: envVars.MONGO_URI,
  jwtSecret: envVars.JWT_SECRET,
};
