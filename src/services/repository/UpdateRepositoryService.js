const Validator = require('validatorjs')

const RepositoryRepository = require('../../repositories/RepositoryRepository')
const deleteNullProperties = require('../../utils/deleteNullProperties')
const filterRepository = require('../../utils/filterRepository')

module.exports = {
    execute: async(newProperties, repositoryId) => {
        const repositoryRepository = new RepositoryRepository()

        const filteredNewProperties = deleteNullProperties(newProperties)

        const rules = {
            name: 'string',
            description: 'string',
            public: 'boolean',
            slug: 'string'
        }
        
        const validation = new Validator(filteredNewProperties, rules)

        if(validation.fails()) {
            throw new Error('Fields are not in correct format')
        }

        const repository = await repositoryRepository.findByPk(repositoryId)

        if(!repository) {
            throw new Error('No users found with the provided id')
        }

        let slug = repository.slug

        if(filteredNewProperties.slug) {
            let oldSlug = slug.split('/')

            let repositoryName = oldSlug.pop()
            let username = oldSlug.pop()

            filteredNewProperties.slug = filteredNewProperties.slug.endsWith('/') ? 
                `${filteredNewProperties.slug}${username}/${repositoryName}` : 
                `${filteredNewProperties.slug}/${username}/${repositoryName}`
            
            slug = filteredNewProperties.slug
        }

        if(filteredNewProperties.name) {
            filteredNewProperties.name = filteredNewProperties.name.split(' ').join('-')

            let oldSlug = slug.split('/')

            oldSlug.pop()
            oldSlug.push(filteredNewProperties.name)

            filteredNewProperties.slug = oldSlug.join('/')

        }
        
        await repositoryRepository.update(filteredNewProperties, { 
            where: {
                id: repositoryId
            },
            returning: true        
        })
        
        await repository.reload()

        const filteredRepository = filterRepository(repository)
     
        return filteredRepository
    }
}