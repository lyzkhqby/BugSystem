/**
 * Created by zk on 2016/12/18.
 */
var express = require('express');
var router = express.Router();
var projectDao = require('../dao/projectDao');

router.get('/addProject', function (req, res, next) {
    res.sendfile('./views/addProject.html');
});

router.get('/addProject/add', function (req, res, next) {
    projectDao.add(req, res, next);
});

router.get('/showUserProject', function (req, res, next) {
    projectDao.showUserProject(req, res, next);
});

router.get('/storeProjectId', function (req, res, next) {
    projectDao.storeProjectIdSession(req, res, next);
});

router.get('/joinProject', function (req, res, next) {
    res.sendfile('./views/joinProject.html');
});
router.get('/joinProject/show', function (req, res, next) {
    projectDao.showJoinProjects(req,res, next);
});

router.get('/joinProject/join', function (req, res, next) {
    projectDao.join(req,res, next);
});

module.exports = router;