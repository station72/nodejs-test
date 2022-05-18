import { Router } from "express";

export abstract class BaseController {
  private readonly _router: Router;

  constructor() {
    this._router = Router();
    this.bindRoutes();
  }

  /** route path for the controller. For example '/users' */
  abstract get controllerRoutePath();

  /** override it to attach routes to the @super.router */
  abstract bindRoutes(): void;

  get router() {
    return this._router;
  }
}
