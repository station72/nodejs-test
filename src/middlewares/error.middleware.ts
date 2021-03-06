import { NextFunction, Request, Response } from "express";

/** Invalid data in request */
export class UnprocessableEntityError extends Error {}

/** unique data already exists */
export class UniqueDataAlreadyExistsError extends Error {}

/** Middleware for catching exception and wrapping it to http response*/
export function errorMiddleware(
  err: TypeError,
  req: Request,
  res: Response<{ message: string }>,
  next: NextFunction
): void {
  if (err instanceof UnprocessableEntityError || err instanceof UniqueDataAlreadyExistsError) {
    return void res.status(422).json({
      message: err.message,
    });
  }

  console.log(err)

  return void res.status(500).send({
    message: err.message,
  });
}
