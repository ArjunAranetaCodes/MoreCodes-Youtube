'use strict'
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const User = require('../models/User')

process.env.SECRET_KEY = 'secret'

exports.plugin = {
  register: (server, options, next) => {
    server.route({
      method: 'POST',
      path: '/register',
      handler: (req, h) => {
        const today = new Date()
        const userData = {
          first_name: req.payload.first_name,
          last_name: req.payload.last_name,
          email: req.payload.email,
          password: req.payload.password,
          created: today
        }

        return User.findOne({
          where: {
            email: req.payload.email
          }
        })
          .then(user => {
            if (!user) {
              bcrypt.hash(req.payload.password, 10, (err, hash) => {
                userData.password = hash
                return User.create(userData)
                  .then(user => {
                    return { status: user.email + ' Registered!' }
                  })
                  .catch(err => {
                    return 'error: ' + err
                  })
              })
            } else {
              return { error: 'User already exists' }
            }
            return user
          })
          .catch(err => {
            return 'error: ' + err
          })
      }
    })

    server.route({
      method: 'POST',
      path: '/login',
      handler: (req, h) => {
        return User.findOne({
          where: {
            email: req.payload.email
          }
        })
          .then(user => {
            if (user) {
              if (bcrypt.compareSync(req.payload.password, user.password)) {
                let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
                  expiresIn: 1440
                })
                return { token: token }
              }
            } else {
              return { error: 'User does not exist' }
            }
          })
          .catch(err => {
            return { error: err }
          })
      }
    })

    server.route({
      method: 'GET',
      path: '/profile',
      handler: (req, h) => {
        var decoded = jwt.verify(
          req.headers['authorization'],
          process.env.SECRET_KEY
        )

        return User.findOne({
          where: {
            id: decoded.id
          }
        })
          .then(user => {
            if (user) {
              return user
            } else {
              return 'User does not exist'
            }
          })
          .catch(err => {
            return 'error: ' + err
          })
      }
    })
  },
  name: 'users'
}
