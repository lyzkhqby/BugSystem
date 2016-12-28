/**
 * Created by rotoosoft-d04 on 2016/12/20.
 */
$(document).ready(function () {
    addBug();
    showBugs();
})

function addBug() {
    $('#add').click(function () {
        self.location='/bugs/add';
    });
}

function showBugs() {
    $.ajax({
        url: "/bugs/show",
        type: "get",
        dataType: "json",
        data: {},
        success: function (result) {
            showTableTitle();
            if (result != undefined && result.length > 0) {
                result.forEach(function (item, index) {
                    if (item.finishStatus == 1) {
                        $('#bugs').append('<tr><td>'+ item.recordDate+'</td>' +
                            '<td>'+ item.platform +'</td>' +
                            '<td>'+ item.source +'</td>' +
                            '<td>'+ item.content +'</td>' +
                            '<td >'+ item.recorder +'</td>' +
                            '<td>'+ item.modifiers +'</td>' +
                            '<td>'+ item.planDate +'</td>' +
                            '<td>'+ item.finishDate +'</td>' +
                            '<td>已完成</td>' +
                            '<td>'+ item.finishContent+'</td></tr>>'
                        );
                    }else if (item.finishStatus == 0) {
                        $('#bugs').append('<tr><td>'+ item.recordDate+'</td>' +
                            '<td>'+ item.platform +'</td>' +
                            '<td>'+ item.source +'</td>' +
                            '<td>'+ item.content +'</td>' +
                            '<td>'+ item.recorder +'</td>' +
                            '<td>'+ item.modifiers +'</td>' +
                            '<td>'+ item.planDate +'</td>' +
                            '<td>'+ item.finishDate +'</td>' +
                            '<td>'+ item.finishContent +'</td>' +
                            '</tr>'
                        );
                    }

                });
                var trs = $('#bugs tr');
                result.forEach(function (item, index) {
                    if (item.canMD == 1) {
                        var tr = trs.eq(index + 1);
                        tr.append('<td><input type="button" value="修改"><input type="button" value="删除"></td>');
                        var inputs = tr.find('input');
                        //修改
                        inputs.eq(0).click(function (event) {
                            sessionStorage.setItem("bugId", item.bugId);
                            self.location = '/bugs/modify';
                        });
                        //删除
                        inputs.eq(1).click(function (event) {
                            var bugId = item.bugId;
                            deleteBug(bugId);
                        })

                    }


                })
            }

        }
    });
}

function deleteBug(bugId) {
    $.ajax({
        url: "/bugs/delete",
        type: "get",
        dataType: "json",
        data:
            {
                bugId: bugId,
            },
        success: function (result) {
            alert(result.msg);
            self.location='/bugs';
        },
        error:function(data){
            alert('error');
        }
    });
}

function showTableTitle() {
    $('#bugs').empty();
    $('#bugs').append('<tr><td>日期</td>' +
        '<td>平台</td>' +
        '<td>来源</td>' +
        '<td>变更内容</td>' +
        '<td>记录人</td>' +
        '<td>修改人员</td>' +
        '<td>预计完成时间</td>' +
        '<td>实际完成时间</td>' +
        '<td>完成情况说明</td></tr>' );
}