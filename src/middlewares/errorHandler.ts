import type { Request, Response, NextFunction } from "express";
import { HttpError } from "../exceptions/httperror.exception";
 

const statusText = (status: number): string => {
  if (status >= 500) return "Internal Server Error";
  if (status === 400) return "Bad Request";
  if (status === 401) return "Unauthorized";
  if (status === 403) return "Forbidden";
  if (status === 404) return "Not Found";
  if (status === 409) return "Conflict";
  if (status === 422) return "Unprocessable Entity";
  return "Error";
};

export function errorHandler(
  err: unknown,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction
) {
  const traceId = req.headers["x-request-id"]?.toString(); // optional correlation id

  // Default
  let status = 500;
  let message = "Unexpected error";

  // Your custom HttpError
  if (err instanceof HttpError) {
    status = err.statusCode;
    message = err.message;
  } else if (err instanceof Error) {
    // fallback for normal Error
    message = err.message || message;
  }

  // Avoid leaking internal error messages for 500 in production
  if (status >= 500 && process.env.NODE_ENV === "production") {
    message = "Internal Server Error";
  }

  return res.status(status).json({
    timestamp: new Date().toISOString(),
    status,
    error: statusText(status),
    message,
    path: req.originalUrl,
    traceId
  });
}
