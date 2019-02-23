var Koa = require('koa')
var app = new Koa()
const bodyParser = require('koa-body')

const tasks = require('./routes/tasks')

app.use(bodyParser())
app.use(tasks.routes())

app.listen(5000, () => {
  console.log('Server running at port 5000')
})
