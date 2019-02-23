const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TaskSchema = new Schema({
  title: {
    type: String
  }
})

module.exports = Tasks = mongoose.model('tasks', TaskSchema)
