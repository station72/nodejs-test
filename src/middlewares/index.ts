import { NextFunction, Request, Response } from "express";
import { UnprocessableEntityError } from "./errors";

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

export function verifyAccess(req: Request, res: Response, next: NextFunction) {
  if (req.get("X-TEST-AUTH") === "TRUE") {
    return next();
  }

  return res.sendStatus(401);
}
