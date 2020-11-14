const { Router } = require('express')
const usersRouter = require('./users.routes')
const followersRouter = require('./followers.routes')

const routes = Router()

routes.use('/users', usersRouter)
routes.use('/followers', followersRouter)

module.exports = routes
