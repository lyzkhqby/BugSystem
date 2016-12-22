/**
 * Created by rotoosoft-d04 on 2016/12/22.
 */
var stringUtil = {
    tranDate: function (date) {
        if (date == undefined) return;
        var res = '';
        res += date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
        if (res == '1900-1-1') return '';
        return res;
    }
}

module.exports = stringUtil;