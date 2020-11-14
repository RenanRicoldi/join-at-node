const User = require('../models/User')
const filterUser = require('../utils/filterUser')

class UserRepository{
    async findUsers() {
        try {
            const users = await User.findAndCountAll()            

            const filteredUsers = {
                data: users.rows.map(user => filterUser(user)),
                count: users.count
            }

            return filteredUsers
        } catch(error) {                
            throw new Error('Failed to find users')
        }        
    }

    async findUserById(userId) {
        try {
            const user = await User.findByPk(userId)
            const filteredUser = filterUser(user)
    
            return filteredUser
        } catch (error) {
            throw new Error('No users found with the provided id')
        }
    }

    async deleteUser(userId) {
        const user = await User.findByPk(userId)

        if(!user) {
            throw new Error('No users found with the provided id')
        }

        const status = await User.destroy({
            where: {
                id: userId
            }
        })

        if(status !== 1) {
            throw new Error('Failed to delete user')
        }

        return user
    }

    async create(user) {
        const created = await User.create(user)

        return created
    }

    async findOne(options) {
        const user = await User.findOne(options)

        return user
    }

    async update(properties, options) {
        await User.update(properties, options)
    }

    async findByPk(id) {
        const user = await User.findByPk(id)

        return user
    }
}

module.exports = UserRepository