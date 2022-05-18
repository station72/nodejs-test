import { Router } from 'express'
import { usersApiRouter } from './user'

/** get router with all application routes */
export function getAllRoutes(): Router {
  return Router()
    .use('/users', usersApiRouter)
}
