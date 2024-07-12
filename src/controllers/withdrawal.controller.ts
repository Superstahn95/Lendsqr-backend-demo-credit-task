import { Request, Response, NextFunction } from "express";
import { withdrawFundsService } from "../services/withdrawal.service";

export const withdrawFundsController = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  withdrawFundsService(req, res, next);
};
