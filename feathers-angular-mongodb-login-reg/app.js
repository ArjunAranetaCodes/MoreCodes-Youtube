const feathers = require('@feathersjs/feathers');
const express = require('@feathersjs/express');
const user = require('./routes/Users')
const mongoose = require('mongoose');

const app = express(feathers());

mongoose.connect(
    'mongodb://localhost/nodejslogin',
    { useNewUrlParser: true, useFindAndModify: false }
)

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.configure(express.rest());

app.use(express.errorHandler());
app.use('/users', user);

const port = 3000;
app.listen(port, () => {
    console.log(`Server started at ${port}`);
});