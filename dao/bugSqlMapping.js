/**
 * Created by rotoosoft-d04 on 2016/12/20.
 */
var bug = {
    insert:'INSERT INTO renovate(id, recordDate, platform, content, from, recordUserId, modifyUserId, planDate, ' +
    'finishDate, finishStatus, projectId) VALUES(0, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
    update:'update project set proName=? where id=?',
    delete: 'delete from project where id=?',
    queryByUserId: 'select * from project where id in (select projectId from user_project where userId=?);',
    queryAll: 'select * from project',
    queryNewProId: 'SELECT id FROM project WHERE createUserId=? ORDER BY id DESC',
    insertUP:'INSERT INTO user_project(id, userId, projectId) VALUES(0, ?, ?)'
};

module.exports = bug;