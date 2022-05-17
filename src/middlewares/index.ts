import { Express, NextFunction, Request, Response } from 'express';

export function addErrorMiddleware(server: Express) {
  server.use(
    (err: TypeError, req: Request, res: Response, next: NextFunction) => {
      res.status(500).send(err.message);
    }
  );
}


export function verifyAccess(req: Request, res: Response, next: NextFunction) {
  if (req.get('X-TEST-AUTH') === 'TRUE') {
    return next()
  }

  return res.sendStatus(401);
}