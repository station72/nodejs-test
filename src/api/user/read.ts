import { NextFunction, Request, Response } from "express";
import { userModel } from "../../data";
import { IUserReadOutputDto, ObjectIdInputDto } from "./dto";

export const getUser = async (
  req: Request<ObjectIdInputDto>,
  res: Response<IUserReadOutputDto>,
  next: NextFunction
): Promise<void> => {
  ObjectIdInputDto.validate(req.params);

  const user = await userModel.findById(req.params.id);
  const { name, login } = user;

  res.status(200).json({
    id: user.id,
    name,
    login,
  });
};
