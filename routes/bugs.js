/**
 * Created by rotoosoft-d04 on 2016/12/20.
 */
var express = require('express');
var router = express.Router();
var bugDao = require('../dao/bugDao');

router.get('/', function (req, res, next) {
    res.sendfile('./views/bug.html');
});

router.get('/show', function (req, res, next) {
    bugDao.showBugs(req, res, next);
});

router.get('/add', function (req, res, next) {
    res.sendfile('./views/addBug.html');
});

router.get('/add/getModifiers', function (req, res, next) {
    bugDao.getModifiers(req, res, next);
});

router.get('/add/addBug', function (req, res, next) {
    bugDao.addBug(req, res, next);
});

router.get('/delete', function (req, res, next) {
    bugDao.deleteBug(req, res, next);
});

router.get('/modify', function (req, res, next) {
    res.sendfile('./views/modifyBug.html');
});

router.get('/modify/init', function (req, res, next) {
    bugDao.modifyInit(req, res, next);
});

router.get('/modify/modifyBug', function (req, res, next) {
    bugDao.modifyBug(req, res, next);
});


module.exports = router;