import Joi from "joi";
import { validate } from '../../common/dto/validation/validate';
import { CommonValidationDefinition } from './validation/validation.definition';

const validateObjectIdSchema = Joi.object({
  id: CommonValidationDefinition.objectIdSchema.required(),
});

export class ObjectIdInputDto {
  id: string;

  static validate(dto: ObjectIdInputDto) {
    return validate(dto, validateObjectIdSchema)
  }
}
