/**
 * Optionizr 2016 all rights reserved
 * Author : guillaume.didier@optionizr.com
 **/

/**
 * Demo controller, retrieve air france flights, sample code
 **/

var request = require("request");
var moment = require("moment");
var util = require("util");


/**
 * Index, render search form
 **/
exports.getIndex = function (req, res) {
    return res.render("index.ejs", {
        error: "",
        prenom: req.session.user ? req.session.user.prenom : null
    });
};
exports.getUser = function (req, res) {
    var obj = req.session.user;
    obj.error = "";

    return res.render("user.ejs", obj);
};
exports.getLogin = function (req, res) {
    if (req.session.user) {
        res.redirect('/');
        return;
    }

    return res.render("login.ejs", {
        error: ""
    });
};
exports.getSingup = function (req, res) {
    return res.render("signup.ejs", {
        error: ""
    });
};

var UserSchema = require("../models/users");

exports.postLogin = function (req, res, next) {
    UserSchema.findOne({mail: req.body.mail, password: req.body.password}, function (err, user) {
        if (err) return next(err);
        if (!user) return res.send('Not logged in!');

        req.session.user = user;

        return res.redirect('/');
    });
};
exports.postSignup = function (req, res) {
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

        return exports.postLogin(req, res);
    });
};
exports.logout = function (req, res) {
    req.session.user = null;
    return res.redirect('/');
};

exports.updateUser = function (req, res) {
    UserSchema.findOneAndUpdate({mail: req.session.user.mail}, req.body, {upsert:true}, function (err, user) {
        if (err) return next(err);
        if (!user) return res.send('Error');

        req.session.user = user;

        return res.redirect('/user');
    });
};
exports.deleteUser = function (req, res) {
    UserSchema.remove({mail: req.session.user.mail}, function (err, user) {
        if (err) return next(err);
        if (!user) return res.send('Error');

        req.session.user = null;

        return res.status(200).send();
    });
};

