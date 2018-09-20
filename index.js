const express = require('express');

const router = require("./chess/router");


const app = require('./app');

app.get('/', function (req, res) {
    res.send('hello world')
});

app.use('/chess', router);
