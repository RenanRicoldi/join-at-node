const deleteNullProperties = require('../../utils/deleteNullProperties')
const FollowingRepository = require('../../repositories/FollowingRepository')
const UserRepository = require('../../repositories/UserRepository')
const { validate } = require('uuid')

module.exports = {
    execute: async (newProperties, followingsId) => {
        const followingRepository = new FollowingRepository()
        const userRepository = new UserRepository()

        const filteredNewProperties = deleteNullProperties(newProperties)

        if(filteredNewProperties.userId) {
            if(!validate(filteredNewProperties.userId)) {
                throw new Error('Ids provided are not in UUID pattern')
            }

            const user = await userRepository.findByPk(filteredNewProperties.userId)

            if(!user) {
                throw new Error('Ids provided did not match existing users')
            }
        }
        
        if(filteredNewProperties.followingId) {
            if(!validate(filteredNewProperties.followingId)) {
                throw new Error('Ids provided are not in UUID pattern')
            }

            const user = await userRepository.findByPk(filteredNewProperties.followingId)

            if(!user) {
                throw new Error('Ids provided did not match existing users')
            }
        }

        const following = await followingRepository.findByPk(followingsId)

        if(!following) {
            throw new Error('Ids provided did not match existing followings')
        }

        await followingRepository.update(
            {
                user_id: filteredNewProperties.userId,
                follower_id: filteredNewProperties.followingId
            },
            { 
                where: {
                    id: followingsId
                },
                returning: true        
            }
        )
        
        await following.reload()

        return following
    }
}