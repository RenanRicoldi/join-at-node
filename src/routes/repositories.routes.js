const { Router } = require('express')

const RepositoryRepository = require('../repositories/RepositoryRepository')
const createRepositoryService = require('../services/CreateRepositoryService')
const updateRepositoryService = require('../services/UpdateRepositoryService')

const repositoriesRouter = Router()
const repositoryRepository = new RepositoryRepository()

repositoriesRouter.get('/', async (request, response) => {
    try {
        const repositories = await repositoryRepository.findRepositories()

        return response.status(200).json(repositories)
    } catch(error) {
        return response.status(400).json({ error: error.message })
    }
})

repositoriesRouter.get('/:username', async (request, response) => {
    try {
        const repositories = await repositoryRepository.findRepositoriesByUsername(request.params.username)

        return response.status(200).json(repositories)
    } catch(error) {
        return response.status(400).json({ error: error.message })
    }
})

repositoriesRouter.post('/', async (request, response) => {
    try {
        const {
            name,
            description,
            public,
            username,
            slug
        } = request.body

        const repository = await createRepositoryService.execute({
            name,
            description,
            public,
            username,
            slug
        })

        return response.status(200).json(repository)
    } catch(error) {
        return response.status(400).json({ error: error.message })
    }
})

repositoriesRouter.put('/:id', async (request, response) => {
    try {
        const {
            name,
            description,
            public,
            slug
        } = request.body

        const repository = await updateRepositoryService.execute({
            name,
            description,
            public,
            slug
        }, request.params.id)

        return response.status(200).json(repository)
    } catch(error) {
        return response.status(400).json({ error: error.message })
    }
})

repositoriesRouter.delete('/:id', async (request, response) => {
    try {
        const repository = await repositoryRepository.deleteRepository(request.params.id)

        return response.status(200).json(repository)
    } catch(error) {
        return response.status(400).json({ error: error.message })
    }
})

module.exports = repositoriesRouter