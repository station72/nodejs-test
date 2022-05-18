import Joi from "joi";
import { UserValidationDefinition } from ".";
import { UnprocessableEntityError } from "../../../middlewares/errors";

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
