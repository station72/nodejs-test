import { NextFunction, Request, Response } from 'express';

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  const idParam: string = req.params['id'];
  return res.sendStatus(200);
}
