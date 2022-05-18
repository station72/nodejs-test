import { Router } from 'express';
import { createUser } from './create';
import { getUser } from './read';
import { updateUser } from './update';
import { deleteUser } from './delete';
import { verifyAccess } from '../../middlewares';
import asyncHandler from "express-async-handler"

export const usersApiRouter = Router()
  .post('/', verifyAccess, asyncHandler(createUser))
  .get(`/:id`, asyncHandler(getUser))
  .put('/:id', verifyAccess, asyncHandler<any>(updateUser))
  .delete(`/:id`, verifyAccess, asyncHandler<any>(deleteUser))





