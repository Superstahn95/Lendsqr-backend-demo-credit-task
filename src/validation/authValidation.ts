import { RequestHandler } from "express";
import { userSchema } from "../schema/user.schema";
import validateResource from "../middlewares/validateResource";
export const signUpValidation: RequestHandler = (req, res, next) => {
  validateResource(userSchema.registerUser, req.body, next);
};
export const loginValidation: RequestHandler = (req, res, next) => {
  validateResource(userSchema.loginUser, req.body, next);
};
