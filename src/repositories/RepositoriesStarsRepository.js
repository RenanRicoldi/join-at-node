const RepositoryStars = require('../models/RepositoriesStar')
const filterRepository = require('../utils/filterRepository')

const { Op } = require('sequelize')
const { validate } = require('uuid')

class RepositoryStarsRepository {
    async findRepositoriesStars() {
        try {
            const repositoriesStars = await RepositoryStars.findAndCountAll()            

            const filteredRepositoriesStars = {
                data: repositoriesStars.rows,
                count: repositoriesStars.count
            }

            return filteredRepositoriesStars
        } catch(error) {                
            throw new Error('Failed to find repositories stars')
        }        
    }

    async findRepositoryStarsByRepositoryId(repositoryId) {
        try {
            const repositoriesStars = await RepositoryStars.findAndCountAll({
                where: {
                    repository_id: repositoryId
                }
            })

            if(!repositoriesStars) {
                throw new Error('No repository stars found with the provided id')
            }

            const filteredRepositoriesStars = {
                data: repositoriesStars.rows,
                count: repositoriesStars.count
            }
    
            return filteredRepositoriesStars
        } catch (error) {
            throw new Error('No repository stars found with the provided id')
        }
    }

    async deleteRepositoryStars(repositoryId) {
        try {
            const repository = await RepositoryStars.findByPk(repositoryId)

            if(!repository) {
                throw new Error('No repository stars found with the provided id')
            }

            const status = await RepositoryStars.destroy({
                where: {
                    id: repositoryId
                }
            })

            if(status !== 1) {
                throw new Error('Failed to delete repository stars')
            }

            return repository
        } catch (error) {
            throw new Error('No repository stars found with the provided id')
        }
    }       

    async create(repositoryStars) {
        const created = await RepositoryStars.create(repositoryStars)

        return created
    }

    async findOne(options) {
        const repository = await RepositoryStars.findOne(options)

        return repository
    }

    async update(properties, options) {
        await RepositoryStars.update(properties, options)
    }

    async findByPk(id) {
        const repository = await RepositoryStars.findByPk(id)

        return repository
    }
}

module.exports = RepositoryStarsRepository