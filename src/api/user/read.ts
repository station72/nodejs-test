import { NextFunction, Request, Response } from 'express';

export const getUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const idParam: string = req.params.id;
  res.sendStatus(200);
}
