/**
 * Created by rotoosoft-d04 on 2016/12/20.
 */
var bug = {
    insert:'INSERT INTO bug(id, recordDate, platform, content, source, recordUserId, planDate, ' +
    'finishDate, finishStatus, projectId, finishContent) VALUES(0, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
    update:'update bug set proName=? where id=?',
    delete: 'delete from bug where id=?',
    queryByUserId: 'select * from bug where id in (select projectId from user_project where userId=?);',
    queryAll: 'select * from bug',
    queryNewBugId: 'SELECT id FROM bug WHERE recordUserId=? ORDER BY id DESC',
    insertUerBug:'INSERT INTO user_bug(id, userId, bugId) VALUES',
    getModifiers:'select * from user where id in (select userId from user_project where projectId=?)',
    queryBugs: 'select a.*, b.name, b.id as userId from bug a inner join user b on a.recordUserId=b.id where projectId=? order by recordDate desc',
    queryUsersByBugId: 'select b.name from user_bug a inner join user b on a.userId=b.id where bugId=?'
};

module.exports = bug;