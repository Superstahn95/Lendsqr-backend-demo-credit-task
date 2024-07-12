import { NextFunction } from "express";
import Joi from "joi";
import { BadRequestError } from "../errors/BadRequestError";
const validateResource = (
  schema: Joi.ObjectSchema,
  body: Object,
  next: NextFunction
) => {
  const result = schema.validate(body);
  if (result.error) {
    const error = result.error;
    //customize error after writing error controller
    const err = new BadRequestError(error.details[0].message);
    next(err);
  } else {
    next();
  }
};
export default validateResource;
