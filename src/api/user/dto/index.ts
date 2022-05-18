import { UnprocessableEntityError } from "../../../middlewares/errors";

import Joi from "joi";
import JoiObjectId from "joi-objectid";
const myJoiObjectId = JoiObjectId(Joi);

//ts-ignore
// Joi.objectId = require('joi-objectid')(Joi)
//   id: myJoiObjectId(),

const validateUserCreateSchema = Joi.object({
  login: Joi.string().min(6).max(32).required(),
  name: Joi.string().min(1).max(64).required(),
  password: Joi.string().min(6).max(64).required(),
  repeatPassword: Joi.any().valid(Joi.ref("password")).required(),
});

export class UserCreateInputDto {
  login: string;
  name: string;
  password: string;

  static validate(dto: UserCreateInputDto) {
    const result = validateUserCreateSchema.validate(dto);
    if (result?.error) {
      throw new UnprocessableEntityError(result.error.message);
    }
    return result;
  }
}

const validateObjectIdSchema = Joi.object({
  id: myJoiObjectId().required(),
});

export class ObjectIdInputDto {
  id: string;
  static validate(dto: ObjectIdInputDto) {
    const result = validateObjectIdSchema.validate(dto);
    if (result?.error) {
      throw new UnprocessableEntityError(result.error.message);
    }
    return result;
  }
}


type UserReadOutputDtoType = Pick<UserCreateInputDto, "login" | "name"> & {
  id: string;
};
export interface IUserReadOutputDto extends UserReadOutputDtoType {}
