const { Model, DataTypes } = require('sequelize')

class Repository extends Model {
    static init(sequelize) {
        super.init({
            name: DataTypes.STRING,
            description: DataTypes.TEXT,
            public: DataTypes.BOOLEAN,
            slug: DataTypes.STRING,
        }, {
            sequelize
        })
    }

    static associate(models) {
        this.hasMany(models.RepositoriesStar, {
            foreignKey: 'repository_id',
            as: 'repositories_stars'
        })
    }
}

module.exports = Repository