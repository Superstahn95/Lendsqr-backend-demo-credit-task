import express from "express";
import {
  fundSelfController,
  transferFundController,
} from "../controllers/deposit.controller";
import {
  fundSelfValidation,
  transferFundsValidation,
} from "../validation/depositValidation";

const router = express.Router();

router.post("/fund", fundSelfValidation, fundSelfController);
router.post("/transfer", transferFundsValidation, transferFundController);

export default router;
