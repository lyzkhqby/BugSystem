/**
 * Created by rotoosoft-d04 on 2016/12/21.
 */
$(document).ready(function () {
    init();
})

function init() {

    //完成情况select
    $('#finish_status').change(function () {
        var val = $(this).val();
        if (val == '0') {
            $('#finish_content_div').show();
        }else if (val == '1') {
            $('#finish_content_div').hide();
        }
    });

    getModifiers();
}

//获取所有可修改人员
function getModifiers() {
    $.ajax({
        url: "/bugs/add/getModifiers",
        type: "get",
        dataType: "json",
        data:
            {

            },
        success: function (result) {
            $('#modifyer').empty();
            if (result != undefined && result.length > 0) {
                result.forEach(function (item, index) {
                    alert(item);
                    $('#modifyer').append('<input type="checkbox" value="'+ item.userId +'">'+ item.name +'</input>')
                })
            }


        },
        error:function(data){
            alert('error');
        }
    });
}