/**
 * Created by rotoosoft-d04 on 2016/12/28.
 */
$(document).ready(function () {
    init();
    updateBug();
})

function init() {
    var bugId = sessionStorage.getItem('bugId');
    $.ajax({
        url: "/bugs/modify/init",
        type: "get",
        dataType: "json",
        data: {
            bugId : bugId
        },
        success: function (result) {
            showInfo(result);
        }
    });

    function showInfo(result) {
        //平台
        $('#platform').val(result.platform);
        //来源
        $('#source').val(result.source);
        //内容
        $('#content').val(result.content);
        //预计完成时间
        $('#plan_time').val(result.planDate);
        //完成情况
        showFinish(result);
        //修改人员
        showModifiers(result);
    }

    //完成情况
    function showFinish(result) {
        //完成情况select
        $('#finish_status').change(function () {
            var val = $(this).val();
            if (val == '0') {
                $('#unfinish_content_div').show();
                $('#finish_date_div').hide();
            }else if (val == '1') {
                $('#unfinish_content_div').hide();
                $('#finish_date_div').show();
                $('#finish_time').val('');
            }
        });

        if (result.finishStatus == 1) {
            //已完成
            $('#finish_status').val(1);
            $('#unfinish_content_div').hide();
            $('#finish_date_div').show();
            $('#finish_time').val(result.finishDate);
        }else if (result.finishStatus == 0) {
            //未完成
            $('#finish_status').val(0);
            $('#unfinish_content_div').show();
            $('#finish_date_div').hide();
            $('#finish_time').val('');
        }

    }

    //修改人员
    function showModifiers(result) {
        var players = result.players;
        if (players == undefined || players.length == 0) return;
        players.forEach(function (item, index) {
            $('#modifyer').append('<label><input type="checkbox" value="'+ item.playerId +'">'+ item.playerName +'</label>');
        })
        var modifiers = result.modifiers;
        if (modifiers != undefined && modifiers.length != 0) {
            modifiers.forEach(function (item, index) {
                var id = item.modifierId;
                $('#modifyer').find('input[value='+id+']').attr("checked", 'checked');
            })
        }

    }

}

function updateBug() {
    $('#update').click(function () {
        update();
    });

    function update() {
        var bugId = sessionStorage.getItem('bugId');
        var platform = $('#platform').val();
        var source = $('#source').val();
        var content = $('#content').val();
        var plan_time = $('#plan_time').val();
        var finish_time = $('#finish_time').val() == '' ? '1900-1-1' : $('#finish_time').val();
        var finish_status = $('#finish_status').val();
        var finish_content = $('#unfinish_content').val();
        var modifiers = getModifiersAttr();
        $.ajax({
            url: "/bugs/modify/modifyBug",
            type: "get",
            dataType: "json",
            traditional: true,
            data:
                {
                    bugId: bugId,
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
    }

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