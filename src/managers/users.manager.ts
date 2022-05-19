import "reflect-metadata";
import { injectable } from "inversify";
import mongoose, { ObjectId, Types } from "mongoose";
import { UserCreateInputDto } from "../api/user/dto/user.create.input.dto";
import { IUser, userModel } from "../data/models/user";
import { UniqueDataAlreadyExistsError } from "../middlewares/error.middleware";
import { hashPassword } from "../tools/hash.password";
import { ObjectIdInputDto } from "../api/user/dto/objectid.input.dto";
import { IUserReadOutputDto } from "../api/user/dto/user.read.output.dto";
import { UserUpsertInputDto } from "../api/user/dto/user.upsert.input.dto";

export interface IUsersManager {
  updateUser(dto: {
    id: string;
    name: string;
    password: string;
  }): Promise<(IUser & { id: string }) | null>;
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

  async updateUser(
    dto: UserUpsertInputDto & { id: string }
  ): Promise<(IUser & { id: string }) | null> {
    UserUpsertInputDto.validate(dto);

    let hashPass = !dto.password ? undefined : await hashPassword(dto.password);

    const newUserData: Partial<Omit<IUser, "login">> = {
      name: dto.name,
      id: new mongoose.Types.ObjectId(dto.id),
    };

    if (hashPass) {
      newUserData.passwordHash = hashPass;
    }

    const result = await userModel.findOneAndUpdate(
      {
        _id: dto.id,
      },
      { $set: newUserData },
      {
        new: true,
      }
    );

    return result;
  }
}
