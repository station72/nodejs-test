import { Container } from 'inversify';
import { IUsersRepository } from '../data/repositories/users.repository';
import { TYPES } from '../types.di';
import { IUsersManager, UsersManager } from './users.manager';
import { mock } from 'jest-mock-extended';
import { UniqueDataAlreadyExistsError, UnprocessableEntityError } from '../middlewares/error.middleware';
import { ITransactionManager } from '../data/transaction.manager';

let usersRepositoryMock = mock<IUsersRepository>();
let transactionManager = mock<ITransactionManager>();

const container = new Container();

beforeAll(() => {});

beforeEach(() => {
  container.unbindAll();

  usersRepositoryMock = mock<IUsersRepository>();
  transactionManager = mock<ITransactionManager>();

  container.bind<ITransactionManager>(TYPES.TransactionManager).toConstantValue(transactionManager);
  container.bind<IUsersRepository>(TYPES.UsersRepository).toConstantValue(usersRepositoryMock);
  container.bind<IUsersManager>(TYPES.UsersManager).to(UsersManager);
});

describe('users.manager createUser', () => {
  it('password must be equal to repeatPassword', async () => {
    const usersManager = container.get<IUsersManager>(TYPES.UsersManager);

    const login = '123456';
    const name = 'name';
    const password = 'password';
    await usersManager.createUser({
      login,
      name,
      password,
      repeatPassword: password,
    });
    expect(usersRepositoryMock.create).toBeCalledTimes(1);

    await usersManager
      .createUser({
        login,
        name,
        password,
        repeatPassword: 'other_password_value',
      })
      .catch((error) => {
        expect(error).toBeInstanceOf(UnprocessableEntityError);
        expect((error as UnprocessableEntityError).message).toEqual('"repeatPassword" must be [ref:password]');
        expect(usersRepositoryMock.create).toBeCalledTimes(1);
      });
  });

  it('login must be unique', async () => {
    usersRepositoryMock.create.mockImplementation(async () => {
      const error = new Error();
      error['code'] = 11000;
      error['keyValue'] = {
        login: true,
      };

      throw error;
    });

    const usersManager = container.get<IUsersManager>(TYPES.UsersManager);
    await usersManager.createUser({
      login: '123456',
      name: 'name',
      password: 'password',
      repeatPassword: 'password',
    }).catch((error) => {
      expect(error).toBeInstanceOf(UniqueDataAlreadyExistsError)
      expect(error.message).toEqual('login already exists')
    });
  });
});
