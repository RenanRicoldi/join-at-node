const config = require('./config/config.json')
const { Sequelize } = require('sequelize')

const User = require('../models/User')
const Token = require('../models/Token')

const sequelize = new Sequelize(config.development)

User.init(sequelize)
Token.init(sequelize)

User.associate(sequelize.models)
Token.associate(sequelize.models)

module.exports = sequelize