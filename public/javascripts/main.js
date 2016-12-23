/**
 * Created by rotoosoft-d04 on 2016/12/16.
 */
$(document).ready(function () {
    addProject();
    joinProject();
    showUserProject();
})

function addProject() {

    $('#addProject').click(function (event) {
        self.location = '/projects/addProject'
    });
}

//加入项目
function joinProject() {
    $('#joinProject').click(function (event) {
        self.location = '/projects/joinProject'
    });
}

function showUserProject() {
    $.ajax({
        url: "/projects/showUserProject",
        type: "get",
        dataType: "json",
        data:
            {

            },
        success: function (result) {
            $('#userProject').empty();
            if (result != null) {
                result.forEach(function (item, index) {
                    $('#userProject').append('<input type="button" value="'+ item.projectName +'">');
                });
                $('#userProject input').click(function () {
                    var i = $('#userProject input').index(this);
                    var projectId = result[i].projectId;
                    storeProjectIdSession(projectId);
                });
            }
        },
        error:function(data){
            alert('error');
        }
    });
}

function storeProjectIdSession(projectId) {
    $.ajax({
        url:"/projects/storeProjectId",
        dataType: "json",
        data: {
            projectId: projectId
        },
        success: function (result) {
            if (result.info == 'ok') {
                self.location='/bugs';
            }
        },
        error:function(data){
            alert('error');
        }
    });
}