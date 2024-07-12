import { Request, Response, NextFunction } from "express";
import {
  registerUserService,
  checkSupertestAuth,
} from "../services/auth.service";

export const registerUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  registerUserService(req, res, next);
};
export const checkSupertestAuthController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  checkSupertestAuth(req, res, next);
};
