import { App, IApp } from "./app";
import { UsersManager } from './managers/users.manager';
import { TYPES } from './types.di';
import { UsersController } from './users/user.controller';

// let container = new Container({ defaultScope: "Singleton" });


const usersManager = new UsersManager();
const usersController = new UsersController(usersManager);
new App(usersController).init();
