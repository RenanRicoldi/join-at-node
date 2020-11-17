const Validator = require('validatorjs')
const { Op } = require('sequelize')

const filterUser = require('../../utils/filterUser')
const deleteNullProperties = require('../../utils/deleteNullProperties')
const UserRepository = require('../../repositories/UserRepository')
const RepositoryRepository = require('../../repositories/RepositoryRepository')

module.exports = {
    execute: async (newProperties, userId) => {
        const userRepository = new UserRepository()

        const filteredNewProperties = deleteNullProperties(newProperties)

        const rules = {
            name: 'string',
            email: 'email',
            localization: 'string',
            avatar: 'url',
            username: 'string',
            bio: 'string',
        }
        
        const validation = new Validator(filteredNewProperties, rules)

        if(validation.fails()) {
            throw new Error('Fields are not in correct format')
        }

        const user = await userRepository.findByPk(userId)

        if(!user) {
            throw new Error('No users found with the provided id')
        }

        let email = filteredNewProperties.email === undefined ? null : filteredNewProperties.email
        let username = filteredNewProperties.username === undefined ? null : filteredNewProperties.username.split(' ').join('-')

        const userValidate = await userRepository.findOne({ 
            where: {
                [Op.or]: [
                    { email },
                    { username }
                ]
            }
        })

        if(userValidate) {
            throw new Error('There\'s aleady an user with the provided information')
        } 
        
        if(username) {
            const repositoryRepository = new RepositoryRepository()

            const repository = await repositoryRepository.findOne({
                where: {
                    slug: {
                        [Op.like]: `%/${user.username}/%`
                    }
                }
            })

            if(repository) {
                let oldSlug = repository.slug.split('/')

                oldSlug[oldSlug.length - 2] = username
                
                await repositoryRepository.update({
                    slug: oldSlug.join('/')
                }, {
                    where: {
                        slug: {
                            [Op.like]: `%/${user.username}/%`
                        }
                    }
                })
            }
        }

        if(username) {
            filteredNewProperties.username = username
        }

        await userRepository.update(filteredNewProperties, { 
            where: {
                id: userId
            },
            returning: true        
        })
        
        await user.reload()

        const filteredUser = filterUser(user)
     
        return filteredUser
    }
}