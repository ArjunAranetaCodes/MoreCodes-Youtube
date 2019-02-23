const Sequelize = require('sequelize')
const sequelize = new Sequelize('nodejs_tasks', 'root1', '', {
  host: 'localhost',
  dialect: 'mysql',
  operatorsAliases: false
})

module.exports = sequelize
