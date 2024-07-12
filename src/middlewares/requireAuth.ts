import { Request, Response, NextFunction } from "express";
import db from "../db/db";
import { User } from "../dto/types/User";
import asyncErrorHandler from "../utils/asyncErrorHandler";
import { AuthenticationError } from "../errors/AuthenticationError";

interface IAuthRequest extends Request {
  user?: User;
}

export const requireAuth = asyncErrorHandler(
  async (req: IAuthRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization; //Bearer Token
    const token = authHeader?.split(" ")[1];
    if (!token) {
      const err = new AuthenticationError("unauthenticated");
      next(err);
    }
    const user = await db<User>("users").where({ token }).first();
    if (!user) {
      const err = new AuthenticationError("unauthenticated");
      next(err);
    }
    req.user = user;
    next();
  }
);
