const { Router, response, request } = require('express')

const UserRepository = require('../repositories/UserRepository')

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

        const user = await userRepository.createUser({
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

        const user = await userRepository.updateUser({
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

module.exports = usersRouter