import { NextFunction, Request, Response } from "express";

/** Test auth middleware */
export function verifyAccessMiddleware(req: Request, res: Response, next: NextFunction) {
  if (req.get("X-TEST-AUTH") === "TRUE") {
    return next();
  }

  return res.sendStatus(401);
}
