import { Router } from "express";
import {
  registerUserController,
  checkSupertestAuthController,
} from "../controllers/auth.cntroller";
import { signUpValidation } from "../validation/signupvalidation";

const router = Router();

router.post("/register", signUpValidation, registerUserController);
router.post("/test", checkSupertestAuthController);

export default router;
