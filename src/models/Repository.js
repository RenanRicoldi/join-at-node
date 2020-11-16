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
}

module.exports = Repository
