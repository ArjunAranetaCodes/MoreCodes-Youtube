'use strict'

const Task = require('../models/Task')

exports.plugin = {
  register: (server, options) => {
    server.route({
      method: 'GET',
      path: '/tasks',
      handler: (req, h) => {
        return Task.findAll()
          .then(tasks => {
            return tasks
          })
          .catch(err => {
            return 'error: ' + err
          })
      }
    })

    server.route({
      method: 'GET',
      path: '/task/{id}',
      handler: (req, h) => {
        return Task.findOne({
          where: {
            id: req.params.id
          }
        })
          .then(task => {
            if (task) {
              return task
            } else {
              return 'Task does not exist'
            }
          })
          .catch(err => {
            return 'error: ' + err
          })
      }
    })

    server.route({
      method: 'POST',
      path: '/task',
      handler: (req, h) => {
        const task = request.payload

        if (!task.task_name) {
          return {
            error: 'Bad Data'
          }
        } else {
          return Task.create(task)
            .then(data => {
              return data
            })
            .catch(err => {
              return 'error: ' + err
            })
        }
      }
    })

    server.route({
      method: 'PUT',
      path: '/task/{id}',
      handler: (req, h) => {
        if (!req.payload.task_name) {
          return {
            error: 'Bad Data'
          }
        } else {
          return Task.update(
            { task_name: req.payload.task_name },
            { where: { id: req.params.id } }
          )
            .then(() => {
              return { status: 'Task Updated!' }
            })
            .error(err => handleError(err))
        }
      }
    })

    server.route({
      method: 'DELETE',
      path: '/task/{id}',
      handler: (req, h) => {
        return Task.destroy({
          where: {
            id: req.params.id
          }
        })
          .then(() => {
            return { status: 'Task Deleted!' }
          })
          .catch(err => {
            return 'error: ' + err
          })
      }
    })
  },
  name: 'api'
}
