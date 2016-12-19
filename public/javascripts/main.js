/**
 * Created by rotoosoft-d04 on 2016/12/16.
 */
$(document).ready(function () {
    addProject();
    showUserProject();
})

function addProject() {

    $('#addProject').click(function (event) {
        self.location = '/projects/addProject'
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
            if (result != null) {
                $('#userProject').empty();
                result.forEach(function (item, index) {
                    $('#userProject').append('<input type="button" value="'+ item.projectName +'">');
                })
            }
        },
        error:function(data){
            alert('error');
        }
    });
}
