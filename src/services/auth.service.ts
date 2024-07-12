import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import db from "../db/db";
import { CreateUser } from "../dto/CreateUser.dto";
import { User } from "../dto/types/User";

export const registerUserService = async (
  req: Request<{}, {}, CreateUser>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, firstName, lastName, password, confirmPassword } = req.body;
    const existingUser = await db("users").where({ email }).first();
    if (!existingUser) {
      //return a custom error
      return;
    }
    if (password !== confirmPassword) {
      //return custom error
      return;
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
