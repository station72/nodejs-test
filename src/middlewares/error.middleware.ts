import { NextFunction, Request, Response } from "express";

/** Invalid data in request */
export class UnprocessableEntityError extends Error {}

/** Middleware for catching exception and wrapping it to http response*/
export function errorMiddleware(
  err: TypeError,
  req: Request,
  res: Response<{ message: string }>,
  next: NextFunction
) {
  if (err instanceof UnprocessableEntityError) {
    return res.status(422).json({
      message: err.message,
    });
  }

  return res.status(500).send({
    message: err.message,
  });
}