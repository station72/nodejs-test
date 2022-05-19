import "reflect-metadata";
import { inject, injectable } from "inversify";
import { BaseController } from "../common/base.comroller";
import asyncHandler from "express-async-handler";
import { verifyAccessMiddleware } from "../middlewares/verify.access.middleware";
import { updateUser } from "../api/user/update";
import { deleteUser } from "../api/user/delete";
import { UserCreateInputDto } from "../api/user/dto/user.create.input.dto";
import { NextFunction, Request, Response } from "express";
import { IUsersManager } from "../managers/users.manager";
import { TYPES } from "../types.di";
import { ObjectIdInputDto } from "../api/user/dto/objectid.input.dto";
import { IUserReadOutputDto } from "../api/user/dto/user.read.output.dto";

@injectable()
export class UsersController extends BaseController {
  constructor(
    @inject(TYPES.UsersManager) private readonly _usersManager: IUsersManager
  ) {
    super();
  }

  get controllerRoutePath(): string {
    return "/users";
  }

  bindRoutes() {
    //TODO: movew updateUser deleteUser to controller and manager
    super.router
      .post(
        "/",
        verifyAccessMiddleware,
        asyncHandler(this.createUser.bind(this))
      )
      .get(`/:id`, asyncHandler(this.getUser.bind(this)))
      .put("/:id", verifyAccessMiddleware, asyncHandler<any>(updateUser))
      .delete(`/:id`, verifyAccessMiddleware, asyncHandler<any>(deleteUser));
  }

  private async createUser(
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

    return void res.json({
      id: createdUser[0].id,
    });
  }

  private async getUser(
    req: Request<ObjectIdInputDto>,
    res: Response<IUserReadOutputDto>,
    next: NextFunction
  ): Promise<void> {
    const user = await this._usersManager.getUser(req.params);

    if (!user) {
      return void res.sendStatus(404);
    }

    return void res.status(200).json(user);
  }
}
