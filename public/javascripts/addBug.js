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
            $('#unfinish_content_div').show();
            $('#finish_date_div').hide();
        }else if (val == '1') {
            $('#unfinish_content_div').hide();
            $('#finish_date_div').show();
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
                    //alert(item);
                    $('#modifyer').append('<label><input type="checkbox" value="'+ item.userId +'">'+ item.name +'</label>');
                })
            }
            $('#add').click(function () {
                addBug();
            });
        },
        error:function(data){
            alert('error');
        }
    });
}

//添加bug
function addBug() {

    var platform = $('#platform').val();
    var source = $('#source').val();
    var content = $('#content').val();
    var plan_time = $('#plan_time').val();
    var finish_time = $('#finish_time').val() == '' ? '1900-1-1' : $('#finish_time').val();
    var finish_status = $('#finish_status').val();
    var finish_content = $('#unfinish_content').val();
    var modifiers = getModifiersAttr();

    $.ajax({
        url: "/bugs/add/addBug",
        type: "get",
        dataType: "json",
        traditional: true,
        data:
            {
                platform: platform,
                source: source,
                content: content,
                modifiers: modifiers,
                plan_time: plan_time,
                finish_time: finish_time,
                finish_status: finish_status,
                finish_content: finish_content
            },
        success: function (result) {
            alert(result.msg);
        },
        error:function(data){
            alert('error');
        }
    });


    //获取修改者参数
    function getModifiersAttr() {
        var modifiers = [];
        var checkboxs = $('#modifyer').find('input');
        modifiers.push(0);
        for (var i = 0; i < checkboxs.length; i++) {
            var checkbox = checkboxs.eq(i);
            if (checkbox.is(":checked")) {
                var val = checkbox.val();
                modifiers.push(val);
            }
        }
        return modifiers;
    }
}