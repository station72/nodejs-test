import Joi from "joi";
import { UnprocessableEntityError } from "../../../middlewares/errors";

const validateUserSchema = Joi.object({
  login: Joi.string().min(6).max(32).required(),
  name: Joi.string().min(1).max(64).required(),
  password: Joi.string().min(6).max(64).required(),
  repeatPassword: Joi.any().valid(Joi.ref('password')).required()
});

export class UserCreateInputDto {
  login: string;
  name: string;
  password: string;

  static validate(user: UserCreateInputDto) {
    const result = validateUserSchema.validate(user);
    if (result?.error) {
      throw new UnprocessableEntityError(result.error.message);
    }
    return result;
  }
}
