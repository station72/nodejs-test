import { NextFunction, Request, Response } from "express";
import { userModel } from "../../data";
import { ObjectIdInputDto } from './dto/objectid.input.dto';
import { IUserReadOutputDto } from './dto/user.read.output.dto';

export const getUser = async (
  req: Request<ObjectIdInputDto>,
  res: Response<IUserReadOutputDto>,
  next: NextFunction
): Promise<void> => {
  ObjectIdInputDto.validate(req.params);

  const user = await userModel.findById(req.params.id);
  if (!user) {
    res.sendStatus(404);
    return;
  }
  const { name, login } = user;

  res.status(200).json({
    id: user.id,
    name,
    login,
  });
};
