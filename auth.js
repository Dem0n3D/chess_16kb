const {User} = require("./models");

const express = require('express');
const bcrypt = require('bcryptjs');

const app = require('./app');

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
            const user = new User({
                login: req.body.login,
                password: hash,
            });
            await user.save();
            await res.render('register.html', {title: 'Register'});
        } catch (err) {
            console.error(err)
        }
    }
});

app.get('/auth/login', function (req, res) {
    if (req.session.user_id) {
        res.redirect("/");
    } else {
        res.render('login.html', {title: 'Login'});
    }
});

app.post('/auth/login', async function (req, res) {
    try {
        const user = await User.findOne({login: req.body.login});

        if (user.challenges.filter(c => c == req.body.challenge).length == 1 &&
            await bcrypt.hash(user.password, req.body.challenge) == req.body.response) {
            req.session.user_id = user._id;
            res.send("Success");
        } else {
            res.send("Error");
        }
    } catch (err) {
        res.send("Error");
    }
});

app.get('/auth/salt', async function (req, res) {
    try {
        const user = await User.findOne({login: req.query.login});
        const salt = await bcrypt.getSalt(user.password);
        const challenge = await bcrypt.genSaltSync();
        user.challenges.push(challenge);
        await user.save();
        res.send(JSON.stringify({salt: salt, challenge: challenge}));
    } catch (e) {
        console.log(e);
        res.status(500).send("Internal error");
    }
});
