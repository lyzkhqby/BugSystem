/**
 * Created by zk on 2016/12/18.
 */
var connection = require('../conf/db');
var sql = require('./projectSqlMapping');
var jsonWrite = require('../util/jsonUtil');
var pool = require('../conf/pool');

var projectDao = {
    add: function (req, res, next) {
        // 获取前台页面传过来的参数
        var param = req.query || req.params;

        var userId = req.session.userId;
        var date = new Date().toLocaleString();

        connection.beginTransaction(function (err) {
            if (err) {};
            connection.query(sql.insert, [param.proName, date, userId, param.des], function (err, result) {
                if (err) {
                    return connection.rollback(function() {
                        throw err;
                    });
                }
                connection.query(sql.queryNewProId, [userId], function (err, result) {
                    if (err){
                        return connection.rollback(function() {
                            throw err;
                        });
                    }
                    var projectId = result[0].id;
                    connection.query(sql.insertUP,[userId, projectId], function (err, result) {
                        if (err) {
                            return connection.rollback(function() {
                                throw err;
                            });
                        }

                        connection.commit(function (err) {
                            var resultStr;
                            if(err) {
                                resultStr = {code : '0', msg: '添加失败'};
                            }else {
                                resultStr = {code : '0', msg: '添加成功'};
                            }

                            // 以json形式，把操作结果返回给前台页面
                            jsonWrite(res, resultStr);
                        });
                    });
                })
            });
        });
    },
    showUserProject: function (req, res, next) {
        var userId = req.session.userId;
        pool.getConnection(function(err, connection) {
            if (err){
                /* handle error  */
            }

            connection.query(sql.queryByUserId, [userId], function(err, rows, fields) {
                if (err){
                    /* handle error  */
                }
                var projects = [];

                rows.forEach(function (item, index) {
                    var project = {};
                    project['projectName'] = item.proName;
                    project['des'] = item.des;
                    project['projectId'] = item.id;
                    projects.push(project);

                });
                jsonWrite(res, projects);

                connection.release();

            });
        });
    },
    storeProjectIdSession: function (req, res, next) {
        var param = req.query || req.params;
        var projectId = param.projectId;
        req.session.projectId = projectId;
        var result = {info : 'ok'};
        jsonWrite(res, result);
    },
    showJoinProjects: function (req, res, next) {
        var userId = req.session.userId;
        pool.getConnection(function(err, connection) {
            if (err){
                /* handle error  */
            }

            connection.query(sql.queryJoinProject, [userId], function(err, rows, fields) {
                if (err){
                    /* handle error  */
                }
                var projects = [];

                rows.forEach(function (item, index) {
                    var project = {};
                    project['projectName'] = item.proName;
                    project['des'] = item.des;
                    project['projectId'] = item.id;
                    projects.push(project);

                });
                jsonWrite(res, projects);
                connection.release();

            });
        });
    },
    join: function (req, res, next) {
        var param = req.query || req.params;
        var projectId = param.projectId;
        var userId = req.session.userId;

        pool.getConnection(function (err, connection) {
            if (err) {

            }
            connection.query(sql.insertUP, [userId, projectId], function (err, rows, fields) {
                var resultStr;
                if(err) {
                    resultStr = {info: "failed"};
                }else {
                    resultStr = {info: "ok"};
                }

                jsonWrite(res, resultStr);
                connection.release();
            });
        });

    }

}

module.exports = projectDao;