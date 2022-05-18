import { Router } from 'express';
import { createUser } from './create';
import { getUser } from './read';
import { updateUser } from './update';
import { deleteUser } from './delete';
import asyncHandler from "express-async-handler"
import { verifyAccessMiddleware } from '../../middlewares/verify.access.middleware';

export const usersApiRouter = Router()
  .post('/', verifyAccessMiddleware, asyncHandler(createUser))
  .get(`/:id`, asyncHandler(getUser))
  .put('/:id', verifyAccessMiddleware, asyncHandler<any>(updateUser))
  .delete(`/:id`, verifyAccessMiddleware, asyncHandler<any>(deleteUser))





