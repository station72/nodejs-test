import { NextFunction, Request, Response } from "express";
import { IUser, userModel } from '../../data/models/user';
import { hashPassword } from '../../tools/hash.password';
import { ObjectIdInputDto } from "./dto/objectid.input.dto";
import { IUserReadOutputDto } from "./dto/user.read.output.dto";
import { UserUpsertInputDto } from "./dto/user.upsert.input.dto";

type UserUpsertInputDtoNoId = Omit<UserUpsertInputDto, "id">;

export const updateUser = async (
  req: Request<ObjectIdInputDto, {}, UserUpsertInputDtoNoId>,
  res: Response<IUserReadOutputDto>,
  next: NextFunction
): Promise<void> => {
  const id = req.params.id;
  const dto = { ...req.body, id };
  UserUpsertInputDto.validate(dto);

  let hashPass = !dto.password ? undefined : await hashPassword(dto.password);

  const newUserData: Omit<IUser, "id" | "login"> = {
    name: dto.name,
    passwordHash: hashPass,
  };

  const result = await userModel.findOneAndUpdate(
    {
      id,
    },
    newUserData,
    {
      new: true
    }
  );

  res.status(200).json({
    id: result.id,
    login: result.login,
    name: result.name,
  });
};
