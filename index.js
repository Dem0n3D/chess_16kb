const express = require('express');

const app = require('./app');

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function (req, res) {
    res.send('hello world')
});

app.use(express.static('static'));
