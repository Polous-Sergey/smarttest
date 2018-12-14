const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require('passport');
const logger = require('morgan');
const errorHandler = require('./config/error-handler');

// bring in the data model
require('./models/db');

// bring in the Passport config
require('./config/passport');

app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

// initialise passport
app.use(passport.initialize());

// api routes
app.use('/api', require('./routes/index'));

// global error handler
app.use(errorHandler);

// start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;
app.listen(port, function () {
    console.log('API Started on port ' + port);
});