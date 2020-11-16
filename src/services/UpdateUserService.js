const Validator = require('validatorjs')

const filterUser = require('../utils/filterUser')
const deleteNullProperties = require('../utils/deleteNullProperties')
const UserRepository = require('../repositories/UserRepository')

module.exports = {
    execute: async (newProperties, userId) => {
        const userRepository = new UserRepository()

        const filteredNewProperties = deleteNullProperties(newProperties)

        const rules = {
            name: 'string',
            email: 'email',
            email: 'string',
            avatar: 'url',
            username: 'string',
            bio: 'string',
        }
        
        const validation = new Validator(filteredNewProperties, rules)

        if(validation.fails()) {
            throw new Error('Fields are not in correct format')
        }

        const user = await userRepository.findByPk(userId)

        if(!user) {
            throw new Error('No users found with the provided id')
        }

        await userRepository.update(filteredNewProperties, { 
            where: {
                id: userId
            },
            returning: true        
        })
        
        await user.reload()

        const filteredUser = filterUser(user)
     
        return filteredUser
    }
}