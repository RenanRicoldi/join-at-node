const { Model } = require('sequelize')

class RepositoriesStar extends Model {
    static init(sequelize) {
        super.init({}, {
            sequelize
        })
    }

    static associate(models) {
        this.belongsTo(models.User, {
            foreignKey: 'user_id',
            as: 'user'
        })

        this.belongsTo(models.Repository, {
            foreignKey: 'repository_id',
            as: 'repository'
        })
    }
}

module.exports = RepositoriesStar