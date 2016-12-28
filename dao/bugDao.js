/**
 * Created by rotoosoft-d04 on 2016/12/20.
 */
var pool = require('../conf/pool');
var sql = require('./bugSqlMapping');
var jsonWrite = require('../util/jsonUtil');
var stringUtil = require('../util/stringUtil');
var connection = require('../conf/db');
var sqlProject = require('./projectSqlMapping');

var bugDao = {
    getModifiers: function (req, res, next) {
        var projectId = req.session.projectId;
        pool.getConnection(function(err, connection) {
            if (err){
                /* handle error  */
            }

            connection.query(sql.getModifiers, [projectId], function(err, rows, fields) {
                if (err){
                    /* handle error  */
                }
                // 以json形式，把操作结果返回给前台页面
                var users = [];

                rows.forEach(function (item, index) {
                    var user = {};
                    user['userId'] = item.id;
                    user['name'] = item.name;
                    users.push(user);

                });
                jsonWrite(res, users);
                connection.release();

            });
        });
    },
    addBug: function (req, res, next) {
        // 获取前台页面传过来的参数
        var param = req.query || req.params;

        var recordDate = new Date().toLocaleString();
        var platform = param.platform;
        var content = param.content;
        var source = param.source;
        var recordUserId = req.session.userId;
        var planDate = param.plan_time;
        var finishDate = param.finish_time;
        var finishStatus = param.finish_status;
        var projectId = req.session.projectId;
        var finishContent = param.finish_content;



        connection.beginTransaction(function (err) {
            if (err) {

            }
            connection.query(sql.insert, [recordDate, platform, content, source, recordUserId, planDate, finishDate,
                finishStatus, projectId, finishContent], function (err, result) {
                if (err) {
                    return connection.rollback(function() {
                        throw err;
                    });
                }
                connection.query(sql.queryNewBugId, [recordUserId], function (err, result) {
                    if (err) {
                        return connection.rollback(function() {
                            throw err;
                        });
                    }
                    var bugId = result[0].id;
                    var modifiersIds = param.modifiers;
                    var sqlInsertUserBug = sql.insertUerBug;
                    for (var i = 1; i < modifiersIds.length; i++) {
                        sqlInsertUserBug += '(0,'+ modifiersIds[i] +',' + bugId + '),';
                    }
                    sqlInsertUserBug = sqlInsertUserBug.substring(0, sqlInsertUserBug.length - 1);
                    connection.query(sqlInsertUserBug, [], function (err, result) {
                        if (err) {
                            return connection.rollback(function() {
                                throw err;
                            });
                        }

                        connection.commit(function (err) {
                            var resultStr;
                            if (err) {
                                resultStr = {code : '0', msg: '添加失败'};
                            }else {
                                resultStr = {code : '1', msg: '添加成功'};
                            }


                            // 以json形式，把操作结果返回给前台页面
                            jsonWrite(res, resultStr);
                        });
                    });
                });
            });
        });

    },
    showBugs: function (req, res, next) {
        var projectId = req.session.projectId;
        var uid = req.session.userId;

        connection.beginTransaction(function (err) {
            if (err) {

            }
            connection.query(sql.queryBugs, [projectId], function (err, result) {
                if (err) {
                    return connection.rollback(function() {
                        throw err;
                    });
                }
                //以json形式，把操作结果返回给前台页面
                var bugs = [];
                var resLen = result.length;

                if (resLen == 0) jsonWrite(res, bugs);
                result.forEach(function (item, index) {
                    var bug = {};
                    bug['recordDate'] = stringUtil.tranDate(item.recordDate);
                    bug['platform'] = item.platform;
                    bug['source'] = item.source;
                    bug['content'] = item.content;
                    bug['planDate'] = stringUtil.tranDate(item.planDate);
                    bug['finishDate'] = stringUtil.tranDate(item.finishDate);
                    bug['finishStatus'] = item.finishStatus;
                    bug['finishContent'] = item.finishContent;
                    bug['recorder'] = item.name;
                    bug['bugId'] = item.id;
                    bug['canMD'] = (item.userId == uid ? 1 : 0);
                    queryModifiers(bug, bugs, resLen);
                });




            });
        });

        function queryModifiers(bug, bugs, resLen) {
            connection.query(sql.queryUsersByBugId, [bug.bugId], function (err, result) {
                if (err) {
                    return connection.rollback(function() {
                        throw err;
                    });
                }

                connection.commit(function (err) {
                    if (err) {}
                    var modifiers = '';
                    result.forEach(function (item, index) {
                        modifiers += item.name + ', ';

                    })
                    modifiers = modifiers.substring(0, modifiers.length - 2);
                    bug['modifiers'] = modifiers;
                    bugs.push(bug);
                    if (bugs.length == resLen) {
                        jsonWrite(res, bugs);
                    }

                });
            });
        }


        // pool.getConnection(function(err, connection) {
        //     if (err){
        //         /* handle error  */
        //     }
        //
        //     connection.query(sql.queryBugs, [projectId], function(err, rows, fields) {
        //         if (err){
        //             /* handle error  */
        //         }
        //         // 以json形式，把操作结果返回给前台页面
        //         var bugs = [];
        //
        //         rows.forEach(function (item, index) {
        //             var bug = {};
        //             bug['recordDate'] = stringUtil.tranDate(item.recordDate);
        //             bug['platform'] = item.platform;
        //             bug['source'] = item.source;
        //             bug['content'] = item.content;
        //             bug['planDate'] = stringUtil.tranDate(item.planDate);
        //             bug['finishDate'] = stringUtil.tranDate(item.finishDate);
        //             bug['finishStatus'] = item.finishStatus;
        //             bug['finishContent'] = item.finishContent;
        //             bug['recorder'] = item.name;
        //             bugs.push(bug);
        //         });
        //
        //         connection.query(sql.queryAll, [], function (err, rows, fields) {
        //
        //
        //
        //             jsonWrite(res, bugs);
        //             connection.release();
        //         });
        //
        //
        //
        //     });
        // });
    },
    deleteBug: function (req, res, next) {
        var param = req.query || req.params;
        var bugId = param.bugId;
        connection.beginTransaction(function (err) {
            if (err) {

            }

            connection.query(sql.deleteBug, [bugId], function (err, result) {
                if (err) {
                    return connection.rollback(function() {
                        throw err;
                    });
                }
                connection.query(sql.deleteUB, [bugId], function (err, result) {
                    if (err) {
                        return connection.rollback(function() {
                            throw err;
                        });
                    }
                    connection.commit(function (err) {
                        var resultStr;
                        if (err) {

                            resultStr = {msg: '删除失败'};
                        }else {
                            resultStr = {msg: '删除成功'};
                        }
                        // 以json形式，把操作结果返回给前台页面
                        jsonWrite(res, resultStr);
                    });
                });
            })
        });
    },
    modifyInit: function (req, res, next) {
        var param = req.query || req.params;
        var bugId = param.bugId;
        var projectId = req.session.projectId;

        connection.beginTransaction(function (err) {
            if (err) {

            }

            connection.query(sql.queryByBugId, [bugId], function (err, result) {
                if (err) {
                    return connection.rollback(function() {
                        throw err;
                    });
                }

                var bug = {};
                var item = result[0];

                bug['platform'] = item.platform;
                bug['source'] = item.source;
                bug['content'] = item.content;
                bug['planDate'] = stringUtil.tranDate(item.planDate);
                bug['finishDate'] = stringUtil.tranDate(item.finishDate);
                bug['finishStatus'] = item.finishStatus;
                bug['finishContent'] = item.finishContent;
                bug['recorder'] = item.name;
                bug['bugId'] = item.id;
                connection.query(sql.queryUsersByBugId, [bugId], function (err, result) {
                    if (err) {
                        return connection.rollback(function() {
                            throw err;
                        });
                    }
                    var modifiers = [];
                    result.forEach(function (item, index) {
                        var modifier = {};
                        modifier['modifierId'] = item.id;
                        modifier['modifierName'] = item.name;
                        modifiers.push(modifier);
                    })
                    bug['modifiers'] = modifiers;
                    connection.query(sqlProject.queryUsersByProjectId, [projectId], function (err, result) {
                        if (err) {
                            return connection.rollback(function() {
                                throw err;
                            });
                        }
                        connection.commit(function (err) {
                            if (err) {}
                            var players = [];
                            result.forEach(function (item, index) {
                                var player= {};
                                player['playerId'] = item.userId;
                                player['playerName'] = item.name;
                                players.push(player);
                            })
                            bug['players'] = players;
                            jsonWrite(res, bug);

                        });
                    })
                });
            })
        });
    },
    modifyBug: function (req, res, next) {
        // 获取前台页面传过来的参数
        var param = req.query || req.params;

        var bugId = param.bugId;
        var platform = param.platform;
        var content = param.content;
        var source = param.source;
        var planDate = param.plan_time;
        var finishDate = param.finish_time;
        var finishStatus = param.finish_status;
        var finishContent = param.finish_content;

        connection.beginTransaction(function (err) {
            if (err) {

            }
            connection.query(sql.updateBug, [platform, source, content, planDate, finishDate,
                finishStatus, finishContent, bugId], function (err, result) {
                if (err) {
                    return connection.rollback(function() {
                        throw err;
                    });
                }
                connection.query(sql.deleteUB, [bugId], function (err, result) {
                    if (err) {
                        return connection.rollback(function() {
                            throw err;
                        });
                    }

                    var modifiersIds = param.modifiers;
                    var sqlInsertUserBug = sql.insertUerBug;
                    for (var i = 1; i < modifiersIds.length; i++) {
                        sqlInsertUserBug += '(0,'+ modifiersIds[i] +',' + bugId + '),';
                    }
                    sqlInsertUserBug = sqlInsertUserBug.substring(0, sqlInsertUserBug.length - 1);
                    connection.query(sqlInsertUserBug, [], function (err, result) {
                        if (err) {
                            return connection.rollback(function() {
                                throw err;
                            });
                        }

                        connection.commit(function (err) {
                            var resultStr;
                            if (err) {
                                resultStr = {code : '0', msg: '更新失败'};
                            }else {
                                resultStr = {code : '1', msg: '更新成功'};
                            }


                            // 以json形式，把操作结果返回给前台页面
                            jsonWrite(res, resultStr);
                        });
                    });
                });
            });
        });
    }
}


module.exports = bugDao;