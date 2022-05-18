import { UserCreateInputDto } from "./user.create.input.dto";

type UserReadOutputDtoType = Pick<UserCreateInputDto, "login" | "name"> & {
  id: string;
};
export interface IUserReadOutputDto extends UserReadOutputDtoType {}
