/**
 * Created by rotoosoft-d04 on 2016/12/16.
 */
// 实现与MySQL交互

var pool = require('../conf/db');
var sql = require('./userSqlMapping');


// 向前台返回JSON方法的简单封装
var jsonWrite = function (res, ret) {
    if(typeof ret === 'undefined') {
        res.json({
            code:'1',
            msg: '操作失败'
        });
    } else {
        res.json(ret);
    }
};

var user = {
    add: function (req, res, next) {
        // 获取前台页面传过来的参数
        var param = req.query || req.params;

        pool.getConnection(function(err, connection) {
            if (err){
                /* handle error  */
            }

            connection.query(sql.insert, [param.name, param.password], function(err, rows, fields) {
                if (err){
                    /* handle error  */
                }
                // 以json形式，把操作结果返回给前台页面
                var result = {code : '0', msg: '操作成功'};
                jsonWrite(res, result);
                connection.release();

            });
        });
    },
    verify: function (req, res, next) {
        var param = req.query || req.params;
        pool.getConnection(function(err, connection) {
            if (err){
                /* handle error  */
            }

            connection.query(sql.queryByNamePwd, [param.name, param.password], function(err, rows, fields) {
                if (err){
                    /* handle error  */
                }
                // 以json形式，把操作结果返回给前台页面
                result = {id : rows[0].id};
                jsonWrite(res, result);
                connection.release();

            });
        });
    }
}

module.exports = user;