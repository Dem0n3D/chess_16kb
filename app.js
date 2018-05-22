const bodyParser = require('body-parser');
const express = require('express');
const expressValidator = require('express-validator');
const nunjucks = require('nunjucks');
const session = require('express-session');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(expressValidator());
app.use(express.static('static'));
app.use(session({secret: 'keyboard cat'}));

nunjucks.configure('views', {
    autoescape: true,
    express: app
});

module.exports = app;
