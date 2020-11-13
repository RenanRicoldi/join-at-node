const { Model, DataTypes } = require('sequelize')

class User extends Model {
    static init(sequelize) {
        super.init({
            name: DataTypes.STRING,
            email: DataTypes.STRING,
            localization: DataTypes.STRING,
            avatar: DataTypes.STRING,
            username: DataTypes.STRING,
            bio: DataTypes.TEXT,
        }, {
            sequelize
        })
    }
}

module.exports = User
