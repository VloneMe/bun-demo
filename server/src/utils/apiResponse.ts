import { type Context } from "hono";
import { HttpStatus } from "../types/httpStatus";

export class ApiError extends Error {
  constructor(
    public override message: string,
    public statusCode: HttpStatus = HttpStatus.BAD_REQUEST,
    public details?: any
  ) {
    super(message);
  }
}

export class ApiResponse {
  static success(
    ctx: Context,
    data: any,
    message: string = "Success",
    statusCode: HttpStatus = HttpStatus.OK
  ) {
    ctx.status(statusCode);
    return ctx.json({
      success: true,
      message,
      data,
    });
  }

  static error(
    ctx: Context,
    message: string = "An error occurred",
    statusCode: HttpStatus = HttpStatus.BAD_REQUEST,
    details?: any
  ) {
    ctx.status(statusCode);
    return ctx.json({
      success: false,
      message,
      ...(details && { details }),
    });
  }
}