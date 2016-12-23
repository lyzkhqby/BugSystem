// CRUD SQL语句
var project = {
    insert:'INSERT INTO project(id, proName, createTime, createUserId, des) VALUES(0, ?, ?, ?, ?)',
    update:'update project set proName=? where id=?',
    delete: 'delete from project where id=?',
    queryByUserId: 'select * from project where id in (select projectId from user_project where userId=?);',
    queryAll: 'select * from project',
    queryNewProId: 'SELECT id FROM project WHERE createUserId=? ORDER BY id DESC',
    insertUP:'INSERT INTO user_project(id, userId, projectId) VALUES(0, ?, ?)',
    queryJoinProject: 'select * from project where id not in (select distinct projectId from user_project where userId=?)'
};

module.exports = project;