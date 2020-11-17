const User = require('../models/User')
const filterUser = require('../utils/filterUser')
const RepositoryRepository = require('../repositories/RepositoryRepository')
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
            const repositoryRepository = new RepositoryRepository()
            
            const user = await User.findByPk(userId, {
                include: [
                    {
                        association: 'followers',                    
                    },
                    {
                        association: 'followings'
                    }
                ]
            })

            const repositories = await repositoryRepository.findRepositoriesByUsername(user.username)

            const {
                id,
                name,
                email,
                localization,
                avatar,
                username,
                bio,
                followers,
                followings
            } = user

            const followersIds = followers.map(follower => follower.follower_id)
            const followingsIds = followings.map(following => following.following_id)

            const filteredFollowers = await User.findAll({
                where: {
                    id: followersIds
                }
            })

            const filteredFollowings = await User.findAll({
                where: {
                    id: followingsIds
                }
            })

            return {
                id,
                name,
                email,
                localization,
                avatar,
                username,
                bio,
                followers: {
                    data: filteredFollowers.map(follower => ({
                        id: follower.id,
                        username: follower.username,
                        avatar: follower.avatar,
                    })),
                    count: filteredFollowers.length
                },
                following: {
                    data: filteredFollowings.map(following => ({
                        id: following.id,
                        username: following.username,
                        avatar: following.avatar,
                    })),
                    count: filteredFollowings.length
                },
                repositories: {
                    data: repositories,
                    count: repositories.length
                }
            }
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