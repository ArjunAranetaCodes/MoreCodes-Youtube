const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create Schema
const TaskSchema = new Schema({
  title: {
    type: String
  }
})

module.exports = User = mongoose.model('tasks', TaskSchema)
