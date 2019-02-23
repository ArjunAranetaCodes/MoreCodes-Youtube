'use strict'

const mongoose = require('mongoose')
const Task = require('../models/Task')

exports.plugin = {
  register: (server, options) => {
    server.route({
      method: 'GET',
      path: '/tasks',
      handler: (req, h) => {
        return Task.find((err, res) => {
          if (err) {
            return err
          }

          return res
        })
      }
    })

    server.route({
      method: 'GET',
      path: '/task/{id}',
      handler: (req, h) => {
        return Task.findOne(
          {
            _id: mongoose.Types.ObjectId(req.params.id)
          },
          (err, doc) => {
            if (err) {
              return err
            }

            if (!doc) {
              return 'Not Found'
            }

            return doc
          }
        )
      }
    })

    server.route({
      method: 'POST',
      path: '/task',
      handler: (req, h) => {
        var task = new Task()
        task.title = req.payload.title

        return task.save().then((err, res) => {
          if (err) {
            return err
          }

          return res
        })
      }
    })

    server.route({
      method: 'PUT',
      path: '/task/{id}',
      handler: (req, h) => {
        var task = new Task()
        return Task.findOneAndUpdate(
          { _id: req.params.id },
          { title: req.payload.title },
          (err, result) => {
            if (err) {
              return err
            }

            if (result.n === 0) {
              return 'Not Found'
            }

            return 204
          }
        )
      }
    })

    server.route({
      method: 'DELETE',
      path: '/task/{id}',
      handler: (req, h) => {
        return Task.deleteOne(
          {
            _id: req.params.id
          },
          (err, result) => {
            if (err) {
              return err
            }

            if (result.n === 0) {
              return 'Not Found'
            }

            return 204
          }
        )
      }
    })
  },
  name: 'api'
}
