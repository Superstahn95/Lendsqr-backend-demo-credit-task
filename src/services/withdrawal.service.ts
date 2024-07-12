import { Request, Response, NextFunction } from "express";
import db from "../db/db";
import asyncErrorHandler from "../utils/asyncErrorHandler";
import { User } from "../dto/types/User";
import { AuthenticatedRequestBody } from "../dto/types/AuthenticatedRequestBody";
import { WithdrawRequest } from "../dto/WithdrawRequest";
import { BadRequestError } from "../errors/BadRequestError";

export const withdrawFundsService = asyncErrorHandler(
  async (
    req: AuthenticatedRequestBody<WithdrawRequest>,
    res: Response,
    next: NextFunction
  ) => {
    //debit user account
    const { amount } = req.body;
    if (!req.user) {
      const err = new BadRequestError("Unauthenticated");
      return next(err);
    }
    // check if amount applied is greater than balance
    if (amount > req.user?.balance) {
      const err = new BadRequestError(
        "Your balance is too low for this transaction"
      );
      return next(err);
    }
    await db<User>("users").where({ id: req.user?.id }).update({});
    res.status(200).json({ message: "withdrawal successful" });
  }
);
