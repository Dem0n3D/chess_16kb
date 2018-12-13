const bodyParser = require('body-parser');
const express = require('express');
const expressValidator = require('express-validator');
const nunjucks = require('nunjucks');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');
const Sentry = require('@sentry/node');

const app = express();

var expressWs = require('express-ws')(app);

Sentry.init({dsn: 'https://6e93c840723c4750932e368fdac8bda3@sentry.io/1333291'});

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.errorHandler());

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
