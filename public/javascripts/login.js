/**
 * Created by rotoosoft-d04 on 2016/12/16.
 */
$(document).ready(function () {
    $('#login').click(function (event) {
        var name = $('#name').val();
        var password = $('#pwd').val();
        $.ajax({
            url: "/users/verify",
            type: "get",
            dataType: "json",
            data:
                {
                    name: name,
                    password: password
                },
            success: function (result) {
                if (result.info == 'ok') {
                    self.location = '/users/main';
                }else {
                    alert(result.info);
                }
            },
            error:function(data){
                alert('error');
            }
        });
    });
})