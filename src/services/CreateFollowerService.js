const { v4, validate } = require('uuid')

const UserRepository = require('../repositories/UserRepository')
const FollowerRepository = require('../repositories/FollowerRepository')
const filterUser = require('../utils/filterUser')

module.exports = {
    execute: async ({ userId, followerId }) => {
        const userRepository = new UserRepository()
        const followerRepository = new FollowerRepository()

        if(!(validate(userId) && validate(followerId))) {
            throw new Error('Ids provided are not in UUID pattern')
        }

        const user = await userRepository.findByPk(userId)
        const follower = await userRepository.findByPk(followerId)
    
        if(!user || !follower) {
            throw new Error('Ids provided did not match existing users')
        }

        const validateUserFollower = await followerRepository.findOne({
            where: {
                user_id: userId,
                follower_id: followerId
            }
        })

        if(validateUserFollower) {
            throw new Error('There\'s already a follower relation with the provided Ids')
        }
    
        const createdFollower = await followerRepository.create({
            id: v4(),
            user_id: userId,
            follower_id: followerId
        })
    
    
        return createdFollower
    }
}