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