import { ErrorRequestHandler, Request, Response, NextFunction } from "express";
import { CustomError } from "../utils/customError";

const globalErrorHandlerMiddleware: ErrorRequestHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof CustomError) {
    return res.status(error.statusCode).json(error.serialize());
  }
  res.status(500).json({ message: "something went wrong" });
};

export default globalErrorHandlerMiddleware;
