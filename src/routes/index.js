const { Router } = require('express')
const usersRouter = require('./users.routes')
const followersRouter = require('./followers.routes')
const followingsRouter = require('./followings.routes')

const routes = Router()

routes.use('/users', usersRouter)
routes.use('/followers', followersRouter)
routes.use('/followings', followingsRouter)

module.exports = routes
