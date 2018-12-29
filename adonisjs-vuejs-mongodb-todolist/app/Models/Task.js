'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
//const { Models, Model } = use('Model')

class Task extends Model {
  /*
  static get table() {
    return 'tasks'
  }
  static get primaryKey() {
    return 'id'
  }*/
}

//Models.add('App/Model/User', User)

module.exports = Task
