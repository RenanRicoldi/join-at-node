const { v4, validate } = require('uuid')

const UserRepository = require('../../repositories/UserRepository')
const RepositoryRepository = require('../../repositories/RepositoryRepository')
const RepositoryStarsRepository = require('../../repositories/RepositoriesStarsRepository')

module.exports = {
    execute: async ({ userId, repositoryId }) => {
        const userRepository = new UserRepository()
        const repositoryRepository = new RepositoryRepository()
        const repositoryStarsRepository = new RepositoryStarsRepository()

        if(!(validate(userId) && validate(repositoryId))) {
            throw new Error('Ids provided are not in UUID pattern')
        }

        const user = await userRepository.findByPk(userId)
        const repository = await repositoryRepository.findByPk(repositoryId)
    
        if(!user || !repository) {
            throw new Error('Ids provided did not match existing users or repositories')
        }

        const validateUserStar = await repositoryStarsRepository.findOne({
            where: {
                user_id: userId,
                repository_id: repositoryId
            }
        })

        if(validateUserStar) {
            throw new Error('The user already starred the provided repository')
        }
    
        const createdRepositoryStar = await repositoryStarsRepository.create({
            id: v4(),
            user_id: userId,
            repository_id: repositoryId
        })
    
    
        return createdRepositoryStar
    }
}