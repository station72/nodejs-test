import { IUser, userModel } from '../models/user';
import { ClientSession } from 'mongoose';
import { injectable } from 'inversify';
import 'reflect-metadata';

export interface IUsersRepository {
  create(
    user: Pick<IUser, 'login' | 'name' | 'passwordHash'>,
    config: { session: ClientSession },
  ): Promise<(IUser & { id: string })[]>;
}

@injectable()
export class UsersRepository implements IUsersRepository {
  async create(
    { login, name, passwordHash }: Pick<IUser, 'login' | 'name' | 'passwordHash'>,
    config?: { session: ClientSession },
  ): Promise<(IUser & { id: string })[]> {
    const createdUser = await userModel.create(
      [
        {
          login,
          name,
          passwordHash: passwordHash,
        },
      ],
      {
        session: config?.session,
      },
    );

    return createdUser;
  }
}
