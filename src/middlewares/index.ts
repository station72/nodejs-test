import { NextFunction, Request, Response } from 'express';

export function errorMiddleware (err: TypeError, req: Request, res: Response, next: NextFunction) {
    return res.status(500).send(err.message);
}


export function verifyAccess(req: Request, res: Response, next: NextFunction) {
  if (req.get('X-TEST-AUTH') === 'TRUE') {
    return next()
  }

  return res.sendStatus(401);
}