const express = require('express');
const bcrypt = require('bcryptjs');

const app = require('./app');

module.exports = function (db) {
    app.get('/auth/register', function (req, res) {
        res.render('register.html', {title: 'Register'});
    });

    app.post('/auth/register', async function (req, res) {
        req.checkBody('login', 'Invalid name').isAlphanumeric().notEmpty();
        req.checkBody('password', 'Empty password').notEmpty();
        req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

        var errors = req.validationErrors();
        if (errors) {
            res.render('register.html', {title: 'Register', errors: errors, fields: {login: req.body.login}});
        } else {
            try {
                const hash = await bcrypt.hash(req.body.password, 10);
                const user = {
                    login: req.body.login,
                    password: hash,
                };
                await db.collection("users").insert(user);
                await res.render('register.html', {title: 'Register'});
            } catch (err) {
                console.error(err)
            }
        }
    });

    app.get('/auth/login', function (req, res) {
        res.render('login.html', {title: 'Login'});
    });

    app.post('/auth/login', async function (req, res) {
        try {
            const user = await db.collection("users").findOne({login: req.body.login});

            if (await bcrypt.compare(req.body.password, user.password)) {
                console.log("Success")
            }
        } catch (err) {
            console.log(err)
        }
    });
};
