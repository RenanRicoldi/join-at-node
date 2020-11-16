const config = require('./config/config.json')
const { Sequelize } = require('sequelize')

const User = require('../models/User')
const Token = require('../models/Token')
const Follower = require('../models/Follower')
const Following = require('../models/Following')
const Repository = require('../models/Repository')
const RepositoriesStar = require('../models/RepositoriesStar')

const sequelize = new Sequelize(config.development)

User.init(sequelize)
Token.init(sequelize)
Follower.init(sequelize)
Following.init(sequelize)
Repository.init(sequelize)
RepositoriesStar.init(sequelize)

User.associate(sequelize.models)
Token.associate(sequelize.models)
Follower.associate(sequelize.models)
Following.associate(sequelize.models)
Repository.associate(sequelize.models)
RepositoriesStar.associate(sequelize.models)

module.exports = sequelize