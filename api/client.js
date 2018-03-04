var express = require('express');
var router = express.Router();

router.get('/',function(req, res){
    res.send('Get all users.');
});

router.post('/', function(req, res) {
    // Create user
    res.send('Some response.');
});

module.exports.router = router;