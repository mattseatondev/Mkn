import { Request, Response, NextFunction } from "express";

/**
 * Middleware for handling "not found" errors.
 * Called via next() when a route cannot find the requested entity.
 * @emits error response with code 404 (not found)
 */

export function notFoundHandler(req: Request, res: Response, next: NextFunction) {
  res.status(404).json({ message: `Route ${req.originalUrl} not found` });
}
