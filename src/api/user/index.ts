import { Router } from 'express';
import { createUser } from './create';
import { getUser } from './read';
import { updateUser } from './update';
import { deleteUser } from './delete';
import { verifyAccess } from '../../middlewares';

export const usersApiRouter = Router()
  .post('/', verifyAccess, createUser)
  .get(`/:id`, getUser)
  .put('/', verifyAccess, updateUser)
  .delete(`/:id`, verifyAccess, deleteUser)





