import { Express, Router } from 'express'
import { usersApiRouter } from './user'

export function initAllRoutes(app: Express) {
  app.use('/api', getAllRoutes(app))
}

function getAllRoutes(app: Express): Router {
  return Router()
    .use('/users', usersApiRouter)
}

