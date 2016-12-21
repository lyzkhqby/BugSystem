/**
 * Created by rotoosoft-d04 on 2016/12/20.
 */
var pool = require('../conf/pool');
var sql = require('./bugSqlMapping');
var jsonWrite = require('../util/jsonUtil');

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
    }
}


module.exports = bugDao;