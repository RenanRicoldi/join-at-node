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

    static associate(models) {
        this.hasMany(models.Token, {
            foreignKey: 'user_id',
            as: 'tokens'
        })

        this.hasMany(models.Follower, {
            foreignKey: 'user_id',
            as: 'followers'
        })
    }
}

module.exports = User
