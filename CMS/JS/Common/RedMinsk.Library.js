/*========================================*/
//  Minh Ngoc
//-----------------------------------------

/*================================================================================*/
//  Minh Ngoc
//================================================================================
// IDSearch : ID của textbox gõ từ khóa tìm kiếm
// IDDropdownList : ID của dropdown list hiển thị dữ liệu
// Gọi hàm này trong sự kiện onkeyup của IDSearch 
// onkeyup="Search('#txt_Search_Category','#txt_AllCategory')" 
//--------------------------------------------------------------------------------
function Search(IDSearch, IDDropdownList) {

    var IDDropdownList_Data = "";
    var index = IDDropdownList.lastIndexOf("#");
    if (index == 0) {
        IDDropdownList_Data = IDDropdownList.substring(1, IDDropdownList.length - 1) + "_Data";
    }

    if ($("#" + IDDropdownList_Data).length == 0) {
        $(IDDropdownList).parent().append("<select style='width:0px; visibility:hidden' id='" + IDDropdownList_Data + "'> " + $(IDDropdownList).html() + "</select>");
    }

    var StringSearch = $(IDSearch).val().toUpperCase();
    $(IDDropdownList).attr('style');

    $(IDDropdownList).html("");

    $("#" + IDDropdownList_Data + "> option").each(function (i) {
        if ($(this).text().toUpperCase().search(StringSearch) != -1) {
            $(IDDropdownList).append("<option value='" + $(this).val() + "'>" + $(this).text() + "</option>");
        }
    });
}
/*================================================================================*/
//  Minh Ngoc
//================================================================================
// div_id : Là ID của đối tượng HTML mà Loading sẽ hiển thị và che đi khi đang load
// Hàm này mục đích để dùng trên 1 trang có nhiều chỗ loading, chỗ nào đang load
// thì ảnh loadinh sẽ hiện và chỉ làm mờ phần đó trên trang
//--------------------------------------------------------------------------------

function ShowLoading(div_id) {
    
     
    if (typeof (div_id) == "undefined") {
        $("body").append('<div id="loading" style="display:none;" >');
    }

    else {
       // alert($(div_id).offset().left + "-" + $(div_id).offset().top);
        if ($(div_id).length <= 0) {
            $("body").append("<div id='" + div_id.replace("#", "") + "_Loading' ><img id='" + div_id.replace("#", "") + "_ImageLoading' src=\"../images/loading.gif\" alt=\"loading...\" />&nbsp;&nbsp;Đang tải...</div>");
        }
        else 
        
        
        {
            $("#" + div_id.replace("#", "")).append("<div id='" + div_id.replace("#", "") + "_Loading' ><img id='" + div_id.replace("#", "") + "_ImageLoading' src=\"../images/loading.gif\" alt=\"loading...\" />&nbsp;&nbsp;Đang tải...</div>");
            
          
            $("#" + div_id.replace("#", "") + "_Loading").css("z-index", "9000");
            $("#" + div_id.replace("#", "") + "_Loading").css("position", "absolute");
            $("#" + div_id.replace("#", "") + "_Loading").css("top", $(div_id).offset().top + "px");
            $("#" + div_id.replace("#", "") + "_Loading").css("left", $(div_id).offset().left + "px");
            $("#" + div_id.replace("#", "") + "_Loading").css("width", $(div_id).width() + "px");
            $("#" + div_id.replace("#", "") + "_Loading").css("height", $(div_id).height() + "px");
            $("#" + div_id.replace("#", "") + "_Loading").css("background-color", "#eee");
            $("#" + div_id.replace("#", "") + "_Loading").css("opacity", 0.5);

            $("#" + div_id.replace("#", "") + "_ImageLoading").css("z-index", "9001");
            $("#" + div_id.replace("#", "") + "_ImageLoading").css("position", "absolute");
            $("#" + div_id.replace("#", "") + "_ImageLoading").css("top" ,  $(div_id).height() / 2 + "px");
            $("#" + div_id.replace("#", "") + "_ImageLoading").css("left",  $(div_id).width() / 2 + "px");

        }
        jQuery(div_id).fadeIn("slow");
    }
}
//================================================================================
// div_id : Là ID của đối tượng HTML mà Loading sẽ hiển thị và che đi khi đang load
// Hàm này mục đích để dùng trên 1 trang có nhiều chỗ loading, chỗ nào đang load
// thì ảnh loadinh sẽ hiện và chỉ làm mờ phần đó trên trang
//--------------------------------------------------------------------------------

function LoadCompleted(div_id) {
    if (typeof (div_id) == "undefined")
    { div_id = '#loading'; jQuery(div_id).fadeOut("slow"); }
    else {
        $("#" + div_id.replace("#", "") + "_Loading").fadeOut("slow");
    }
}
//================================================================================
//================================================================================
//================================================================================
//================================================================================

function WrapSegPaging(numRow, RowPerPage, segPerPage, curentPage, naviId, _sFunc, _itemTitle, isShowTotal) {
    if (typeof (isShowTotal) == "underfined") var isShowTotal = true;
    if (typeof (_itemTitle) == "underfined") var _itemTitle = ' album';
    if (typeof (_outhandle) == "underfined") var _outhandle = '';
    if (typeof (_handle) == "undefined") var _handle = '';
    if (typeof (_sFunc) == "undefined") var _sFunc = '';
    var sHTMLNavi = '';
    var startIndex = 1;
    var endIndex = numPage;
    var constAlpha = 0;
    var numPage = numRow / RowPerPage;
    if (numPage > Math.floor(numPage))
        numPage = Math.floor(numRow / RowPerPage) + 1;
    var numSeg = numPage / segPerPage;
    numSeg = numPage <= segPerPage ? segPerPage : Math.floor(numSeg) + 1;
    if (curentPage % segPerPage == 0) constAlpha = Math.floor(curentPage / segPerPage) - 1;
    else constAlpha = Math.floor(curentPage / segPerPage);
    startIndex = constAlpha * segPerPage + 1;
    endIndex = startIndex + segPerPage;
    endIndex = endIndex > numPage ? numPage + 1 : endIndex;
    $(naviId).html("");

    if (isShowTotal) {
        sHTMLNavi = '<div class=\"soanh\">Tổng số ' + numberFormat(numRow, 3, 0, true, true) + _itemTitle + ' /  ' + numberFormat(numPage, 3, 0, true, true) + ' trang. </div>';
    }
    if (numPage == 1) {
        $(naviId).html(sHTMLNavi);
        return;
    }

    sHTMLNavi += '<div class="sotrang_photos"><ul>';

    if (curentPage > 1 && constAlpha > 0) sHTMLNavi += '<li><a title="Đầu" href="#page1" onclick="WriteClientParameter(\'page\',1);' + _sFunc + '"><img src="/Skins/Images/fist.gif" alt="Đầu" /></a></li>';
    if (constAlpha > 0) sHTMLNavi += '<li><a title="Trước" href="#page' + (parseInt(curentPage) - 1) + '" onclick="WriteClientParameter(\'page\',' + (parseInt(curentPage) - 1) + '); ' + _sFunc + '"><img src="/Skins/Images/pre.gif" alt="Trước" /></a></li>';
    for (i = startIndex; i < endIndex; i++) {
        if (i == curentPage)
            sHTMLNavi += '<li><div class="sotrang_photos2"><a class=\"page_selected\">' + i + '</a></div></li>';
        else {
            sHTMLNavi += '<li><div class="sotrang_photos2"><a title="Trang&nbsp;' + i + '" href="#page' + parseInt(i) + '" onclick="WriteClientParameter(\'page\',' + parseInt(i) + ');' + _sFunc + '">' + i + '</a></div></li>';
        }
    }
    if (constAlpha < numSeg - 1 && endIndex < numPage) sHTMLNavi += '<li><a title="Sau" href="#page' + (parseInt(curentPage) + 1) + '" onclick="WriteClientParameter(\'page\',' + (parseInt(curentPage) + 1) + ');' + _sFunc + '"><img src="/Skins/Images/next.gif" alt="Sau" /></a></li>';
    if (constAlpha < numSeg - 1 && curentPage < numPage && numPage > numSeg) sHTMLNavi += '<li><a title="Cuối" href="#page' + parseInt(numPage) + '" onclick="WriteClientParameter(\'page\',' + parseInt(numPage) + ');' + _sFunc + '"><img src="/Skins/Images/last.gif" alt="Cuối" /></a></li>';
    sHTMLNavi += '</ul></div><div class="pl_clear"></div>';

    if (numRow <= 0) sHTMLNavi = '';
    $(naviId).html(sHTMLNavi);
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

function GoTo(i) {
    location.href = i;
    return false;
}

function dFormat(strDate) {
    var rStr = '';
    if (strDate == '') {
        sDate = rStr;
    }
    else {
        var tDates = strDate.split(" ");
        var tDay = tDates[0].split("/");
        var tTime = tDates[1].split(":");
        var oDay = new Date();
        oDay.setFullYear(tDay[2], tDay[0] - 1, tDay[1]);
        switch (oDay.getDay()) {
            case 0:
                rStr = 'Ch&#7911; nh&#7853;t'; break;
            case 1:
                rStr = 'Th&#7913; hai'; break;
            case 2:
                rStr = 'Th&#7913; ba'; break;
            case 3:
                rStr = 'Th&#7913; t&#432;'; break;
            case 4:
                rStr = 'Th&#7913; n&#259;m'; break;
            case 5:
                rStr = 'Th&#7913; s&#225;u'; break;
            case 6:
                rStr = 'Th&#7913; b&#7843;y'; break;
            default:
                rStr = ''; break;
        }

        rStr = rStr.concat(', ').concat(tDay[1]).concat('/').concat(tDay[0]).concat('/').concat(tDay[2]);
        sDate = rStr;

    }
    document.write(sDate);
}

function dmy(strDate) {
    var temp = new Array();
    temp = strDate.split('/');
    return temp[1].concat('/').concat(temp[0]).concat('/').concat(temp[2]);
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

function numberFormat(num, decimalNum, bolLeadingZero, bolParens, bolCommas) {
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
        var iStart = tmpNumStr.indexOf(",");
        if (iStart < 0)
            iStart = tmpNumStr.length;

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

function newWindow(file, window, w, h) {
    msgWindow = open(file, window, 'resizable=no,width=' + w + ',height=' + h + ',titlebar=no,toolbar=no,scrollbars=yes');
    if (msgWindow.opener == null) msgWindow.opener = self;
}

function toUpper(sInput) {
    sInput = sInput.toUpperCase()
    var sOutput = '', sTemp;
    var i = 0, j = 0;
    for (var i = 0; i < sInput.length; i++) {
        if (sInput.charAt(i) + sInput.charAt(i + 1) == '&#') {
            sTemp = sInput.substring(i + 2, sInput.length);
            j = sTemp.indexOf(';');
            if (j > 4) {
                sOutput += sInput.charAt(i);
            }
            else {
                sTemp = sTemp.substring(0, j)
                switch (sTemp) {
                    case '225': { sOutput += '&#193;'; break; } 	//a'
                    case '224': { sOutput += '&#192;'; break; } 	//a`
                    case '7843': { sOutput += '&#7842;'; break; } //a?
                    case '227': { sOutput += '&#195;'; break; } 	//a~
                    case '7841': { sOutput += '&#7840;'; break; } //a.
                    case '226': { sOutput += '&#194;'; break; } 	//a^
                    case '7845': { sOutput += '&#7844;'; break; } //a^'
                    case '7847': { sOutput += '&#7846;'; break; } //a^`
                    case '7849': { sOutput += '&#7848;'; break; } //a^?
                    case '7851': { sOutput += '&#7850;'; break; } //a^~
                    case '7853': { sOutput += '&#7852;'; break; } //a^.
                    case '259': { sOutput += '&#258;'; break; } 	//a(
                    case '7855': { sOutput += '&#7854;'; break; } //a('
                    case '7857': { sOutput += '&#7856;'; break; } //a(`
                    case '7859': { sOutput += '&#7858;'; break; } //a(?
                    case '7861': { sOutput += '&#7860;'; break; } //a(~
                    case '7863': { sOutput += '&#7862;'; break; } //a(.
                    case '273': { sOutput += '&#272;'; break; } 	//dd
                    case '233': { sOutput += '&#201;'; break; } 	//e'
                    case '232': { sOutput += '&#200;'; break; } 	//e`
                    case '7867': { sOutput += '&#7866;'; break; } //e?
                    case '7869': { sOutput += '&#7868;'; break; } //e~
                    case '7865': { sOutput += '&#7864;'; break; } //e.
                    case '234': { sOutput += '&#202;'; break; } 	//e^
                    case '7871': { sOutput += '&#7870;'; break; } //e^'
                    case '7873': { sOutput += '&#7872;'; break; } //e^`
                    case '7875': { sOutput += '&#7874;'; break; } //e^?
                    case '7877': { sOutput += '&#7876;'; break; } //e^~
                    case '7879': { sOutput += '&#7878;'; break; } //e^.
                    case '237': { sOutput += '&#205;'; break; } 	//i'
                    case '236': { sOutput += '&#204;'; break; } 	//i`
                    case '7881': { sOutput += '&#7880;'; break; } //i?
                    case '297': { sOutput += '&#296;'; break; } 	//i~
                    case '7883': { sOutput += '&#7882;'; break; } //i.
                    case '243': { sOutput += '&#211;'; break; } 	//o'
                    case '242': { sOutput += '&#210;'; break; } 	//i`
                    case '7887': { sOutput += '&#7886;'; break; } //o?
                    case '245': { sOutput += '&#213;'; break; } 	//o~
                    case '7885': { sOutput += '&#7884;'; break; } //o.
                    case '244': { sOutput += '&#212;'; break; } 	//o^
                    case '7889': { sOutput += '&#7888;'; break; } //o^'
                    case '7891': { sOutput += '&#7890;'; break; } //o^`
                    case '7893': { sOutput += '&#7892;'; break; } //o^?
                    case '7895': { sOutput += '&#7894;'; break; } //o^~
                    case '7897': { sOutput += '&#7896;'; break; } //o^.
                    case '417': { sOutput += '&#416;'; break; } 	//o*
                    case '7899': { sOutput += '&#7898;'; break; } //o*'
                    case '7901': { sOutput += '&#7900;'; break; } //o*`
                    case '7903': { sOutput += '&#7902;'; break; } //o*?
                    case '7905': { sOutput += '&#7904;'; break; } //o*~
                    case '7907': { sOutput += '&#7906;'; break; } //o*.
                    case '250': { sOutput += '&#218;'; break; } 	//u'
                    case '249': { sOutput += '&#217;'; break; } 	//u`
                    case '7911': { sOutput += '&#7910;'; break; } //u?
                    case '361': { sOutput += '&#360;'; break; } 	//u~
                    case '7909': { sOutput += '&#7908;'; break; } //u.
                    case '432': { sOutput += '&#431;'; break; } 	//u*
                    case '7913': { sOutput += '&#7912;'; break; } //u*'
                    case '7915': { sOutput += '&#7914;'; break; } //u*`
                    case '7917': { sOutput += '&#7916;'; break; } //u*?
                    case '7919': { sOutput += '&#7918;'; break; } //u*~
                    case '7921': { sOutput += '&#7920;'; break; } //u*.
                    case '253': { sOutput += '&#221;'; break; } 	//y'
                    case '7923': { sOutput += '&#7922;'; break; } //y`
                    case '7927': { sOutput += '&#7926;'; break; } //y?
                    case '7929': { sOutput += '&#7928;'; break; } //y~
                    case '7925': { sOutput += '&#7924;'; break; } //y.
                    default: { sOutput += '&#' + sTemp + ';'; break; }
                }
                i += j + 2;
            }
        }
        else {
            sOutput += sInput.charAt(i);
        }
    }
    return sOutput;
}

function setCookie(Name, Path, Expires, Value) {
    var cstr = Name.concat('=').concat(Value);
    if (Path == '')
        Path = '/';
    cstr = cstr.concat(';path=').concat(Path);
    if (Expires == '')
        Expires = (new Date(2020, 11, 14)).toGMTString();
    document.cookie = cstr.concat(';expires=').concat(Expires);
}

function getCookie(Name, Default) {
    var cookie = document.cookie;
    var ir = 0, ie = 0, sf = '', i = 0, j = 0;
    Name = Name.toLowerCase();
    if (typeof (Default) == "undefined")
        Default = '';
    if (cookie.length == 0)
        return Default;
    if ((ir = Name.indexOf('.')) == -1) {
        if (cookie.substr(0, Name.length + 1).toLowerCase() == Name.concat('=')) {
            if ((ie = cookie.indexOf(';')) != -1) {
                cookie = cookie.substr(0, ie);
            }
        }
        else {
            if ((ie = cookie.toLowerCase().indexOf('; '.concat(Name).concat('='))) == -1)
                return Default;
            cookie = cookie.substr(ie + 2);
            if ((ie = cookie.indexOf(';')) != -1) {
                cookie = cookie.substr(0, ie);
            }
        }
        sf = ';';
    }
    else {
        if ((i = cookie.toLowerCase().indexOf(Name.concat('='))) != -1) {
            if ((j = cookie.indexOf(';', i)) > i + Name.length + 1) {
                return ReplaceAll(unescape(cookie.substr(i + Name.length + 1, j - i - Name.length - 1)), '+', ' ');
            }
            else {
                j = cookie.length;
                return ReplaceAll(unescape(cookie.substr(i + Name.length + 1, j - i - Name.length - 1)), '+', ' ');
            }
        }

        var Root = Name.substr(0, ir);
        Name = Name.substr(ir + 1);
        if (cookie.substr(0, Root.length + 1).toLowerCase() == Root.concat('=')) {
            if ((ie = cookie.indexOf(';')) != -1) {
                cookie = cookie.substr(0, ie);
            }
        }
        else {
            if ((ie = cookie.toLowerCase().indexOf('; '.concat(Root).concat('='))) == -1)
                return Default;

            cookie = cookie.substr(ie + 2);

            if ((ie = cookie.indexOf(';')) != -1) {
                cookie = cookie.substr(0, ie);
            }
        }
        cookie = cookie.substr(Root.length + 1);
        sf = '&';
    }

    if (cookie.substr(0, Name.length + 1).toLowerCase() == Name.concat('=')) {
        ir = Name.length + 1;
    }
    else {
        if ((ir = cookie.toLowerCase().indexOf('&'.concat(Name).concat('='))) == -1)
            return Default;
        ir += Name.length + 2;
    }
    if ((ie = cookie.indexOf(sf, ir)) == -1) {
        return ReplaceAll(unescape(cookie.substr(ir)), '+', ' ');
    }
    else {
        return ReplaceAll(unescape(cookie.substring(ir, ie)), '+', ' ');
    }
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

function setFColor(field, s) {
    field.style.color = s;
}

function FieldOnFocus(field, s) {
    if (field.value == s) { field.value = ''; }
}

function FieldOnBlur(field, s) {
    if (field.value == '') { field.value = s; }
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

function GetFileName(path) {
     
   return path.substring(path.lastIndexOf('\\') + 1);
}

function SubString(str, n) {
    if (n <= 0)
        return "";
    else if (n > String(str).length)
        return str;
    else {
        var iLen = String(str).length;
        return String(str).substring(iLen, iLen - n);
    }
}

function CheckAll(me, chkname) {
    for (i = 0; i < document.getElementsByName(chkname).length; i++) {
        document.getElementsByName(chkname)[i].checked = me.checked;
    }
}

function checkMe(o) {
    if (o.checked) o.value = 'True';
    else o.value = 'False';
}

function CheckItem(_chkname, _value, _checkbox) {
    for (var i = 0; i < document.getElementsByName(_chkname).length; i++) {
        if (document.getElementsByName(_chkname)[i].value == _value) {
            if (_checkbox) {
                if (document.getElementsByName(_chkname)[i].checked == true) {
                    document.getElementsByName(_chkname)[i].checked = false;
                }
                else {
                    document.getElementsByName(_chkname)[i].checked = true;
                }
            }
            else {
                document.getElementsByName(_chkname)[i].checked = true;
            }
            break;
        }
    }
}

function limitText(ed, e, maxCh) {
    txt = tinyMCE.activeEditor.getContent().replace('<p>', '').replace('</p>', '');
    $('#comment_content').val(txt);
    $('#txtcomment').maxlength({
        'feedback': '.charsLeft'
    });
    if (txt.length <= maxCh) {
        $('#commentCount').text(maxCh - txt.length);
    }
    else {
        $('#commentCount').text("0");
        tinyMCE.activeEditor.setContent(txt.substring(0, maxCh));
    }
}

function changeTextForm(t) {
    if (t == 1) {
        $("#nonecomment").hide();
        $("#frmPostComment").show();
        $("#comment_content").focus();
        $("#comment_content").val('');
    } else {
        $("#frmPostComment").hide();
        $("#nonecomment").show();
    }
}

function formatDateTime(dt) {
    // Vài giây trước
    // 1-59 phút trước
    // 1-23 tiếng trước
    // 9:58 15/08/2010

    // Input DateTime
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
        strTime = numberHour.toString() + " giờ trước";

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

function resizePhotosDelagate(me, i, isMissteenAlbum) {
    var _maxWidth = 250;
    var _maxHeight = 240;
    var _iconHeight = 8;
    var _iconMarginLeft = -2;
    var _totalImageMargin = 10;
    var _marginLeft = 0;
    BrowserDetect.init();
    if ($(me).width() >= $(me).height()) {
        $(me).width(_maxHeight);
        _marginLeft = Math.round(Math.abs(_maxWidth - $(me).width() - _totalImageMargin) / 2);
        if (BrowserDetect.browser == 'Explorer' && BrowserDetect.version <= 7)
            $(me).parent().parent().css({ "margin-left": Math.round(_marginLeft / 2) });
        else
            $(me).parent().parent().css({ "margin-left": _marginLeft });
    }
    else {
        _maxWidth = 250;
        _maxHeight = 250;
        $(me).height(_maxHeight);
        _marginLeft = Math.round(Math.abs(_maxWidth - $(me).width() - _totalImageMargin) / 2);
        if (BrowserDetect.browser == 'Explorer' && BrowserDetect.version <= 7)
            $(me).parent().parent().css({ "margin-left": Math.round(_marginLeft / 2) + 1 });
        else
            $(me).parent().parent().css({ "margin-left": _marginLeft });
    }

    if (BrowserDetect.browser == 'Explorer' && BrowserDetect.version <= 7)
        $("#symbol_" + i).parent().parent().width($("#symbol_" + i).parent().parent().width() - 3);
    $("#symbol_" + i).css({ "margin-left": -2 });
    $("#symbol_" + i).width($("#symbol_" + i).width() - (_marginLeft + _iconMarginLeft));
    $("#symbol_" + i).height(Math.round($(me).height() / _iconHeight) * _iconHeight);

    if (isMissteenAlbum) {
        $(me).css({ "border": "solid 1px #dd0067" });
        $("#symbol_" + i).css({ "background": "url('/Skins/Images/bg_album_missteen.png') repeat-y" });
    }
    else {
        $(me).css({ "border": "solid 1px #b9b9b9" });
        $("#symbol_" + i).css({ "background": "url('/Skins/Images/bg_album.png') repeat-y" });
    }
}
function resizeImage(me) {
    var maxW = 125;
    var maxH = 125;
    w = parseInt($(me).width());
    h = parseInt($(me).height());
    if (w >= 10 && h >= 10) {
        if (w >= h) {
            $(me).width(maxW);
            $(me).css({ "margin-top": Math.round(Math.abs(maxH - $(me).height()) / 2) });
        }
        else {
            $(me).height(maxH);
            $(me).css({ "text-align": "center" });
        }
    }
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

function showMessageBox(msg, title, width) {
 
    if (typeof (title) == "undefined") var title = "Thông báo";
    if ($("#RM_MessageBox").length <= 0) {
        $("body").append('<div id="RM_MessageBox" style="display:none;" title="' + title + '"><br /><span style="float:left; margin-right:10px;"><img src="/Images/popup_logo.png" alt="" width=\'66\' /></span><div class="popup_message"></div></div>');
    }

    $("#RM_MessageBox>div").html(msg);
    $("#RM_MessageBox").dialog({
        buttons: [{
            text: "Ok",
            click: function () {
                $(this).dialog("close");
            }
        }]
    });
    $(this).dialog();
 
}

function showConfirmBox(msg, callBack, close) {
    if (typeof (close) == "undefined") var close = true;
    if ($("#GoConfirmBox").length <= 0) {
        $("body").append('<div id="GoConfirmBox" style="display:none;" title="Confirm"><br /><span style="float:left; margin-right:10px;"></span><div class="blog_popup_message"></div></div>');
    }
    else
        $("#GoConfirmBox").removeAttr("title").attr("title", "Confirm");
    $("#GoConfirmBox>div").html(msg);
    $("#GoConfirmBox").dialog('open');
    $("#GoConfirmBox").dialog({
        modal: true,
        resizable: false,
        buttons: {
            'Cancel': function () {
                $(this).dialog('close');
            },
            'OK': function () {
                callBack();
                if (close) $(this).dialog('close');
            }
        },
        close: function () {
            $(this).dialog("destroy");
        }
    });
}

function WaitingBox(msg, title, btntitle) {
    if (typeof (title) == "undefined") var title = "Notify";
    if ($("#GoWaitingBox").length <= 1) {
        $("body").append('<div id="GoWaitingBox" style="display:none;" title="' + title + '"><br /><span style="float:left; margin-right:10px;"></span><div class="popup_message"></div></div>');
    } 

    $("#GoWaitingBox>div").html(msg + '<br /><br /><center><img src="/Images/loading.gif" /></center>');
    $("#GoWaitingBox").dialog('open');
    $("#GoWaitingBox").dialog({
        modal: true,
        resizable: false,
        buttons: {
            'Close': function () {
                $(this).dialog('close');
                return true;
            }
        },
        close: function () {
            $(this).dialog("destroy");
        }
    });

}

function PopupBox(objContainer, width, height, title, callBack) {
    if (typeof (title) == "undefined") var title = "";
    if (typeof (width) == "undefined") var width = 500;
    if (typeof (height) == "undefined") var height = 300;
    if ($(objContainer).length <= 0) {
        $("body").append('<div id="' + objContainer.replace('#', '') + '" style="display:none; overflow-x:hidden; overflow-y:scroll;" title="' + title + '"></div>');
    }
    callBack();
    $(objContainer).dialog('open');
    $(objContainer).dialog({
        modal: true,
        width: width,
        height: height,
        resizable: false,
        buttons: {
            'Close': function () {
                $(this).dialog('close');
            }
        },
        close: function () {
            $(this).dialog("destroy");
        }
    });
}
function PopupForm(objContainer, width, height, title, Function1, Function2) {
    if (typeof (title) == "undefined") var title = "";
    if (typeof (width) == "undefined") var width = 500;
    if (typeof (height) == "undefined") var height = 300;
    if ($(objContainer).length <= 0) {
        $("body").append('<div id="' + objContainer.replace('#', '') + '" style="display:none; overflow-x:hidden; overflow-y:scroll;" title="' + title + '"></div>');
    }
    //Function1();
    $(objContainer).dialog('open');
    $(objContainer).dialog({
        modal: true,
        width: width,
        height: height,
        resizable: false,
        buttons: {
            'Close': function () {
                $(this).dialog('close');
            },
            'Save': function () {
                //Function2();
            }
        },
        close: function () {
            $(this).dialog("destroy");
        }
    });
}

function CallAjax(url, callBack, cacheName) {
    if (typeof (cacheName) == "undefined") var cacheName = "";
    var cacheData = null;
    if (cacheName != "") {
        try {
            cacheData = $.jCache.getItem(cacheName);
        }
        catch (e) { }
    }
    if (cacheData == null)
        $.ajax({
            url: url,
            type: "POST",
            dataType: "json",
            success: function (data) {
                callBack(data);
                if (cacheName != "") $.jCache.setItem(cacheName, data);
            },
            error: function (ex) {
                //alert(ex);
            }
        });
    else callBack(cacheData);
}

function SendRequestAjax(url, dataPost, callBack) {
    $.ajax({
        url: url,
        type: "POST",
        dataType: "json",
        data: dataPost,
        success: function (data) {
            callBack(data);
        },
        error: function (ex) {
            //alert(ex);
        }
    });
}

function SelectAll(selectId, typevalue) {
    cboselected = document.getElementById(selectId);
    for (var i = 0; i < cboselected.length; i++) {
        cboselected.options[i].selected = typevalue;
    }
}


function CheckSearchRank() {
    if (($("#txt_from_date").val() == "") || ($("#txt_to_date").val() == "")) {
        showMessageBox("Select date /time");
        return false;
    }
    else {
        return true;
    }
}