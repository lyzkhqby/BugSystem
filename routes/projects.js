/**
 * Created by zk on 2016/12/18.
 */
var express = require('express');
var router = express.Router();

router.get('/addProject', function (req, res, next) {
    res.sendfile('./views/addProject.html');
});

module.exports = router;