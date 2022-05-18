import Joi from "joi";
import { UnprocessableEntityError } from "../../../../middlewares/error.middleware";

export function validate<InputDto>(
  dto: InputDto,
  schema: Joi.ObjectSchema<any>
) {
  const result = schema.validate(dto);
  if (result?.error) {
    throw new UnprocessableEntityError(result.error.message);
  }
  return result;
}
