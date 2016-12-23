/**
 * Created by rotoosoft-d04 on 2016/12/23.
 */
$(document).ready(function () {
    getProjects();
})

function getProjects() {
    $.ajax({
        url: "/projects/joinProject/show",
        type: "get",
        dataType: "json",
        data:
            {

            },
        success: function (result) {
            showTableTitle();
            if (result != undefined && result.length > 0) {

                result.forEach(function (item, index) {
                    $('#projects').append('<tr><td>'+ item.projectName+'</td>' +
                        '<td>'+ item.des +'</td>' +
                        '<td><input type="button" value="加入"></td>' +
                        '</tr>'
                    );
                });
                $('#projects input').each(function (index) {
                    var projectId = result[index].projectId;
                    $(this).click(function () {
                        joinProject(projectId, index);
                    })
                });

            }
        },
        error:function(data){
            alert('error');
        }
    });
}

function joinProject(projectId, index) {
    $.ajax({
        url: "/projects/joinProject/join",
        type: "get",
        dataType: "json",
        data:
            {
                projectId: projectId
            },
        success: function (result) {

            if (result.info == 'ok') {
                var td = $('#projects tr').eq(index + 1).find('td').eq(2);
                td.empty();
                td.text('已加入');
            }else if (result.info == 'failed') {
                alert('添加失败');
            }

        },
        error:function(data){
            alert('error');
        }
    });
}

function showTableTitle() {
    $('#projects').empty();
    $('#projects').append('<tr><td>项目名称</td>' +
        '<td>项目描述</td>' +
        '<td></td>' +
        '</tr>' );
}