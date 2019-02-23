const Sequelize = require('sequelize')
const sequelize = require('../database/db.js')

module.exports = sequelize.define(
  'tbl_tasks',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    task_name: {
      type: Sequelize.STRING
    }
  },
  {
    timestamps: false
  }
)
