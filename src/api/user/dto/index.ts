import Joi from "joi";
import JoiObjectId from "joi-objectid";
const myJoiObjectId = JoiObjectId(Joi);

export class UserValidationDefinition {
  static readonly passwordSchema = Joi.string().min(6).max(64);
  static readonly objectIdSchema = myJoiObjectId();
  static readonly loginSchema = Joi.string().min(6).max(32);
  static readonly nameSchema = Joi.string().min(1).max(64);
  static readonly repeatPasswordSchema = Joi.any()
    .valid(Joi.ref("password"));
}

export class CommonValidationDefinition {
  static readonly objectIdSchema = myJoiObjectId();
}
