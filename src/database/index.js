const config = require('./config/config.json')
const { Sequelize } = require('sequelize')

const User = require('../models/User')

const sequelize = new Sequelize(config.development)

User.init(sequelize)

module.exports = sequelize