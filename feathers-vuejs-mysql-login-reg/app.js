const feathers = require('@feathersjs/feathers');
const express = require('@feathersjs/express');
const user = require('./routes/Users')

const app = express(feathers());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.configure(express.rest());

app.use(express.errorHandler());
app.use('/users', user);

const port = 5000;
app.listen(port, () => {
    console.log(`Server started at ${port}`);
});