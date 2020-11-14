const { v4 } = require('uuid')
const { Op } = require('sequelize')

const UserRepository = require('../repositories/UserRepository')
const filterUser = require('../utils/filterUser')

module.exports = {
    execute: async ({ name, email, localization, avatar, username, bio }) => {
        const userRepository = new UserRepository()

        const user = await userRepository.findOne({ 
            where: {
                [Op.or]: [
                    { email },
                    { username }
                ]
            }
        })
    
        if(user) {
            throw new Error('There\'s aleady an user with the provided information')
        }
    
        const createdUser = await userRepository.create({
            id: v4(),
            name,
            email,
            localization,
            avatar,
            username,
            bio
        })
    
        const filteredUser = filterUser(createdUser)
    
        return filteredUser
    }
}