const Sequelize = require('sequelize')
const sequelize = new Sequelize('nodejs_tasks', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  operatorsAliases: false,
})

module.exports = sequelize
