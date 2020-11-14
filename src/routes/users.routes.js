const { Router, response, request } = require('express')

const UserRepository = require('../repositories/UserRepository')
const createUserService = require('../services/CreateUserService')
const updateUserService = require('../services/UpdateUserService')
const authenticateUserService = require('../services/AuthenticateUserService')

const usersRouter = Router()

const userRepository = new UserRepository()

usersRouter.get('/', async (request, response) => {
    try {
        const users = await userRepository.findUsers()

        return response.status(200).json(users)
    } catch(error) {
        return response.status(400).json({ error: error.message })
    }
})

/**
 * TODO: Return number of followers, followings, repos
 */

usersRouter.get('/:id', async (request, response) => {
    try {
        const user = await userRepository.findUserById(request.params.id)

        return response.status(200).json(user)
    } catch(error) {
        return response.status(400).json({ error: error.message })
    }
})

usersRouter.post('/', async (request, response) => {
    try {
        const {
            name,
            email,
            localization,
            avatar,
            username,
            bio
        } = request.body

        if(!name || !email || !localization || !avatar || !username || !bio) {
            throw new Error('The necessary fields were not provided')
        }

        const user = await createUserService.execute({
            name,
            email,
            localization,
            avatar,
            username,
            bio
        })

        return response.status(201).json(user)
    } catch(error) {
        return response.status(400).json({ error: error.message })
    }
})

usersRouter.put('/:id', async (request, response) => {
    try {
        const {
            name,
            email,
            localization,
            avatar,
            username,
            bio
        } = request.body

        const user = await updateUserService.execute({
            name,
            email,
            localization,
            avatar,
            username,
            bio
        }, request.params.id)

        return response.status(200).json(user)
    } catch(error) {
        return response.status(400).json({ error: error.message })
    }
})

usersRouter.delete('/:id', async (request, response) => {
    try {
        const user = await userRepository.deleteUser(request.params.id)

        return response.status(200).json(user)
    } catch(error) {
        return response.status(400).json({ error: error.message })
    }
})

usersRouter.get('/auth/:username', async (request, response) => {
    try {
        const user = await authenticateUserService.execute(request.params.username)

        return response.status(200).json(user)
    } catch(error) {
        return response.status(400).json({ error: error.message })
    }
})

module.exports = usersRouter