import { Request, Response, NextFunction } from "express";

/**
 * 
 * Boilerplate error-handling middleware pattern
 * req & next only required to indicate error handler signature 
 * @emits general error with status code 400 and err.message or default error string
 */

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(err); // logging
  const status = err.status || 400; // default bad request
  res.status(status).json({ message: err.message || "Something went wrong" });
}
