import 'reflect-metadata';
import { Container } from 'inversify';
import { App, IApp } from './app';
import { IUsersManager, UsersManager } from './managers/users.manager';
import { TYPES } from './types.di';
import { UsersController } from './users/user.controller';
import { ITransactionManager, TransactionManager } from './data/transaction.manager';
import { IUsersRepository, UsersRepository } from './data/repositories/users.repository';

export const container = new Container({ defaultScope: 'Singleton', skipBaseClassChecks: true });
container.bind<IApp>(TYPES.App).to(App);
container.bind<UsersController>(TYPES.UsersController).to(UsersController);
container.bind<IUsersManager>(TYPES.UsersManager).to(UsersManager);
container.bind<ITransactionManager>(TYPES.TransactionManager).to(TransactionManager).inRequestScope();
container.bind<IUsersRepository>(TYPES.UsersRepository).to(UsersRepository).inRequestScope();

const app = container.get<IApp>(TYPES.App);
app.init();
