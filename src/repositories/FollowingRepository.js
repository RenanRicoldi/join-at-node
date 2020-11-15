const Following = require('../models/Following')
const filterUser = require('../utils/filterUser')

class FollowingRepository {
    async findFollowings() {
        try {
            const followings = await Following.findAll()            

            return followings
        } catch(error) {                
            throw new Error('Failed to find followings')
        }        
    }

    async findFollowingsByUserId(userId) {
        try {
            const followings = await Following.findAndCountAll({
                where: {
                    user_id: userId
                },
                include: {
                    association: 'following'
                }
            })

            const filteredFollowings = {
                data: followings.rows.map( following => ({
                    id: following.id,
                    user_id: following.user_id,
                    following_id: following.following_id,
                    following_data: filterUser(following.following)
                })),
                count: followings.count
            }
            
            

            return filteredFollowings
        } catch(error) {
            throw new Error('Failed to find followings with the provided Id')
        }
    }

    async destroy(followingsId) {
        const following = await Following.findByPk(followingsId)

        if(!following) {
            throw new Error('No followings found with the provided id')
        }

        const status = await Following.destroy({
            where: {
                id: followingsId
            }
        })

        if(status !== 1) {
            throw new Error('Failed to delete following')
        }

        return following
    }

    async create(following) {
        const created = await Following.create(following)

        return created
    }

    async findOne(options) {
        const following = await Following.findOne(options)

        return following
    }

    async update(properties, options) {
        await Following.update(properties, options)
    }

    async findByPk(id) {
        const following = await Following.findByPk(id)

        return following
    }
}

module.exports = FollowingRepository