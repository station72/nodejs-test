import { Router } from 'express'
import { usersApiRouter } from './user'

export function getAllRoutes(): Router {
  return Router()
    .use('/users', usersApiRouter)
}
