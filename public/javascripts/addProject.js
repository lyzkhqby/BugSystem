/**
 * Created by rotoosoft-d04 on 2016/12/19.
 */
$(document).ready(function () {
    add();
})

function add() {

    $('#add').click(function (event) {
        var name = $('#name').val();
        var des = $('#des').val();
        $.ajax({
            url: "../projects/addProject/add",
            type: "get",
            dataType: "json",
            data:
                {
                    proName: name,
                    des: des
                },
            success: function (result) {
                alert(result.msg);
            },
            error:function(data){
                alert('error');
            }
        });
    });
}