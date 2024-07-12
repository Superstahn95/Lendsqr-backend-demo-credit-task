import { Response, NextFunction } from "express";
import {
  fundSelfService,
  transferFundService,
} from "../services/deposit.service";
import { AuthenticatedRequestBody } from "../dto/types/AuthenticatedRequestBody";
import { DepositRequest } from "../dto/DepositRequest";

export const fundSelfController = (
  req: AuthenticatedRequestBody<DepositRequest>,
  res: Response,
  next: NextFunction
) => {
  fundSelfService(req, res, next);
};

export const transferFundController = (
  req: AuthenticatedRequestBody<DepositRequest>,
  res: Response,
  next: NextFunction
) => {
  transferFundService(req, res, next);
};
