const { v4 } = require('uuid')
const { Op } = require('sequelize')
const Validator = require('validatorjs')

const UserRepository = require('../../repositories/UserRepository')
const filterUser = require('../../utils/filterUser')

module.exports = {
    execute: async ({ name, email, localization, avatar, username, bio }) => {
        const rules = {
            name: 'required|string',
            email: 'required|email',
            localization: 'required|string',
            avatar: 'required|url',
            username: 'required|string',
            bio: 'required|string',
        }
        
        const validation = new Validator({
            name,
            email,
            localization,
            avatar,
            username,
            bio
        }, rules)

        if(validation.fails()) {
            throw new Error('Not all necessary fields provided or fields are not in correct format')
        }
        
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
            username: username.split(' ').join('-'),
            bio
        })
    
        const filteredUser = filterUser(createdUser)
    
        return filteredUser
    }
}