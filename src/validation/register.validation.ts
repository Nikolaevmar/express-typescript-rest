import { Joi } from "express-validation";

export const RegisterValidation = Joi.object({
  first_name: Joi.string().required().min(2).max(10),
  last_name: Joi.string().required().min(2).max(10),
  email: Joi.string().email().required().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'bg'] } }),
  image: Joi.string(),
  password: Joi.string().required().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
  repass: Joi.ref('password')
});
