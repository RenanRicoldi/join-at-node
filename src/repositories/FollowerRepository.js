const Follower = require('../models/Follower')
const filterUser = require('../utils/filterUser')

class FollowerRepository {
    async findFollowers() {
        try {
            const followers = await Follower.findAll()            

            return followers
        } catch(error) {                
            throw new Error('Failed to find followers')
        }        
    }

    async findFollowersByUserId(userId) {
        try {
            const followers = await Follower.findAndCountAll({
                where: {
                    user_id: userId
                },
                include: {
                    association: 'follower'
                }
            })

            const filteredFollowers = {
                data: followers.rows.map(follower => ({
                    id: follower.id,
                    user_id: follower.user_id,
                    follower_id: follower.follower_id,
                    follower_data: filterUser(follower.follower)
                })),
                count: followers.count
            }

            return filteredFollowers
        } catch(error) {
            throw new Error('Failed to find followers with the provided Id')
        }
    }

    async destroy(followersId) {
        const follower = await Follower.findByPk(followersId)

        if(!follower) {
            throw new Error('No followers found with the provided id')
        }

        const status = await Follower.destroy({
            where: {
                id: followersId
            }
        })

        if(status !== 1) {
            throw new Error('Failed to delete follower')
        }

        return follower
    }

    async create(follower) {
        const created = await Follower.create(follower)

        return created
    }

    async findOne(options) {
        const follower = await Follower.findOne(options)

        return follower
    }

    async update(properties, options) {
        await Follower.update(properties, options)
    }

    async findByPk(id) {
        const follower = await Follower.findByPk(id)

        return follower
    }
}

module.exports = FollowerRepository