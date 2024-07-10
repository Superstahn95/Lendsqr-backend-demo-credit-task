import { Request, Response, NextFunction } from "express";
import { registerUserService } from "../services/auth.service";

export const registerUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  registerUserService(req, res, next);
};
