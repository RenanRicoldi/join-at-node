const { Router, response } = require('express')

const createRepositoryStarService = require('../services/repositoryStar/CreateRepositoryStarService')
const updateRepositoryStarService = require('../services/repositoryStar/UpdateRepositoryStarService')
const RespositoresStarsRepository = require('../repositories/RepositoriesStarsRepository')
const idValidation = require('../middlewares/idValidation')

const repositoriesStarsRouter = Router()
const repositoriesStarsRepository = new RespositoresStarsRepository()

repositoriesStarsRouter.get('/', async (request, response) => {
    try {
        const repositoriesStars = await repositoriesStarsRepository.findRepositoriesStars()

        return response.status(200).json(repositoriesStars)
    } catch(error) {
        return response.status(400).json({ error: error.message })
    }
})

repositoriesStarsRouter.get('/:id', idValidation, async (request, response) => {
    try {
        const repositoriesStars = await repositoriesStarsRepository.findRepositoryStarsByRepositoryId(request.params.id)

        return response.status(200).json(repositoriesStars)
    } catch(error) {
        return response.status(400).json({ error: error.message })
    }
})

repositoriesStarsRouter.post('/', async (request, response) => {
    try {
        const {
            userId,
            repositoryId
        } = request.body

        const repositoryStar = await createRepositoryStarService.execute({
            userId,
            repositoryId
        })

        return response.status(200).json(repositoryStar)
    } catch(error) {
        return response.status(400).json({ error: error.message })
    }
})

repositoriesStarsRouter.put('/:id', idValidation, async (request, response) => {
    try {
        const {
            userId,
            repositoryId
        } = request.body

        const repositoryStar = await updateRepositoryStarService.execute({
            userId,
            repositoryId
        }, request.params.id)

        return response.status(200).json(repositoryStar)
    } catch(error) {
        return response.status(400).json({ error: error.message })
    }
})

module.exports = repositoriesStarsRouter