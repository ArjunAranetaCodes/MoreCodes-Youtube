'use strict'

const Hapi = require('hapi')

const server = new Hapi.Server({
  host: 'localhost',
  port: 5000,
  routes: {
    cors: true
  }
})

const init = async () => {
  await server.register(
    { plugin: require('./routes/Users') },
    {
      routes: {
        prefix: '/users'
      }
    },
    err => {
      if (err) {
        throw err
      }
    }
  )
  await server.start()
  console.log(`Server running at: ${server.info.uri}`)
}

init()
