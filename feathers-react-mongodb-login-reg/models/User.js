const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create Schema
const TaskSchema = new Schema({
  first_name: {
    type: String
  },
  last_name: {
    type: String
  },
  email: {
    type: String
  },
  password: {
    type: String
  },
  created: {
    type: Date,
    default: Date.now
  }
})

module.exports = User = mongoose.model('user', TaskSchema)
