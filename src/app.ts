// import "reflect-metadata";
// import { injectable } from 'inversify';
import express, { Express, Router } from "express";
import { AppSettings } from "./app.settings";
import { BaseController } from "./common/base.comroller";
import { connectDb } from "./data";
import { errorMiddleware } from "./middlewares/error.middleware";
import { UsersController } from "./users/user.controller";

export interface IApp {
  init(): Promise<void>;
}

// @injectable()
export class App implements IApp {
  private readonly _server: Express;
  private readonly _controllers: BaseController[] = [];

  constructor(usersController: UsersController) {
    this._server = express();

    //TODO: move to di factory
    this._controllers.push(usersController);
  }

  async init(): Promise<void> {
    const db = await connectDb();
    this._server.use(express.json());

    const routes = this.getAllControllerRoutes()
    this._server.use("/api", routes);
    this._server.use(errorMiddleware);

    this._server.listen(AppSettings.server.port);
  }

  /** gather routes from all controllers and collect them to the single router */
  private getAllControllerRoutes(): Router {
    let router = Router();
    this._controllers.forEach((u) =>
      router = router.use(u.controllerRoutePath, u.router)
    );
    return router;
  }
}
