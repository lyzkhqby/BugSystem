/**
 * Created by rotoosoft-d04 on 2016/12/19.
 */
// MySQL数据库联接配置
var mysql = require('mysql');

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'zk',
    password : 'lYrs2014',
    database : 'bugsystem',
    port: 3306
});

module.exports = connection;