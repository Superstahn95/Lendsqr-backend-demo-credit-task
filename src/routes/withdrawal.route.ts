import express from "express";
import { withdrawFundsController } from "../controllers/withdrawal.controller";

const router = express.Router();

router.post("/", withdrawFundsController);

export default router;
