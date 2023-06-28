import Joi from 'joi';

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

export const userCreateSchema = Joi.object({
  email: Joi.string().required(),
  firstName: Joi.string().min(2).required(),
  lastName: Joi.string().min(1).required(),
  password: Joi.string().min(6).required(),
  confirmPassword: Joi.string().min(6).required(),
});
