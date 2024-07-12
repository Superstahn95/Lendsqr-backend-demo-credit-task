import { RequestHandler } from "express";
import validateResource from "../middlewares/validateResource";
import { withdrawalSchema } from "../schema/withdrawal.schema";

export const withdrawFundsValidation: RequestHandler = (req, res, next) => {
  validateResource(withdrawalSchema.withdrawFunds, req.body, next);
};
