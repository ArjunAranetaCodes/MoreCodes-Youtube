const feathers = require('@feathersjs/feathers');
const express = require('@feathersjs/express');
const tasks = require('./routes/tasks')

const app = express(feathers());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.configure(express.rest());

app.use(express.errorHandler());
app.use('/api', tasks);

const port = 3030;
app.listen(port, () => {
    console.log(`Server started at ${port}`);
});