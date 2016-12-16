/**
 * Created by rotoosoft-d04 on 2016/12/16.
 */
$(document).ready(function () {
    $('#login').click(function (event) {
        var name = $('#name').val();
        var password = $('#pwd').val();
        $.ajax({
            url: "http://localhost:3000/users/verify",
            type: "get",
            dataType: "json",
            data:
                {
                    name: name,
                    password: password
                },
            success: function (result) {
                alert(result.id);
            },
            error:function(data){
                alert('error');
            }
        });
    });
})