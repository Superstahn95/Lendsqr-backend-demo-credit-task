import { Request } from "express";
import { User } from "./User";

export interface AuthenticatedRequestBody<T> extends Request {
  body: T;
  user?: User;
}
