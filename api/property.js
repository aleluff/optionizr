var express = require('express');
var router = express.Router();

var PropertySchema = require("../models/properties");

router.post('/', function(req, res) {
    var datatablesQuery = require('datatables-query'),
        params = req.body,
        query = datatablesQuery(PropertySchema);

    query.run(params).then(function (data) {
        res.json(data);
    }, function (err) {
        res.status(500).json(err);
    });
});

module.exports.router = router;