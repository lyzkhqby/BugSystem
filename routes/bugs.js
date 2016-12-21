/**
 * Created by rotoosoft-d04 on 2016/12/20.
 */
var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.sendfile('./views/bug.html');
});

router.get('/add', function (req, res, next) {
    res.sendfile('./views/addBug.html');
});

module.exports = router;