var CryptoJSAesJson = {
    stringify: function (cipherParams) {
        var j = {ct: cipherParams.ciphertext.toString(CryptoJS.enc.Base64)};
        if (cipherParams.iv) j.iv = cipherParams.iv.toString();
        if (cipherParams.salt) j.s = cipherParams.salt.toString();
        return JSON.stringify(j);
    },
    parse: function (jsonStr) {
        var j = JSON.parse(jsonStr);
        var cipherParams = CryptoJS.lib.CipherParams.create({ciphertext: CryptoJS.enc.Base64.parse(j.ct)});
        if (j.iv) cipherParams.iv = CryptoJS.enc.Hex.parse(j.iv)
        if (j.s) cipherParams.salt = CryptoJS.enc.Hex.parse(j.s)
        return cipherParams;
    }
}

$(document).ready(function () {

    if ($("#uid").val() == "")  $("#uid").focus();
    else                        $("#upwd").focus();

    var getlogin_config     = localStorage.getItem('login_cfg');
    var login_config_json   = JSON.parse( getlogin_config );

    if(login_config_json) {
        var saved_id            = login_config_json.saved_id;
        var saved_id_checked    = login_config_json.saved_id_checked;

        if(saved_id_checked) {
            $('#uid').val(saved_id);
            $('#id_save').prop('checked', true);
            $('#upwd').focus();
        }
        else  $('#uid').focus();

    }
    else $('#uid').focus();

    $('#uid').css("ime-mode", "disabled");



});


$("#btnJoin").click(function()    {
    var page = $('#btnJoin').attr('data-page');
    location.href='/?p='+page;
    //console.log(page);
});

$("#btnFindID").click(function()    {

    var uname   = $("#findID_Name").val();
    var hp_num  = $("#findID_HP").val();


    $.ajax({
        type : 'POST',
        url : '/ajax_hub.php?menu=account&op=find_id',
        dataType : 'json',
        data : {
            uname:uname
            ,hp_num:hp_num
        },
        success : function(data, textStatus)    {
            // console.log(data);
            if(data.result=='success') {
                //$("#msgFindIDUname").css("display", "none");
                //$("#msgFindIDHP").css("display", "none");
                popupMessage(data.title, data.msg);
            }
            else popupMessage(data.title, data.errmsg);
            /*
            else {

                var msg = "<p>" + data.errmsg + "</p>";

                if(data.target=='uname')    {
                    $("#msgFindIDUname").html(msg);
                    $("#msgFindIDUname").css("display", "block");
                    $("#msgFindIDHP").css("display", "none");
                }
                else {
                    $("#msgFindIDUname").html(msg);
                    $("#msgFindIDUname").css("display", "none");
                    $("#msgFindIDHP").css("display", "block");
                }

            }
            */
        }
    });
});

$("#btnFindPWD").click(function()    {

    var uname   = $("#findPWD_Name").val();
    var uid     = $("#findPWD_ID").val();


    $.ajax({
        type : 'POST',
        url : '/ajax_hub.php?menu=account&op=find_pwd',
        dataType : 'json',
        data : {
            uname:uname
            ,uid:uid
        },
        success : function(data, textStatus)    {
            console.log(data);
            if(data.result=='success') {
                popupMessage(data.title, data.msg);
            }
            else popupMessage(data.title, data.errmsg);
        }
    });
});

// $savejson_arr['email'] = $savejson_arr['email']."@".$savejson_arr['email_domain'];

function procLogin() {

    var encrypted = CryptoJS.AES.encrypt(JSON.stringify($('#upwd').val()), $('#aeskey').val(), {format: CryptoJSAesJson}).toString();
    var is_agree = 0;

    if ($('#cbagree').is(":checked")) is_agree = 1;

    $.ajax({
        type : 'POST',
        url : '/ajax_hub.php?menu=account&op=login',
        dataType : 'json',
        data : {
            uid:$('#uid').val()
            //,upwd:$('#upwd').val()
            ,upwd_enc:encrypted
            ,is_agree:is_agree
        },
        success : function(data, textStatus)    {
            //console.log(data);
            if(data.result=='success') {

                if($('#id_save').is(':checked')) {
                    var login_cfg = {
                        saved_id:$('#uid').val(),
                        saved_id_checked:true
                    };
                    localStorage.setItem('login_cfg', JSON.stringify(login_cfg));
                }
                else {
                    var login_cfg = {
                        saved_id:$('#uid').val(),
                        saved_id_checked:false
                    };
                    localStorage.setItem('login_cfg', JSON.stringify(login_cfg));
                }

                location.href='/';
            }
            else {

                var msg = "<p>" + data.errmsg + "</p>";

                if(data.err_target == 'uid')   {
                    $("#errorMsgID").html(msg);
                    $("#errorMsgID").css("display", "block");
                    $("#errorMsgPWD").css("display", "none");
                }
                else if(data.err_target == 'pwd')   {
                    $("#errorMsgPWD").html(msg);
                    $("#errorMsgPWD").css("display", "block");
                    $("#errorMsgID").css("display", "none");
                }

                return;
            }
        }
    });
}

function popFindID() {
  $("#popFindID").show();
  fullLayerHeight();
}

function popFindPWD() {
  $("#popFindPWD").show();
  fullLayerHeight();
}
