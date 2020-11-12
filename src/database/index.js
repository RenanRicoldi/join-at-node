const config = require('./config/config.json')
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(config.development)

module.exports = sequelize