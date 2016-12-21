/**
 * Created by rotoosoft-d04 on 2016/12/20.
 */
var express = require('express');
var router = express.Router();
var bugDao = require('../dao/bugDao');

router.get('/', function (req, res, next) {
    res.sendfile('./views/bug.html');
});

router.get('/add', function (req, res, next) {
    res.sendfile('./views/addBug.html');
});

router.get('/add/getModifiers', function (req, res, next) {
    bugDao.getModifiers(req, res, next);
});

module.exports = router;