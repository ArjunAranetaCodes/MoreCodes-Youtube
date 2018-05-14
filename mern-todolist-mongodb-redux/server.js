var express = require('express')
var bodyParser = require('body-parser')
var tasks = require('./routes/tasks')
const cors = require('cors')

var port = 5000

var app = express()

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true
  })
)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/api', tasks)

app.listen(port, function() {
  console.log('Server started on port ' + port)
})
