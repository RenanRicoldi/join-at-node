const Repository = require('../models/Repository')
const filterRepository = require('../utils/filterRepository')

const { Op } = require('sequelize')

class RepositoryRepository {
    async findRepositories() {
        try {
            const repositories = await Repository.findAndCountAll()            

            const filteredRepositories = {
                data: repositories.rows.map(repository => filterRepository(repository)),
                count: repositories.count
            }

            return filteredRepositories
        } catch(error) {                
            throw new Error('Failed to find repositories')
        }        
    }

    async findRepositoriesByUsername(username) {
        try {
            const repositories = await Repository.findAndCountAll({
                where: {
                    slug: {
                        [Op.like]: `%/${username}/%`
                    }
                }
            })

            const filteredRepositories = {
                data: repositories.rows.map(repository => filterRepository(repository)),
                count: repositories.count
            }
    
            return filteredRepositories
        } catch (error) {
            throw new Error('No repositories found with the provided username')
        }
    }

    async deleteRepository(repositoryId) {
        try {
            const repository = await Repository.findByPk(repositoryId)

            if(!repository) {
                throw new Error('No repositories found with the provided id')
            }

            const status = await Repository.destroy({
                where: {
                    id: repositoryId
                }
            })

            if(status !== 1) {
                throw new Error('Failed to delete repository')
            }

            return repository
        } catch (error) {
            throw new Error('No repositories found with the provided id')
        }
    }       

    async create(repository) {
        const created = await Repository.create(repository)

        return created
    }

    async findOne(options) {
        const repository = await Repository.findOne(options)

        return repository
    }

    async update(properties, options) {
        await Repository.update(properties, options)
    }

    async findByPk(id) {
        const repository = await Repository.findByPk(id)

        return repository
    }
}

module.exports = RepositoryRepository