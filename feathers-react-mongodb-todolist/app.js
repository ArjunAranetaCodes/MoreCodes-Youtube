const feathers = require('@feathersjs/feathers');
const express = require('@feathersjs/express');
const tasks = require('./routes/tasks')
const mongoose = require('mongoose');

const app = express(feathers());

mongoose.connect(
    'mongodb://localhost/nodejstasks',
    { useNewUrlParser: true, useFindAndModify: false }
)

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.configure(express.rest());

app.use(express.errorHandler());
app.use('/api', tasks);

const port = 3030;
app.listen(port, () => {
    console.log(`Server started at ${port}`);
});