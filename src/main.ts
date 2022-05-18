import "reflect-metadata";
import { Container } from 'inversify';
import { App, IApp } from "./app";
import { IUsersManager, UsersManager } from './managers/users.manager';
import { TYPES } from './types.di';
import { UsersController } from './users/user.controller';

let container = new Container({ defaultScope: "Singleton", skipBaseClassChecks: true });
container.bind<IApp>(TYPES.App).to(App);
container.bind<UsersController>(TYPES.UsersController).to(UsersController);
container.bind<IUsersManager>(TYPES.UsersManager).to(UsersManager);

const app = container.get<IApp>(TYPES.App);
app.init();
