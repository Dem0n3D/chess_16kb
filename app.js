const bodyParser = require('body-parser');
const express = require('express');
const expressValidator = require('express-validator');
const nunjucks = require('nunjucks');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(expressValidator());
app.use(express.static('static'));

nunjucks.configure('views', {
    autoescape: true,
    express: app
});

module.exports = app;
