import { CustomError } from "../utils/customError";

export class AuthenticationError extends CustomError {
  statusCode = 401;
  constructor(message: string) {
    super(message);
    this.message = message;
    Object.setPrototypeOf(this, AuthenticationError.prototype);
  }
  serialize(): { message: string } {
    return { message: this.message };
  }
}
