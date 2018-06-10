'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

/** @type {import('@adonisjs/framework/src/Route/Manager'} */
const Route = use('Route')

Route.group(() => {
  Route.get('tasks', 'TaskController.index')
  Route.post('task', 'TaskController.store')
  Route.get('task', 'TaskController.index')
  Route.get('task/:id', 'TaskController.show')
  Route.put('task/:id', 'TaskController.update')
  Route.delete('task/:id', 'TaskController.delete')
}).prefix('api')

Route.group(() => {
  Route.post('login', 'UserController.login')
  Route.post('register', 'UserController.register')
  Route.get('getuser/:id', 'UserController.show')
}).prefix('users')
