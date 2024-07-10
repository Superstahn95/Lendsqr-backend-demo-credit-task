import { Router } from "express";
import { registerUserController } from "../controllers/auth.cntroller";

const router = Router();

router.post("/register", registerUserController);

export default router;
