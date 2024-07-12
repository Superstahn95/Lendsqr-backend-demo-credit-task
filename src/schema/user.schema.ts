import Joi from "joi";
export const userSchema = {
  registerUser: Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().email().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
    confirmPassword: Joi.string()
      .valid(Joi.ref("password"))
      .required()
      .strict(),
  }),
  loginUser: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
};
