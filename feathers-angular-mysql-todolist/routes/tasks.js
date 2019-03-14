const feathers = require('@feathersjs/feathers');
const express = require('@feathersjs/express');
const app = express(feathers());
const Task = require('../models/Task');

app.get('/tasks', function (req, res, next) {
    Task.findAll()
        .then(tasks => {
            res.json(tasks)
        })
        .catch(err => {
            res.send('error: ' + err)
        })
})

app.get('/task/:id', function (req, res, next) {
    Task.findOne({
        where: {
            id: req.params.id
        }
    })
        .then(task => {
            if (task) {
                res.json(task)
            } else {
                res.send('Task does not exist')
            }
        })
        .catch(err => {
            res.send('error: ' + err)
        })
})

app.post('/task', function (req, res, next) {
    if (!req.body.task_name) {
        res.status(400)
        res.json({
            error: 'Bad Data'
        })
    } else {
        Task.create(req.body)
            .then(data => {
                res.send(data)
            })
            .catch(err => {
                res.json('error: ' + err)
            })
    }
})

app.delete('/task/:id', function (req, res, next) {
    Task.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(() => {
            res.json({ status: 'Task Deleted!' })
        })
        .catch(err => {
            res.send('error: ' + err)
        })
})

app.put('/task/:id', function (req, res, next) {
    if (!req.body.task_name) {
        res.status(400)
        res.json({
            error: 'Bad Data'
        })
    } else {
        Task.update(
            { task_name: req.body.task_name },
            { where: { id: req.params.id } }
        )
            .then(() => {
                res.json({ status: 'Task Updated!' })
            })
            .error(err => handleError(err))
    }
})


module.exports = app