import { NextFunction, Request, Response } from 'express';

export const createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  res.sendStatus(200);
}
