const { v4 } = require('uuid')
const { Op } = require('sequelize')

const UserRepository = require('../repositories/UserRepository')
const filterUser = require('../utils/filterUser')

module.exports = {
    execute: async (username) => {
        const userRepository = new UserRepository()

        const user = await userRepository.findOne({ 
            where: {
                username
            }
        })
    
        if(!user) {
            throw new Error('No users found with the provided username')
        }
    
        const filteredUser = filterUser(user)
    
        return filteredUser
    }
}