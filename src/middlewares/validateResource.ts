import { error } from "console";
import { NextFunction } from "express";
import Joi from "joi";
const validateResource = (
  schema: Joi.ObjectSchema,
  body: Object,
  next: NextFunction
) => {
  const result = schema.validate(body);
  if (result.error) {
    const error = result.error;
    //customize error after writing error controller
    throw new Error(error.details[0].message);
  } else {
    next();
  }
};

export default validateResource;
