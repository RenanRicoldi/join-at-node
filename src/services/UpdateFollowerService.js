const { v4, validate } = require('uuid')

const deleteNullProperties = require('../utils/deleteNullProperties')
const FollowerRepository = require('../repositories/FollowerRepository')
const UserRepository = require('../repositories/UserRepository')

module.exports = {
    execute: async (newProperties, followersId) => {
        const followerRepository = new FollowerRepository()
        const userRepository = new UserRepository()

        if(!validate(followersId)) {
            throw new Error('Ids provided are not in UUID pattern')
        }

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
        
        if(filteredNewProperties.followerId) {
            if(!validate(filteredNewProperties.followerId)) {
                throw new Error('Ids provided are not in UUID pattern')
            }

            const user = await userRepository.findByPk(filteredNewProperties.followerId)

            if(!user) {
                throw new Error('Ids provided did not match existing users')
            }
        }

        const follower = await followerRepository.findByPk(followersId)

        if(!follower) {
            throw new Error('Ids provided did not match existing followers')
        }

        await followerRepository.update(filteredNewProperties, { 
            where: {
                id: followersId
            },
            returning: true        
        })
        
        await follower.reload()

        return follower
    }
}