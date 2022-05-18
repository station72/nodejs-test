import Joi from "joi";
import { CommonValidationDefinition } from ".";
import { UnprocessableEntityError } from "../../../middlewares/errors";

const validateObjectIdSchema = Joi.object({
  id: CommonValidationDefinition.objectIdSchema.required(),
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
