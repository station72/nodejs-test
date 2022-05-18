import { NextFunction, Request, Response } from "express";
import { userModel } from "../../data";
import bcryptjs from "bcryptjs";
import { UserCreateInputDto } from "./dto";
import { salt } from "./common";

export const createUser = async (
  req: Request<{}, {}, UserCreateInputDto, {}, {}>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  UserCreateInputDto.validate(req.body);

  const { login, name, password } = req.body;
  const passwordHash = await bcryptjs.hash(password, salt);

  try {
    const createdUser = await userModel.create([
      {
        login,
        name,
        passwordHash: passwordHash,
      },
    ]);

    res
      .status(201)
      .setHeader(
        "Location",
        `http://localhost:3334/api/users/${createdUser[0]._id}`
      )
      .send();

  } catch (error) {
    if (error?.code === 11000 && error?.keyValue?.login) {
      throw new Error("login already exists");
    }
    throw error;
  }
};
