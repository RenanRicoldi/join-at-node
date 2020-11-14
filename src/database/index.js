const config = require('./config/config.json')
const { Sequelize } = require('sequelize')

const User = require('../models/User')
const Token = require('../models/Token')
const Follower = require('../models/Follower')

const sequelize = new Sequelize(config.development)

User.init(sequelize)
Token.init(sequelize)
Follower.init(sequelize)

User.associate(sequelize.models)
Token.associate(sequelize.models)
Follower.associate(sequelize.models)

module.exports = sequelize