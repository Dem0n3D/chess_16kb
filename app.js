const bodyParser = require('body-parser');
const express = require('express');
const expressValidator = require('express-validator');
const nunjucks = require('nunjucks');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(expressValidator());
app.use('/static', express.static('static'));
app.use(session({
    secret: 'keyboard cat',
    store: new MongoStore({ mongooseConnection: mongoose.connection })
}));

nunjucks.configure('views', {
    autoescape: true,
    express: app
});

module.exports = app;
