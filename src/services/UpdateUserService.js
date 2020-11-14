const filterUser = require('../utils/filterUser')
const deleteNullProperties = require('../utils/deleteNullProperties')
const UserRepository = require('../repositories/UserRepository')

module.exports = {
    execute: async (newProperties, userId) => {
        const userRepository = new UserRepository()

        const filteredNewProperties = deleteNullProperties(newProperties)

        const user = await userRepository.findByPk(userId)

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