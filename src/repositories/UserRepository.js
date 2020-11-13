const { v4 } = require('uuid')
const { Op } = require('sequelize')

const User = require('../models/User')
const filterUser = require('../utils/filterUser')
const deleteNullProperties = require('../utils/deleteNullProperties')

class UserRepository {
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

    async createUser({ name, email, localization, avatar, username, bio }) {
        const user = await User.findOne({ 
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

        const createdUser = await User.create({
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

    async updateUser(newProperties, userId) {
        const filteredNewProperties = deleteNullProperties(newProperties)

        const user = await User.findByPk(userId)

        if(!user) {
            throw new Error('No users found with the provided id')
        }

        await User.update(filteredNewProperties, { 
            where: {
                id: userId
            },
            returning: true        
        })
        
        await user.reload()

        const filteredUser = filterUser(user)
     
        return filteredUser
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
}

module.exports = UserRepository