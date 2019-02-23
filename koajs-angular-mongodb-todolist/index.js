var Koa = require('koa')
var app = new Koa()
const bodyParser = require('koa-body')
const mongoose = require('mongoose')

const tasks = require('./routes/tasks')

app.use(bodyParser())
app.use(tasks.routes())

mongoose.connect(
  'mongodb://localhost/merntasks',
  { useNewUrlParser: true }
)

app.listen(5000, () => {
  console.log('Server running at port 5000')
})
