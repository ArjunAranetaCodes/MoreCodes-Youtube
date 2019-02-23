const Router = require('koa-router')
const router = new Router()
const Task = require('../models/Task')

router.get('/api/tasks', async ctx => {
  await Task.find()
    .then(tasks => {
      ctx.body = tasks
    })
    .catch(err => {
      ctx.body = 'error: ' + err
    })
})

router.post('/api/task', async ctx => {
  if (!ctx.request.body.task_name) {
    ctx.body = {
      error: 'Bad Data'
    }
  } else {
    var task = new Task()
    task.task_name = ctx.request.body.task_name
    await task
      .save()
      .then(data => {
        ctx.body = data
      })
      .catch(err => {
        ctx.body = 'error: ' + err
      })
  }
})

router.delete('/api/task/:id', async ctx => {
  await Task.deleteOne({
    _id: ctx.params.id
  })
    .then(() => {
      ctx.body = { status: 'Task Deleted!' }
    })
    .catch(err => {
      ctx.body = 'error: ' + err
    })
})

router.put('/api/task/:id', async ctx => {
  if (!ctx.request.body.task_name) {
    ctx.body = {
      error: 'Bad Data'
    }
  } else {
    await Task.findOneAndUpdate(
      { _id: ctx.params.id },
      { task_name: ctx.request.body.task_name }
    )
      .then(() => {
        ctx.body = { status: 'Task Updated!' }
      })
      .catch(err => {
        ctx.body = 'error: ' + err
      })
  }
})

module.exports = router
