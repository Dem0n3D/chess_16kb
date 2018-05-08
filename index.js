const express = require('express');

const app = require('./app');

module.exports = function (database) {
// respond with "hello world" when a GET request is made to the homepage
    app.get('/', function (req, res) {
        res.send('hello world')
    });
};
