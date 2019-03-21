const Sequelize = require('sequelize')
const db = {}
const sequelize = new Sequelize('nodejs_tasks', 'root1', '', {
  host: 'localhost',
  dialect: 'mysql'
})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
