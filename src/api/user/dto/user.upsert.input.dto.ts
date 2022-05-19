import Joi from "joi";
import { UnprocessableEntityError } from "../../../middlewares/error.middleware";
import { UserValidationDefinition } from './validation/validation.definition';

const validateUserUpsertSchema = Joi.object({
  id: UserValidationDefinition.objectIdSchema.required(),
  name: UserValidationDefinition.nameSchema,
  password: UserValidationDefinition.passwordSchema,
});

export class UserUpsertInputDto {
  name: string;
  password: string;

  static validate(dto: UserUpsertInputDto & { id: string }) {
    const result = validateUserUpsertSchema.validate(dto);
    if (result?.error) {
      throw new UnprocessableEntityError(result.error.message);
    }
    return result;
  }
}

export type UserUpsertInputDtoNoId = Omit<UserUpsertInputDto, "id">;
