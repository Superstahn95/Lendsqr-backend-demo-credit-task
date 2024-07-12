import express from "express";
import { withdrawFundsController } from "../controllers/withdrawal.controller";
import { withdrawFundsValidation } from "../validation/withdrawalValidation";

const router = express.Router();

router.post("/", withdrawFundsValidation, withdrawFundsController);

export default router;
