import "reflect-metadata";
import { inject, injectable } from "inversify";
import { BaseController } from "../common/base.comroller";
import asyncHandler from "express-async-handler";
import { getUser } from "../api/user/read";
import { verifyAccessMiddleware } from "../middlewares/verify.access.middleware";
import { updateUser } from "../api/user/update";
import { deleteUser } from "../api/user/delete";
import { UserCreateInputDto } from "../api/user/dto/user.create.input.dto";
import { NextFunction, Request, Response } from "express";
import { IUsersManager } from "../managers/users.manager";
import { TYPES } from '../types.di';

@injectable()
export class UsersController extends BaseController {
  constructor(@inject(TYPES.UsersManager) private readonly _usersManager: IUsersManager) {
    super();
  }

  get controllerRoutePath(): string {
    return "/users";
  }

  bindRoutes() { 
    //TODO: move getUser updateUser deleteUser to controller and manager
    super.router
      .post(
        "/",
        verifyAccessMiddleware,
        asyncHandler(this.createUser.bind(this))
      )
      .get(`/:id`, asyncHandler(getUser))
      .put("/:id", verifyAccessMiddleware, asyncHandler<any>(updateUser))
      .delete(`/:id`, verifyAccessMiddleware, asyncHandler<any>(deleteUser));
  }

  public async createUser(
    req: Request<{}, {}, UserCreateInputDto, {}, {}>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const createdUser = await this._usersManager.createUser(req.body);

    res
      .status(201)
      .setHeader(
        "Location",
        `http://localhost:3334/api/users/${createdUser[0].id}`
      );

    res.json({
      id: createdUser[0].id,
    });
  }
}
