import Joi from "joi";

export const withdrawalSchema = {
  withdrawFunds: Joi.object({
    amount: Joi.number().required(),
  }),
};
