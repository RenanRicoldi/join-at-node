const { v4 } = require('uuid')
const { Op } = require('sequelize')

const UserRepository = require('../repositories/UserRepository')
const TokenRepository = require('../repositories/TokenRepository')
const filterUser = require('../utils/filterUser')

module.exports = {
    execute: async (username) => {
        const userRepository = new UserRepository()
        const tokenRepository = new TokenRepository()

        const user = await userRepository.findOne({ 
            where: {
                username
            }
        })
    
        if(!user) {
            throw new Error('No users found with the provided username')
        }

        const token = await tokenRepository.create({
            id: v4(),
            user_id: user.id
        })

        if(!token) {
            throw new Error('Failed to create authentication token')
        }
    
        const filteredUser = filterUser(user)
    
        return filteredUser
    }
}