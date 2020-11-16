const { Router } = require('express')

const FollowerRepository = require('../repositories/FollowerRepository')
const createFollowerService = require('../services/follower/CreateFollowerService')
const updateFollowerService = require('../services/follower/UpdateFollowerService')
const idValidation = require('../middlewares/idValidation')

const followerRepository = new FollowerRepository()

const followersRouter = Router()

followersRouter.get('/', async (request, response) => {
    try {
        const followers = await followerRepository.findFollowers()

        return response.status(200).json(followers)
    } catch(error) {
        return response.status(400).json({ error: error.message })
    }
})

followersRouter.get('/:id', idValidation, async (request, response) => {
    try {
        const followers = await followerRepository.findFollowersByUserId(request.params.id)

        return response.status(200).json(followers)
    } catch(error) {
        return response.status(400).json({ error: error.message })
    }
})

followersRouter.post('/', async (request, response) => {
    try {
        const {
            userId,
            followerId
        } = request.body

        const follower = await createFollowerService.execute({
            userId,
            followerId
        })

        return response.status(201).json(follower)
    } catch(error) {
        return response.status(400).json({ error: error.message })
    }
})

followersRouter.put('/:id', idValidation, async (request, response) => {
    try {
        const {
            userId,
            followerId
        } = request.body

        const follower = await updateFollowerService.execute({
            userId,
            followerId
        }, request.params.id)

        return response.status(200).json(follower)
    } catch(error) {
        return response.status(400).json({ error: error.message })
    }
})

followersRouter.delete('/:id', idValidation, async (request, response) => {
    try {
        const follower = await followerRepository.destroy(request.params.id)

        return response.status(200).json(follower)
    } catch(error) {
        return response.status(400).json({ error: error.message })
    }
})

module.exports = followersRouter