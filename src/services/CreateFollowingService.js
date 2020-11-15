const { v4, validate } = require('uuid')

const UserRepository = require('../repositories/UserRepository')
const FollowingRepository = require('../repositories/FollowingRepository')

module.exports = {
    execute: async ({ userId, followingId }) => {
        const userRepository = new UserRepository()
        const followingRepository = new FollowingRepository()

        if(!(validate(userId) && validate(followingId))) {
            throw new Error('Ids provided are not in UUID pattern')
        }

        const user = await userRepository.findByPk(userId)
        const following = await userRepository.findByPk(followingId)
    
        if(!user || !following) {
            throw new Error('Ids provided did not match existing users')
        }

        const validateUserFollowing = await followingRepository.findOne({
            where: {
                user_id: userId,
                following_id: followingId
            }
        })

        if(validateUserFollowing) {
            throw new Error('There\'s already a following relation with the provided Ids')
        }
    
        const createdFollowing = await followingRepository.create({
            id: v4(),
            user_id: userId,
            following_id: followingId
        })
    
    
        return createdFollowing
    }
}