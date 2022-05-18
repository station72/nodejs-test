import { NextFunction, Request, Response } from "express";
import { userModel } from "../../data";
import { hashPassword } from "./common";

import { UserCreateInputDto } from "./dto/user.create.input.dto";

export const createUser = async (
  req: Request<{}, {}, UserCreateInputDto, {}, {}>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  UserCreateInputDto.validate(req.body);

  const { login, name, password } = req.body;
  const passwordHash = await hashPassword(password);

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
      );

    res.json({
      id: createdUser[0].id,
    });
  } catch (error) {
    if (error?.code === 11000 && error?.keyValue?.login) {
      throw new Error("login already exists");
    }
    throw error;
  }
};
