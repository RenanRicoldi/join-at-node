const { v4 } = require('uuid')

const Validator = require('validatorjs')
const UserRepository = require('../repositories/UserRepository')
const RepositoryRepository = require('../repositories/RepositoryRepository')

module.exports = {
    execute: async ({ name, description, public, username, slug }) => {
        const userRepository = new UserRepository()
        const repositoryRepository = new RepositoryRepository()

        const rules = {
            name: 'string|required',
            description: 'string',
            public: 'boolean|required',
            username: 'string|required',
            slug: 'string|required'
        }

        const validation = new Validator({
            name,
            description,
            public,
            username,
            slug
        }, rules)

        if(validation.fails()) {
            throw new Error('Not all necessary fields provided or fields are not in correct format')
        }

        const user = await userRepository.findOne({
            where: {
                username
            }
        })
        
        if(!user) {
            throw new Error('No users found with the provided username')
        } 

        name = name.split(' ').join('-')
        slug = slug.endsWith('/') ? `${slug}${username}/${name}` : `${slug}/${username}/${name}`

        const repository = await repositoryRepository.findOne({
            where: {
                slug
            }
        })

        if(repository) {
            throw new Error('There\'s already a repository with this name for the provided username')
        }

        const created = await repositoryRepository.create({
            id: v4(),
            name,
            description: description === undefined ? null : description,
            public,
            slug
        })

        return created
    }
}