import type { Context, Next } from "hono";
import { HttpStatus } from "../types/httpStatus";
import { ApiError } from "../utils/apiResponse";
import { logger } from "../utils/logger";
import { ZodError } from "zod";

export async function errorMiddleware(ctx: Context, next: Next) {
  try {
    await next();
  } catch (err) {
    // Handle logging with proper error type checking
    if (err instanceof Error) {
      logger.error(err.message, { stack: err.stack });
    } else if (typeof err === "string") {
      logger.error(err);
    } else {
      logger.error("Unknown error occurred", { error: err });
    }

    // Handle response based on error type
    if (err instanceof ApiError) {
      ctx.status(err.statusCode);
      return ctx.json({
        success: false,
        message: err.message,
        ...(err.details && { details: err.details }),
      });
    }

    if (err instanceof ZodError) {
      ctx.status(HttpStatus.UNPROCESSABLE_ENTITY);
      return ctx.json({
        success: false,
        message: "Validation error",
        errors: err.errors,
      });
    }

    // Default error response
    ctx.status(HttpStatus.INTERNAL_SERVER_ERROR);
    return ctx.json({
      success: false,
      message: "Internal Server Error",
      ...(process.env.NODE_ENV === "development" && {
        error: err instanceof Error ? err.message : "Unknown error",
      }),
    });
  }
}