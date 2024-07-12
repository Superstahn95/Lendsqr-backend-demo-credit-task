import { RequestHandler } from "express";
import validateResource from "../middlewares/validateResource";
import { depositSchema } from "../schema/deposit.schema";

export const fundSelfValidation: RequestHandler = (req, res, next) => {
  validateResource(depositSchema.fundSelf, req.body, next);
};

export const transferFundsValidation: RequestHandler = (req, res, next) => {
  validateResource(depositSchema.transferFunds, req.body, next);
};
