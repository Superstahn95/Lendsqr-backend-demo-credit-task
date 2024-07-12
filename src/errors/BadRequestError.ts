import { CustomError } from "../utils/customError";

export class BadRequestError extends CustomError {
  // statusCode = 400;
  statusCode = 400;
  constructor(message: string) {
    super(message);
    this.message = message;
  }
  serialize(): { message: string } {
    return { message: this.message };
  }
}
