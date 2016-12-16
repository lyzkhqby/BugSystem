/**
 * Created by rotoosoft-d04 on 2016/12/16.
 */
// CRUD SQL语句
var user = {
    insert:'INSERT INTO user(id, name, password) VALUES(0, ?, ?)',
    update:'update user set name=?, age=? where id=?',
    delete: 'delete from user where id=?',
    queryById: 'select * from user where id=?',
    queryAll: 'select * from user',
    queryByNamePwd: 'select * from user where name=? and password=?'
};

module.exports = user;