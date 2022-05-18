import { NextFunction, Request, Response } from "express";
import { userModel } from "../../data";
import { ObjectIdInputDto } from "./dto";

export const deleteUser = async (
  req: Request<ObjectIdInputDto>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  ObjectIdInputDto.validate(req.params);

  const { id } = req.params;
  const deleteResult = await userModel.deleteOne({
    _id: id,
  });

  res.status(200).json({
    deletedCount: deleteResult.deletedCount,
  });
};
