import Joi from 'joi'

export const userCreateSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required().min(6),
  role: Joi.string().required(),
})
