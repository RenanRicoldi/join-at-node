const { Router } = require('express')
const idValidation = require('../middlewares/idValidation')

const FollowingRepository = require('../repositories/FollowingRepository')
const createFollowingService = require('../services/following/CreateFollowingService')
const updateFollowingService = require('../services/following/UpdateFollowingService')

const followingRepository = new FollowingRepository()

const followingsRouter = Router()

followingsRouter.get('/', async (request, response) => {
    try {
        const followings = await followingRepository.findFollowings()

        return response.status(200).json(followings)
    } catch(error) {
        return response.status(400).json({ error: error.message })
    }
})

followingsRouter.get('/:id', idValidation, async (request, response) => {
    try {
        const followings = await followingRepository.findFollowingsByUserId(request.params.id)

        return response.status(200).json(followings)
    } catch(error) {
        return response.status(400).json({ error: error.message })
    }
})

followingsRouter.post('/', async (request, response) => {
    try {
        const {
            userId,
            followingId
        } = request.body

        const following = await createFollowingService.execute({
            userId,
            followingId
        })

        return response.status(201).json(following)
    } catch(error) {
        return response.status(400).json({ error: error.message })
    }
})

followingsRouter.put('/:id', idValidation, async (request, response) => {
    try {
        const {
            userId,
            followingId
        } = request.body

        const following = await updateFollowingService.execute({
            userId,
            followingId
        }, request.params.id)

        return response.status(200).json(following)
    } catch(error) {
        return response.status(400).json({ error: error.message })
    }
})

followingsRouter.delete('/:id', idValidation, async (request, response) => {
    try {
        const following = await followingRepository.destroy(request.params.id)

        return response.status(200).json(following)
    } catch(error) {
        return response.status(400).json({ error: error.message })
    }
})

module.exports = followingsRouter