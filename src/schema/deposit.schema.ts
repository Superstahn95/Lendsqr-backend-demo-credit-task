import Joi from "joi";

export const depositSchema = {
  fundSelf: Joi.object({
    amount: Joi.number().required(),
  }),
  transferFunds: Joi.object({
    amount: Joi.number().required(),
    walletId: Joi.string().required(),
  }),
};
