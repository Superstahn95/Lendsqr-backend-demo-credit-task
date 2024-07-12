import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import db from "../db/db";
import { CreateUser } from "../dto/CreateUser.dto";
import { LoginUser } from "../dto/LoginUser.dto";
import { User } from "../dto/types/User";
import asyncErrorHandler from "../utils/asyncErrorHandler";
import { AuthenticationError } from "../errors/AuthenticationError";
import { BadRequestError } from "../errors/BadRequestError";

export const registerUserService = async (
  req: Request<{}, {}, CreateUser>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, firstName, lastName, password, confirmPassword } = req.body;
    const existingUser = await db("users").where({ email }).first();
    if (!existingUser) {
      const err = new BadRequestError("user with this email already exists");
      return next(err);
    }
    const salt = await bcrypt.genSalt(10);
    const hashPwd = await bcrypt.hash(password, salt);
    //generate unique wallet id
    const walletId = uuidv4();
    const [id] = await db<User>("users").insert({
      email,
      first_name: firstName,
      last_name: lastName,
      password: hashPwd,
      wallet_id: walletId,
    });
    const createdUser = await db<User>("users").where({ id });
    res.status(201).json({
      message: "registration succesful",
      user: createdUser,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const checkSupertestAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { testProperty } = req.body;
  if (!testProperty) {
    return res.status(400).json({
      message: "test property not defined",
    });
  }
  res.status(200).json({
    message: "this test should return successful",
  });
};

export const loginService = asyncErrorHandler(
  async (
    req: Request<{}, {}, LoginUser>,
    res: Response,
    next: NextFunction
  ) => {
    const { email, password } = req.body;
    const user = await db<User>("users").where({ email }).first();
    if (!user) {
      const err = new AuthenticationError("Invalid credentials");
      return next(err);
    }

    //compare password
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      const err = new AuthenticationError("Invalid credentials");
      return next(err);
    }
    const accessToken = uuidv4();
    await db<User>("users").where({ email }).update({ token: accessToken });
    res.status(200).json({ token: accessToken });
  }
);
