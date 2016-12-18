/**
 * Created by rotoosoft-d04 on 2016/12/16.
 */
// MySQL数据库联接配置
var mysql = require('mysql');

var pool = mysql.createPool({
    host     : 'localhost',
    user     : 'root',
    password : '233391zk',
    database : 'bugsystem',
    port: 3306
});

module.exports = pool;