/**
 * Created by rotoosoft-d04 on 2016/12/20.
 */
var bug = {
    insert:'INSERT INTO bug(id, recordDate, platform, content, from, recordUserId, modifyUserId, planDate, ' +
    'finishDate, finishStatus, projectId) VALUES(0, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
    update:'update bug set proName=? where id=?',
    delete: 'delete from bug where id=?',
    queryByUserId: 'select * from bug where id in (select projectId from user_project where userId=?);',
    queryAll: 'select * from bug',
    queryNewProId: 'SELECT id FROM bug WHERE createUserId=? ORDER BY id DESC',
    insertUerBug:'INSERT INTO user_bug(id, userId, projectId) VALUES(0, ?, ?)',
    getModifiers:'select * from user where id in (select userId from user_project where projectId=?)'
};

module.exports = bug;