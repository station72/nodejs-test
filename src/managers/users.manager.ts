import "reflect-metadata";
import { injectable } from "inversify";
import { ObjectId } from "mongoose";
import { UserCreateInputDto } from "../api/user/dto/user.create.input.dto";
import { IUser, userModel } from "../data/models/user";
import { UniqueDataAlreadyExistsError } from "../middlewares/error.middleware";
import { hashPassword } from "../tools/hash.password";
import { ObjectIdInputDto } from "../api/user/dto/objectid.input.dto";
import { IUserReadOutputDto } from "../api/user/dto/user.read.output.dto";

export interface IUsersManager {
  getUser(params: ObjectIdInputDto): Promise<IUserReadOutputDto | null>;
  createUser(dto: UserCreateInputDto): Promise<Array<IUser & { id: ObjectId }>>;
}

/** all business logic with users */
@injectable()
export class UsersManager implements IUsersManager {
 
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

  /** get user by id */
  async getUser(dto: ObjectIdInputDto): Promise<IUserReadOutputDto | null> {
    ObjectIdInputDto.validate(dto);

    const user = await userModel.findById(dto.id);
    if (!user) {
      return null;
    }

    const { id, name, login } = user;

    return {
      id,
      name,
      login,
    };
  }
}
