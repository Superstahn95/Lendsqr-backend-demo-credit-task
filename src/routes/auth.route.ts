import { Router } from "express";
import {
  registerUserController,
  checkSupertestAuthController,
  loginUserController,
} from "../controllers/auth.cntroller";
import {
  signUpValidation,
  loginValidation,
} from "../validation/authValidation";

const router = Router();

router.post("/register", signUpValidation, registerUserController);
router.post("/login", loginValidation, loginUserController);
router.post("/test", checkSupertestAuthController);

export default router;
