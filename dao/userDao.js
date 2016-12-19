/**
 * Created by rotoosoft-d04 on 2016/12/16.
 */
// 实现与MySQL交互

var pool = require('../conf/pool');
var sql = require('./userSqlMapping');
var jsonWrite = require('../util/jsonUtil');

var userDao = {
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
                req.session.userId = rows[0].id;
                //以json形式，把操作结果返回给前台页面
                result = {info : 'ok'};
                jsonWrite(res, result);

                connection.release();

            });
        });

    }
}

module.exports = userDao;