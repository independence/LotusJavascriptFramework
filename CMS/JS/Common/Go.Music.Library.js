function showloading(div_id) {
    if (typeof (div_id) == "undefined") div_id = '#loading';
    if ($(div_id).length <= 0)
        $("body").append("<div id=\"" + div_id.replace("#", "") + "\"></div>");
    $(div_id).html("<img src=\"/Skins/Black/images/icon/loading.gif\" alt=\"loading...\" />&nbsp;&nbsp;Đang tải...");
    $(div_id).fadeIn("slow");
}
function LoadCompleted(div_id) {
    if (typeof (div_id) == "undefined") div_id = '#loading'; jQuery(div_id).fadeOut("slow");
}
function showLoadingOver(objContainer) {
    var offset = $(objContainer).offset();
    var w = $(objContainer).width();
    var h = $(objContainer).height();
    if ($("#LoadingOver").length <= 0) $("body").append("<div id=\"LoadingOver\"></div>");
    $("#LoadingOver").css({ "top": offset.top + "px", "left": offset.left + "px", "width": w + "px", "height": h + "px", "z-index": "2000", "background-color": "#000", "opacity": "0", "position": "absolute", "display": "none", "background-image": "url(/Skins/Black/images/icon/loading.gif)", "background-position": "center center", "background-repeat": "no-repeat" });
    $("#LoadingOver").fadeIn('0');
}
function hideLoadingOver() {
    $("#LoadingOver").fadeOut('0');
}
function Jsonsort(a, b) {
    return parseInt(b.Id) - parseInt(a.Id);
}
function keyCountCharacter(obj, e) {
    var key = (window.event) ? window.event.keyCode : e.charCode;
    var strLength = 0;
    var tem = "";
    var maxCh = 300;

    strLength = Trim(obj.value).length;
    if (strLength <= maxCh) {
        tem = obj.value;
        $('#commentCount').text(maxCh - strLength);
    }
    else {
        if (key != 0) {
            KeypressThrow(e);
        }
    }
}
function KeypressThrow(e) {
    if (window.event)
        window.event.returnValue = null;
    else
        if (e.preventDefault)
            e.preventDefault();
    e.returnValue = false;
    return false;
}
function mouseCountCharacter(obj) {
    var strLength = 0;
    var maxCh = 300;
    strLength = Trim(obj.value).length;
    if (strLength <= maxCh) {
        $('#commentCount').text(maxCh - strLength);
    }
    else {
        $('#commentCount').text(maxCh - strLength);
        showMessageBox("Bạn chỉ được phép nhập tối đa " + maxCh + " ký tự. Vui lòng nhập lại!");
    }
}

function goTo(i) {
    location.href = i;
    return false;
}

function Hexa(input) {
    return ('00000000'.concat(input.toString(16)), 8);
}

function HexToDec(input) {
    var rt = 0;
    var cha = '';
    var temp;
    var len = input.length;
    for (var i = 1; i <= len; i++) {
        cha = Left(input, 1);
        switch (cha) {
            case 'A': case 'a': temp = 10; break;
            case 'B': case 'b': temp = 11; break;
            case 'C': case 'c': temp = 12; break;
            case 'D': case 'd': temp = 13; break;
            case 'E': case 'e': temp = 14; break;
            case 'F': case 'f': temp = 15; break;
            default: temp = parseInt(cha); break;
        }
        rt = rt + temp * Math.pow(16, len - i);
        input = (input, len - i);
    }
    return rt;
}

function CurrencyFormat(num, decimalNum, bolLeadingZero, bolParens, bolCommas) {
    if (typeof (decimalNum) == "undefined") decimalNum = 3;
    if (typeof (bolLeadingZero) == "undefined") bolLeadingZero = true;
    if (typeof (bolParens) == "undefined") bolParens = true;
    if (typeof (bolCommas) == "undefined") bolCommas = true;

    if (isNaN(parseInt(num))) return "0";

    var tmpNum = num;
    var iSign = num < 0 ? -1 : 1;

    tmpNum *= Math.pow(10, decimalNum);
    tmpNum = Math.round(Math.abs(tmpNum))
    tmpNum /= Math.pow(10, decimalNum);
    tmpNum *= iSign;

    var tmpNumStr = new String(tmpNum);

    if (!bolLeadingZero && num < 1 && num > -1 && num != 0)
        if (num > 0)
            tmpNumStr = tmpNumStr.substring(1, tmpNumStr.length);
        else
            tmpNumStr = "-" + tmpNumStr.substring(2, tmpNumStr.length);

    if (bolCommas && (num >= 1000 || num <= -1000)) {
        var iStart = tmpNumStr.indexOf(".");
        if (iStart < 0)
            iStart = tmpNumStr.length;
        else {
            tmpNumStr = tmpNumStr.replace(".", ",");
        }

        iStart -= 3;
        while (iStart >= 1) {
            tmpNumStr = tmpNumStr.substring(0, iStart) + "." + tmpNumStr.substring(iStart, tmpNumStr.length)
            iStart -= 3;
        }
    }
    if (bolParens && num < 0)
        tmpNumStr = "(" + tmpNumStr.substring(1, tmpNumStr.length) + ")";
    return tmpNumStr;
}

function validateInPutLetter(strValue) {
    var objRegExp = /^[a-z\u00C0-\u00ff]+$/;
    return objRegExp.test(strValue);
}

function newWindow(file, window, resizable, w, h) {
    msgWindow = open(file, window, 'resizable=' + (resizable ? 'yes' : 'no') + ',width=' + w + ',height=' + h + ',titlebar=no,toolbar=no,scrollbars=yes');
    if (msgWindow.opener == null) msgWindow.opener = self;
}

function CharReplace(iStr) {
    var r1 = /%26/g;
    var r2 = /%20/g;
    var r3 = /%22/g;
    iStr = iStr.replace(r1, '&');
    iStr = iStr.replace(r2, ' ');
    iStr = iStr.replace(r3, '"');
    return iStr;
}

function Trim(iStr) {
    while (iStr.charCodeAt(0) <= 32) {
        iStr = iStr.substr(1);
    }

    while (iStr.charCodeAt(iStr.length - 1) <= 32) {
        iStr = iStr.substr(0, iStr.length - 1);
    }

    return iStr;
}

function Left(str, n) {
    if (n <= 0)
        return "";
    else if (n > String(str).length)
        return str;
    else
        return String(str).substring(0, n);
}
function formatDateTime(dt) {
    // Vài giây trước
    // 1-59 phút trước
    // 1-23 tiếng trước
    // 9:58 15/08/2010

    // Input DateTime
    dt = new Date(dt);
    var yy = dt.getFullYear();
    var mm = (dt.getMonth() + 1);
    var dd = dt.getDate();
    var hr = dt.getHours();
    var mi = dt.getMinutes();
    var ss = dt.getSeconds();
    // Curent DateTime
    var curentDate = new Date();
    var cYY = curentDate.getFullYear();
    var cMM = (curentDate.getMonth() + 1);
    var cDD = curentDate.getDate();
    var cHR = curentDate.getHours();
    var cMI = curentDate.getMinutes();
    var cSS = curentDate.getSeconds();

    var strTime = "";
    // If InputDate Is Today
    var dif = curentDate.getTime() - dt.getTime();
    var numberSecond = Math.abs(dif / 1000);
    var numberMinute = Math.floor(numberSecond / 60);
    var numberHour = Math.floor(numberSecond / 3600);
    if (numberSecond < 60)
        strTime = "Vài giây trước";
    else if (numberSecond < 3600)
        strTime = numberMinute.toString() + " phút trước";
    else if (numberSecond < 3600 * 24)
        strTime = numberHour.toString() + " tiếng trước";

    else {
        strTime = parseInt(hr) < 10 ? ('0' + hr) : hr;
        strTime += ":" + (parseInt(mi) < 10 ? ('0' + mi) : mi);
        strTime += " " + (parseInt(dd) < 10 ? ('0' + dd) : dd);
        strTime += "/" + (parseInt(mm) < 10 ? ('0' + mm) : mm);
        strTime += "/" + (parseInt(yy) < 10 ? ('0' + yy) : yy);
    }
    return strTime;
}




function setComboboxSelected(val, div_id) {
    var cbo = document.getElementById(div_id);
    for (var i = 0; i < cbo.options.length; i++)
        if (cbo.options[i].value == val)
            cbo.options[i].selected = true;
}
function IsWord(s) {
    if (Trim(s) != "") {
        var sWord = s.split(' ');
        for (var i = 0; i < sWord.length; i++) {
            if (sWord[i].length > 25)
                return false;
        }
        return true;
    }
    else
        return false;
}

//function showMessageBox(msg, title, width) {
//    alert("dsdsd");
//    if (typeof (title) == "undefined") var title = "Thông báo";
//    if ($("#RM_MessageBox").length <= 0) {
//        $("body").append('<div id="RM_MessageBox" style="display:none;" title="' + title + '"><br /><span style="float:left; margin-right:10px;"><img src="/Skins/Default/images/dialog/popup_logo.png" alt="logo" width=\'66\' /></span><div class="popup_message"></div></div>');
//    }

//    $("#RM_MessageBox>div").html(msg);
//    $("#RM_MessageBox").dialog({
//        buttons: [{
//            text: "Ok",
//            click: function () {
//                $(this).dialog("close");
//            }
//        }]
//    });
//    $(document).ready(function() {
//       $(this).dialog("open");
//    }
//    return false;
//}
function showConfirmBox(msg, callBack, close, title) {
    if (typeof (close) == "undefined") var close = true;
    if (typeof (title) == "undefined") var title = "Xác nhận";

    if ($("#RM_MessageBox").length <= 0) {
        $("body").append('<div id="RM_MessageBox" style="display:none;" title="' + title + '"><br /><span style="float:left; margin-right:10px;"><img src="/Skins/Default/images/dialog/popup_logo.png" alt="logo" width=\'66\' /></span><div class="popup_message"></div></div>');
    }
    else
        $("#RM_MessageBox").removeAttr("title").attr("title", title);
    $("#RM_MessageBox>div").html(msg);
    $("#RM_MessageBox").dialog({
        modal: true,
        resizable: false,
        buttons: {
            'Bỏ qua': function () {
                $(this).dialog('close');
            },
            'Đồng ý': function () {
                if (close) $(this).dialog('close');
                if (typeof (callBack) != "undefined") callBack();
            }
        },
        close: function () {
            $(this).dialog("destroy");
        }
    });
    $("#RM_MessageBox").dialog();
}
function WaitingBox(msg, title, btntitle) {
    if (typeof (title) == "undefined") var title = "Thông báo";
    if ($("#RM_MessageBox").length <= 0) {
        $("body").append('<div id="RM_MessageBox" style="display:none;" title="' + title + '"><br /><span style="float:left; margin-right:10px;"><img src="/images/popup_logo.jpg" alt="logo" width=\'66\' /></span><div class="popup_message"></div></div>');
    }
    else
        $("#RM_MessageBox").removeAttr("title").attr("title", "Xác nhận");
    $("#RM_MessageBox>div").html(msg + '<br /><br /><center><img src="/Skins/Black/Images/ajax-loader.gif" /></center>');
    $("#RM_MessageBox").dialog({
        modal: true,
        resizable: false,
        buttons: {
            'Đóng': function () {
                $(this).dialog('close');
            }
        },
        close: function () {
            $(this).dialog("destroy");
        }
    });
    $("#RM_MessageBox").dialog();
}
function PopupBox(objContainer, width, height, title, BeforeCallBack) {
    if (typeof (title) == "undefined") var title = "";
    if (typeof (width) == "undefined") var width = 500;
    if (typeof (height) == "undefined") var height = 300;
    if (typeof (objContainer) == "undefined") var objContainer = "#RM_MessageBox";
    if ($(objContainer).length <= 0) {
        $("body").append('<div id="' + objContainer.replace('#', '') + '" style="display:none; overflow-x:hidden; overflow-y:scroll;" title="' + title + '"></div>');
    }
    $(objContainer).dialog({
        modal: true,
        width: width,
        height: height,
        resizable: false,
        buttons: {
            'Đóng': function () {
                $(this).dialog('close');
            }
        },
        close: function () {
            $(this).dialog("destroy");
        }
    });
    $(objContainer).dialog();
    if (typeof BeforeCallBack != "undefined") BeforeCallBack();
}
function PopupForm(objContainer, width, height, title, BeforeCallBack, CallBack) {
    if (typeof (title) == "undefined") var title = "";
    if (typeof (width) == "undefined") var width = 500;
    if (typeof (height) == "undefined") var height = 300;
    if (typeof (objContainer) == "undefined") var objContainer = "#RM_MessageBox";
    if ($(objContainer).length <= 0) {
        $("body").append('<div id="' + objContainer.replace('#', '') + '" style="display:none; overflow-x:hidden; overflow-y:scroll;" title="' + title + '"></div>');
    }
    $(objContainer).dialog({
        modal: true,
        width: width,
        height: height,
        resizable: false,
        buttons: {
            'Đóng': function () {
                $(this).dialog('close');
            },
            'Lưu': function () {
                if (typeof CallBack != "undefined") CallBack();
            }
        },
        close: function () {
            $(this).dialog("destroy");
        }
    });
    $(objContainer).dialog();
    if (typeof BeforeCallBack != "undefined") BeforeCallBack();
}
function PopupFormDynamic(objContainer, width, height, title, buttons, callEsc) {
    if (typeof (title) == "undefined") var title = "";
    if (typeof (width) == "undefined") var width = 500;
    if (typeof (height) == "undefined") var height = 300;
    if (typeof (objContainer) == "undefined") var objContainer = "#RM_MessageBox";
    if ($(objContainer).length <= 0) {
        $("body").append('<div id="' + objContainer.replace('#', '') + '" style="display:none; overflow:hidden;" title="' + title + '"></div>');
    }
    $(objContainer).dialog({
        modal: true,
        width: width,
        height: height,
        resizable: false,
        buttons: buttons,
        close: function () {
            $(this).dialog("destroy");
            if (typeof (callEsc) != "undefined") callEsc();
        }
    });
    $(objContainer).dialog();
}
function ChangeTab(obj, className) {
    if (typeof (className) == "undefined") var className = ".blockNew";
    $(className + ">.tab>.ItemSelected").removeClass("ItemSelected").addClass("ItemUnSelected");
    $(obj).addClass("ItemSelected");
}
function CallAjax(url, callBack, cacheName) {
    var _request = null;
    if (typeof (cacheName) == "undefined") var cacheName = "";
    if (typeof callBack == "undefined") var callBack = function (args) { return args; };
    var cacheData = null;
    if (cacheName != "") {
        try {
            cacheData = $.jCache.getItem(cacheName);
        }
        catch (e) { }
    }
    if (cacheData == null)
        _request = $.ajax({
            url: url,
            type: "POST",
            dataType: "json",
            success: function (data) {
                callBack(data);
                if (cacheName != "") $.jCache.setItem(cacheName, data);
            },
            error: function (ex) {
            }
        });
    else callBack(cacheData);
    return _request;
}
function SendRequestAjax(url, dataPost, callBack) {
    if (typeof callBack == "undefined") var callBack = function (args) { return args; };
    $.ajax({
        url: url,
        type: "GET",
        dataType: "json",
        data: dataPost,
        async: true,
        timeout: 200000,
        cache: true,
        success: function (data) {
            callBack(data);
        },
        error: function (ex) {
        }
    });
}
function SendRequestAjaxPost(url, dataPost, callBack) {
    if (typeof callBack == "undefined") var callBack = function (args) { return args; };
    $.ajax({
        url: url,
        type: "POST",
        dataType: "json",
        data: dataPost,
        async: true,
        timeout: 200000,
        success: function (data) {
            callBack(data);
        },
        error: function (ex) {
        }
    });
}
function SendRequestAjaxSyn(url, dataPost, callBack) {
    if (typeof callBack == "undefined") var callBack = function (args) { return args; };
    $.ajax({
        url: url,
        type: "GET",
        dataType: "json",
        data: dataPost,
        async: false,
        timeout: 20000,
        success: function (data) {
            callBack(data);
        },
        error: function (ex) {
        }
    });
}


function FieldOnFocus(field, s) {
    if ($(field).val() == s) { $(field).val(''); }
}

function FieldOnBlur(field, s) {
    if ($(field).val() == '') { $(field).val(s); }
}

function OriginalHtmlTags(s) {
    s = s.replace("<", "&lt;");
    s = s.replace(">", "&gt;");
    s = s.replace(" ", "&nbsp;");
    return s;
}
function Validate(email) {
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    return reg.test($(email).val());
}
function removeHTMLTags(strInput) {
    strInput = strInput.replace(/&(lt|gt);/g, function (strMatch, p1) {
        return (p1 == "lt") ? "<" : ">";
    });
    var strOutput = strInput.replace(/<\/?[^>]+(>|$)/g, "");
    return strOutput;
}
