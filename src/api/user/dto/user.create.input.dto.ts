import Joi from "joi";
import { validate } from '../../common/dto/validation/validate';
import { UserValidationDefinition } from './validation/validation.definition';

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
    return validate(dto, validateUserCreateSchema);
  }
}