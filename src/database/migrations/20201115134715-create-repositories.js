'use strict'

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.createTable('repositories', {
            id: {
                type: Sequelize.UUID,
                primaryKey: true,
                allowNull: false
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false
            },
            description: {
                type: Sequelize.TEXT
            },
            public: {
                type: Sequelize.BOOLEAN,
                allowNull: false
            },
            slug: {
                type: Sequelize.STRING,
                allowNull: false
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
        return queryInterface.dropTable('repositories')
    }
}
