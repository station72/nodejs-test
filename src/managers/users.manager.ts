import { ObjectId } from "mongoose";
import { UserCreateInputDto } from "../api/user/dto/user.create.input.dto";
import { IUser, userModel } from "../data/models/user";
import { UniqueDataAlreadyExistsError } from "../middlewares/error.middleware";
import { hashPassword } from "../tools/hash.password";

export interface IResult<Ok> {
  result: Ok;
  error: string;
}

/** all business logic with users */
export class UsersManager {
  /** Create new user */
  async createUser(
    dto: UserCreateInputDto
  ): Promise<Array<IUser & { id: ObjectId }>> {
    try {
      UserCreateInputDto.validate(dto);

      const { login, name, password } = dto;
      const passwordHash = await hashPassword(password);

      //TODO: move to repo
      const createdUser = await userModel.create([
        {
          login,
          name,
          passwordHash: passwordHash,
        },
      ]);

      return createdUser;
    } catch (error) {
      if (error?.code === 11000 && error?.keyValue?.login) {
        throw new UniqueDataAlreadyExistsError("login already exists");
      }

      throw error;
    }
  }
}
