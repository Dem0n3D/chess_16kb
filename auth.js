const express = require('express');
const bcrypt = require('bcryptjs');

const app = require('./app');

module.exports = function (db) {
    app.get('/auth/register', function (req, res) {
        res.render('register.html', {title: 'Register'});
    });

    app.post('/auth/register', function (req, res) {
        req.checkBody('login', 'Invalid name').isAlphanumeric().notEmpty();
        req.checkBody('password', 'Empty password').notEmpty();
        req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

        var errors = req.validationErrors();
        if (errors) {
            res.render('register.html', {title: 'Register', errors: errors, fields: {login: req.body.login}});
        } else {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                const user = {
                    login: req.body.login,
                    password: hash,
                };

                db.collection("users").insert(user, (err, result) => {
                    res.render('register.html', {title: 'Register'});
                });
            });
        }
    });
};
