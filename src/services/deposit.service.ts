import asyncErrorHandler from "../utils/asyncErrorHandler";
import db from "../db/db";
import { NextFunction, Request, Response } from "express";
import { DepositRequest } from "../dto/DepositRequest";
import { AuthenticatedRequestBody } from "../dto/types/AuthenticatedRequestBody";
import { BadRequestError } from "../errors/BadRequestError";
import { User } from "../dto/types/User";

export const fundSelfService = asyncErrorHandler(
  async (
    req: AuthenticatedRequestBody<DepositRequest>,
    res: Response,
    next: NextFunction
  ) => {
    const { amount } = req.body;
    if (!req.user) {
      const err = new BadRequestError("unauthorized");
      return next(err);
    }
    const newBalance = req.user?.balance + amount;
    await db<User>("users")
      .where({ id: req.user?.id })
      .update({ balance: newBalance });
    res.status(200).json({ message: `Your account has been topped up` });
  }
);

export const transferFundService = asyncErrorHandler(
  async (
    req: AuthenticatedRequestBody<DepositRequest>,
    res: Response,
    next: NextFunction
  ) => {
    const { amount, walletId } = req.body;
    if (!req.user) {
      const err = new BadRequestError("unauthorized");
      return next(err);
    }
    //check if amount sent in is greater than the balance of the user trying to transfer funds
    if (amount > req.user?.balance) {
      const err = new BadRequestError(
        "Your balance is too low for this transaction"
      );
      return next(err);
    }
    //check if second part user exists
    const receiver = await db<User>("users")
      .where({ wallet_id: walletId })
      .first();
    if (!receiver) {
      const err = new BadRequestError("receiver not found");
      return next(err);
    } else {
      const newBalance = receiver.balance + amount;
      const newSelfBalance = req.user?.balance - amount;
      //debit user sending funds
      await db<User>("users")
        .where({ id: req.user?.id })
        .update({ balance: newSelfBalance });
      await db<User>("users")
        .where({ wallet_id: walletId })
        .update({ balance: newBalance });
      res.status(200).json({ message: "transfer successful" });
    }
  }
);
