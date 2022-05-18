import Joi from "joi";
import { UserValidationDefinition } from ".";
import { UnprocessableEntityError } from "../../../middlewares/errors";

const validateUserCreateSchema = Joi.object({
  login: UserValidationDefinition.loginSchema.required(),
  name: UserValidationDefinition.nameSchema.required(),
  password: UserValidationDefinition.passwordSchema.required(),
  repeatPassword: UserValidationDefinition.repeatPasswordSchema.required(),
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