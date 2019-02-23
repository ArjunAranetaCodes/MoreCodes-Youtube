const Sequelize = require('sequelize')
const db = require('../database/db.js')

module.exports = db.sequelize.define(
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
