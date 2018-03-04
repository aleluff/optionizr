var express = require('express');
var router = express.Router();
var UserSchema = require("../models/users");

var login = function(req, res, next) {
    UserSchema.findOne({mail: req.body.mail, password: req.body.password}, function (err, user) {
        if (err) return next(err);
        if (!user) return res.send('Not logged in!');

        req.session.user = user;

        res.redirect('/');
    });
};

router.post('/login', login);

router.post('/signup', function(req, res) {
    var user = new UserSchema({
        nom: req.body.nom,
        prenom: req.body.prenom,
        password: req.body.password,
        mail: req.body.mail,
        age: req.body.age,
        pays: req.body.pays,
    })
    user.save(function (err) {
        if (err) {
            if (err.name === 'MongoError' && err.code === 11000) {
                return res.status(500).send({succes: false, message: 'User already exist!'});
            }
            return res.status(500).send(err);
        }

        login(req, res);
    });
});

router.post('/logout', function (req, res) {
    req.session.user = null;
    res.redirect('/');
});

router.post('/update', function (req, res) {
    UserSchema.findOneAndUpdate({mail: req.session.user.mail}, req.body, {upsert: true}, function (err, user) {
        if (err) return next(err);
        if (!user) return res.send('Error');

        req.session.user = req.body;

        res.redirect('/user');
    });
});

router.post('/delete', function (req, res) {
    UserSchema.remove({mail: req.session.user.mail}, function (err, user) {
        if (err) return next(err);
        if (!user) return res.send('Error');

        req.session.user = null;

        res.redirect('/');
    });
});

module.exports.router = router;