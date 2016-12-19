var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    if (req.session.isVisit) {
        res.redirect('/users/main');
    }else {
        req.session.isVisit = 1;
        res.sendfile('./views/login.html');
    }

});

module.exports = router;
