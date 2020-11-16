const { Router } = require('express')
const usersRouter = require('./users.routes')
const followersRouter = require('./followers.routes')
const followingsRouter = require('./followings.routes')
const repositoriesRouter = require('./repositories.routes')
const repositoriesStarsRouter = require('./repositoriesStars.routes')

const routes = Router()

routes.use('/users', usersRouter)
routes.use('/followers', followersRouter)
routes.use('/followings', followingsRouter)
routes.use('/repositories', repositoriesRouter)
routes.use('/repositoriesStars', repositoriesStarsRouter)

module.exports = routes
