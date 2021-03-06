var express = require('express');
var router = express.Router();
var userDao = require('../dao/userDao');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// 增加用户
router.get('/addUser', function(req, res, next) {
    userDao.add(req, res, next);
});

//验证登录
router.get('/verify', function (req, res, next) {
    userDao.verify(req, res, next);
});

//用户界面
router.get('/main', function (req, res, next) {
    res.sendfile('./views/main.html');
});

module.exports = router;
