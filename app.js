const bodyParser = require('body-parser');
const express = require('express');
const expressValidator = require('express-validator');
const formData = require("express-form-data");
const nunjucks = require('nunjucks');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(expressValidator());

nunjucks.configure('views', {
    autoescape: true,
    express: app
});

module.exports = app;
