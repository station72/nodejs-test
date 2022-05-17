import { Router } from 'express';
import { createUser } from './create';
import { getUser } from './read';
import { updateUser } from './update';
import { deleteUser } from './delete';
import { verifyAccess } from '../../middlewares';
import asyncHandler from "express-async-handler"

export const usersApiRouter = Router()
  .post('/', verifyAccess, asyncHandler(createUser))
  .get(`/:id`, getUser)
  .put('/', verifyAccess, updateUser)
  .delete(`/:id`, verifyAccess, deleteUser)





