var sendCode = true;
var lan = "cn";
window.onload = function () {
    var refemail = GetRequest().email;
    lan = GetRequest().lan;
    if (lan == undefined) {
        lan = "cn";
    }
    if (lan == "cn") {
        $("#Title").html("分享注册")
        document.getElementById("refemail").value = refemail;
        $(".en").hide();
        $("#jq_send").click(function () {
            if (!sendCode) {
                return;
            }
            if ($("#acount").val() == "") {
                alert("账号/邮箱不能为空")
                return;
            }
            if (!isEmail($("#acount").val())) {
                alert("请填写正确的邮箱格式")
                return;
            }
            $.ajax({
                url: "http://union.iqeq.cn/api/Foreign/GetEmailCaptcha",
                data: { Account: $("#acount").val(), acType: 3, Lan: lan },
                type: 'GET',
                dataType: 'json',
                success: function (data, statusText) {
                    if (data.StateCode == 0) {
                        showtime(60);
                    } else {
                        alert(data.StateMsg)
                    }
                }
            })
        });
        $("#jq_regist").click(function () {
            if ($("#refemail").val() == '' || $("#refemail").val() == undefined) {
                alert("无推荐人邮箱，无法注册")
                return;
            }
            if ($("#acount").val() == "") {
                alert("账号/邮箱不能为空")
                return;
            }
            if (!isEmail($("#acount").val())) {
                alert("请填写正确的邮箱格式")
                return;
            }
            if ($("#codevalue").val() == '') {
                alert("验证码不能为空")
                return;
            }
            if ($("#password").val() == '') {
                alert("新密码不能为空")
                return;
            }
            if ($("#newpassword").val() == '') {
                alert("确认密码不能为空")
                return;
            }
            if ($("#newpassword").val() != $("#password").val()) {
                alert("两次输入的密码不匹配")
                return;
            }
            var obj = {
                "Account": $("#acount").val(),
                "Email": refemail,
                "Captcha": $("#codevalue").val(),
                "Lan": lan,
                "PassWord": $("#password").val(),
                "AgainPassWord": $("#newpassword").val()
            }
            $.ajax({
                url: "http://union.iqeq.cn/api/Foreign/RegForeignTeacher",
                data: obj,
                type: 'POST',
                dataType: 'json',
                success: function (data, statusText) {
                    if (data.StateCode == 0) {
                        alert("注册成功")
                    } else {
                        alert(data.StateMsg)
                    }
                    // console.log(data, statusText)
                }
            })
        })
    } else {
        $("#Title").html("Share register")
        $(".titlePic img").attr("src", "./images/enTitle.png")
        document.getElementById("enrefemail").value = refemail;
        $(".cn").hide();
        $("#enjq_regist").click(function () {
            if ($("#enrefemail").val() == '' || $("#enrefemail").val() == undefined) {
                alert("Referee email can not be empty")
                return;
            }
            if ($("#enacount").val() == "") {
                alert("The account/email can not be empty")
                return;
            }
            if (!isEmail($("#enacount").val())) {
                alert("Please fill in the correct email format")
                return;
            }
            if ($("#encodevalue").val() == '') {
                alert("verification code must be filled")
                return;
            }
            if ($("#enpassword").val() == '') {
                alert("New password can not be empty")
                return;
            }
            if ($("#ennewpassword").val() == '') {
                alert("Confirm your password can not be empty")
                return;
            }
            if ($("#ennewpassword").val() != $("#enpassword").val()) {
                alert("Password does not match")
                return;
            }
            var enobj = {
                "Account": $("#enacount").val(),
                "Email": refemail,
                "Captcha": $("#encodevalue").val(),
                "Lan": lan,
                "PassWord": $("#enpassword").val(),
                "AgainPassWord": $("#ennewpassword").val()
            }
            $.ajax({
                url: "http://union.iqeq.cn/api/Foreign/RegForeignTeacher",
                data: enobj,
                type: 'POST',
                dataType: 'json',
                success: function (data, statusText) {
                    if (data.StateCode == 0) {
                        alert("Registered successfully")
                    } else {
                        alert(data.StateMsg)
                    }
                    // console.log(data, statusText)
                }
            })
        })

        $("#enjq_send").click(function () {
            if (!sendCode) {
                return;
            }
            if ($("#enacount").val() == "") {
                alert("The account/email can not be empty")
                return;
            }
            if (!isEmail($("#enacount").val())) {
                alert("Please fill in the correct email format")
                return;
            }

            $.ajax({
                url: "http://union.iqeq.cn/api/Foreign/GetEmailCaptcha",
                data: { Account: $("#enacount").val(), acType: 3, Lan: lan },
                type: 'GET',
                dataType: 'json',
                success: function (data, statusText) {
                    if (data.StateCode == 0) {
                        showtime(60);
                    } else {
                        alert(data.StateMsg)
                    }
                }
            })
        });
    }



}
function isEmail(str) {
    var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
    return reg.test(str);
}
function GetRequest() {
    var url = location.search; //获取url中"?"符后的字串
    //var url = "?email=343343@qq.com&lan=en"
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
            theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
        }
    }
    return theRequest;
}

function showtime(t) {
    sendCode = false;
    for (i = 1; i <= t; i++) {
        window.setTimeout("update_p(" + i + "," + t + ")", i * 1000);
    }
}
function update_p(num, t) {
    if (num == t) {

        if (lan == "cn") {
            document.getElementById("jq_send").innerHTML = "重新发送";
        } else {
            document.getElementById("enjq_send").innerHTML = "To resend";
        }
        sendCode = true;
    }
    else {
        printnr = t - num;
        if (lan == "cn") {
            document.getElementById("jq_send").innerHTML = " (" + printnr + ")秒后重新发送";
        } else {
            document.getElementById("enjq_send").innerHTML = "Resend after ( " + printnr + " ) seconds";

        }

    }
} 