require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const errorHandler = require('_helpers/error-handler');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use('/users', require('app/controllers/userController'));

app.use(errorHandler);

const server = app.listen(3000, function () {
    console.log('Server listening on port 3000');
});
