const express = require('express');

const app = require('./app');

app.get('/auth/register', function (req, res) {
    res.render('register.html', {title: 'Register'});
});

app.post('/auth/register', function (req, res) {
    req.checkBody('login', 'Invalid name').isAlpha().notEmpty();
    req.checkBody('password', 'Empty password').notEmpty();
    req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

    var errors = req.validationErrors();
    if (errors) {
        res.render('register.html', {title: 'Register', errors: errors, fields: {login: req.body.login}});
    } else {
        res.render('register.html', {title: 'Register'});
    }
});
