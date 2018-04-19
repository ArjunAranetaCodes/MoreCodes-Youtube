var express = require('express')
var router = express.Router()
var mongojs = require('mongojs')
var db = mongojs(
  'mongodb://arjunaraneta123:arjunaraneta123@ds119732.mlab.com:19732/mongotask',
  ['tasks']
)

// Get All Tasks
router.get('/tasks', function(req, res, next) {
  db.tasks.find({}, { _id: 1, title: 1 }, function(err, tasks) {
    if (err) {
      res.send(err)
    }

    var data = []
    Object.keys(tasks).forEach(function(key) {
      var val = tasks[key]
      data.push([val.title, val._id])
    })
    //res.json(tasks);
    //res.send(tasks);
    res.send(data)
  })
})

// Get Single Task
router.get('/task/:id', function(req, res, next) {
  db.tasks.findOne({ _id: mongojs.ObjectId(req.params.id) }, function(
    err,
    task
  ) {
    if (err) {
      res.send(err)
    }
    res.json(task)
  })
})

//Save Task
router.post('/task', function(req, res) {
  var task = req.body
  if (!task.title) {
    res.status(400)
    res.json({
      error: 'Bad Data'
    })
  } else {
    db.tasks.save(task, function(err, task) {
      if (err) {
        res.send(err)
      }
      res.json(task)
    })
  }
})

// Delete Task
router.delete('/task/:id', function(req, res) {
  db.tasks.remove({ _id: mongojs.ObjectId(req.params.id) }, function(
    err,
    task
  ) {
    if (err) {
      res.send(err)
    }
    res.json(task)
  })
})

// Update Task
router.put('/task/:id', function(req, res, next) {
  var task = req.body
  var updTask = {}

  if (task.isDone) {
    updTask.isDone = task.isDone
  }

  if (task.title) {
    updTask.title = task.title
  }

  if (!updTask) {
    res.status(400)
    res.json({
      error: 'Bad Data'
    })
  } else {
    db.tasks.update(
      { _id: mongojs.ObjectId(req.params.id) },
      updTask,
      {},
      function(err, task) {
        if (err) {
          res.send(err)
        }
        res.json(task)
      }
    )
  }
})

module.exports = router
