'use strict'

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.createTable('repositories_stars', {
            id: {
                type: Sequelize.UUID,
                primaryKey: true,
                allowNull: false
            },
            user_id: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {
                    model: 'users',
                    key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            },
            repository_id: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {
                    model: 'repositories',
                    key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            },
            created_at: {
                type: Sequelize.DATE,
                allowNull: false
            },
            updated_at: {
                type: Sequelize.DATE,
                allowNull: false
            }
        })
    },

    down: async (queryInterface, Sequelize) => {
        return queryInterface.dropTable('repositories_stars')
    }
}
