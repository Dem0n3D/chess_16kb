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
            const challenge = await db.collection("challenges").findOne({login: req.body.login, challenge: req.body.challenge});

            if (await bcrypt.hash(user.password, challenge.challenge) == req.body.response) {
                res.send("Success")
            } else {
                res.send("Error")
            }
        } catch (err) {
            res.send("Error")
        }
    });

    app.get('/auth/salt', async function (req, res) {
        try {
            const user = await db.collection("users").findOne({login: req.query.login});
            const salt = await bcrypt.getSalt(user.password);
            const challenge = await bcrypt.genSaltSync();
            await db.collection("challenges").insert({login: user.login, challenge});
            res.send(JSON.stringify({salt: salt, challenge: challenge}));
        } catch (e) {
            res.status(500).send("Internal error");
        }
    });
};
