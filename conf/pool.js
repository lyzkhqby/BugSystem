/**
 * Created by rotoosoft-d04 on 2016/12/16.
 */
// MySQL数据库联接配置
var mysql = require('mysql');

var pool = mysql.createPool({
    host     : 'localhost',
    user     : 'zk',
    password : 'lYrs2014',
    database : 'bugsystem',
    port: 3306
});

module.exports = pool;