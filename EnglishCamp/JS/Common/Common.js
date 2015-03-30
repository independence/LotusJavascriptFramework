function GetTime(time, get) {

    var fields = time.split(":");

    var Hour = fields[0];

    var Minute = fields[1];

    if (get == "getHour") {
        return Hour;
    }
    if (get == "getMinute") {
        return Minute;
    }

}

function SplitTime(dt, TypeIn, TypeGet) {
    // Ngay 09 thang 06 nam 2013 3h5p7s
    // Input  :  
    //   TypeIn :1   // dd/MM/yyyy hh:mm:ss
    //   TypeIn :2   // MM/dd/yyyy hh:mm:ss

    // Output :          
    //   TypeGet :"d"   // day : 9
    //   TypeGet :"dd"  // day : 09

    //   TypeGet :"M"   // month : 6
    //   TypeGet :"MM"  // month : 06

    //   TypeGet :"yy"   // year : 13
    //   TypeGet :"yyyy" // year : 2013

    //   TypeGet :"h"   // hour : 3
    //   TypeGet :"hh"  // hour : 03

    //   TypeGet :"m"   // minute : 5
    //   TypeGet :"mm"  // minute : 05

    //   TypeGet :"s"   // second : 7
    //   TypeGet :"ss"  // second : 07

    var fields = dt.split(" ");

    var date = fields[0];

    var time = fields[1];


    var Temp1 = date.split("/");
    var A1 = Temp1[0];
    var A2 = Temp1[1];
    var A3 = Temp1[2];
    var AA1,AA2,AA3;
  
    var Temp2 = time.split(":");
    var B1 = Temp2[0];
    var B2 = Temp2[1];
    //var B3 = Temp1[2];
    var BB1, BB2, BB3;


    if (parseInt(A1) <= 9) { AA1 = "0" + parseInt(A1); } else { AA1 = A1;}
    if (parseInt(A2) <= 9) { AA2 = "0" + parseInt(A2); } else { AA2 = A2;}
    if (parseInt(A3) <= 9) { AA3 = "0" + parseInt(A3); } else { AA3 = A3;}

    if (parseInt(B1) <= 9) { BB1 = "0" + parseInt(B1); } else { BB1 = B1;}
    if (parseInt(B2) <= 9) { BB2 = "0" + parseInt(B2); } else { BB2 = B2;}

   // if (parseInt(B3) <= 9) { BB3 = "0" + B3; }
  

    if (TypeIn == "dd/MM/yyyy hh:mm") {

        var d = A1;
        var M = A2;
        var yy = A3;

        var dd = AA1;
        var MM = AA2;
        var yyyy = AA3;

        var h = B1;
        var m = B2;
        //var s = B3;

        var hh = BB1;
        var mm = BB2;
       // var ss = BB3;


        if (TypeGet == "d") { return d; }
        else if (TypeGet == "dd") {return dd;}
        else if (TypeGet == "M") {return M; }
        else if (TypeGet == "MM") { return MM;}
        else if (TypeGet == "yy") {return yy;}
        else if (TypeGet == "yyyy") {return yyyy;}
        else if (TypeGet == "h") {return h;}
        else if (TypeGet == "hh") {return hh;}
        else if (TypeGet == "m") {return m; }
        else if (TypeGet == "mm") { return mm; }
        //else if (TypeGet == "s") { return s; }
        //else if (TypeGet == "ss") { return ss; }
        else {
            alert("[ERR]SplitTime: Chưa có kiểu TypeGet này");
        }
    }
    else if (TypeIn == "MM/dd/yyyy hh:mm") {

        var d = A2;
        var M = A1;
        var yy = A3;

        var dd = AA1;
        var MM = AA2;
        var yyyy = AA3;

        var h = B1;
        var m = B2;
       // var s = B3;

        var hh = BB1;
        var mm = BB2;
       // var ss = BB3;


        if (TypeGet == "d") { return d; }
        else if (TypeGet == "dd") { return dd; }
        else if (TypeGet == "M") { return M; }
        else if (TypeGet == "MM") { return MM; }
        else if (TypeGet == "yy") { return yy; }
        else if (TypeGet == "yyyy") { return yyyy; }
        else if (TypeGet == "h") { return h; }
        else if (TypeGet == "hh") { return hh; }
        else if (TypeGet == "m") { return m; }
        else if (TypeGet == "mm") { return mm; }
       // else if (TypeGet == "s") { return s; }
        //else if (TypeGet == "ss") { return ss; }
        else {
            alert("[ERR]SplitTime: Chưa có kiểu TypeGet này");
        }
    }
    else {
        alert("[ERR]GetDateFromDateTime: Chưa có kiểu TypeIn này");
    }

}

function GetDateFromDateTime(dt,TypeIn,TypeOut) {

    // Input  :  
    //   TypeIn :1   // dd/MM/yyyy hh:ss
    //   TypeIn :2   // MM/dd/yyyy hh:ss

    // Output :          
    //   TypeOut :1   // dd/MM/yyyy
    //   TypeOut :2   // MM/dd/yyyy


    var fields = dt.split(" ");

    var date = fields[0];

    var time = fields[1];

    var Temp1 = date.split("/");
    var A1 = Temp1[0]; 
    var A2 = Temp1[1];
    var A3 = Temp1[2];

    if (parseInt(A1) <= 9) {
        A1 = "0" + parseInt(A1);
    }
     if (parseInt(A2) <= 9) {
         A2 = "0" + parseInt(A2);
     }
     if (parseInt(A3) <= 9) {
         A3 = "0" + parseInt(A3);
     }

    if (TypeIn == 1) {
        var dd = A1;
        var MM = A2;
        var yyyy = A3;



        if (TypeOut == 1) {
            strTime = dd + "/" + MM + "/" + yyyy ;
        }
        else if (TypeOut == 2) {
            strTime = MM + "/" + dd + "/" + yyyy;
        }
        else {
            alert("[ERR]GetDateFromDateTime: Chưa có kiểu TypeOut này");
        }
    }
    else if (TypeIn == 2) {
        var MM = A1;
        var dd = A2;
        var yyyy = A3;

        if (TypeOut == 1) {
            strTime = dd + "/" + MM + "/" + yyyy;
        }
        else if (TypeOut == 2) {
            strTime = MM + "/" + dd + "/" + yyyy;
        }
        else {
            alert("[ERR]GetDateFromDateTime: Chưa có kiểu TypeOut này");
        }
    }
    else {
        alert("[ERR]GetDateFromDateTime: Chưa có kiểu TypeIn này");
    }
        return strTime;
}

function FormatDateTime2(dt) {

    // Input DateTime :  MM/dd/yyyy hh:ss
    // Output :          dd/MM/yyyy hh:ss

    dt = new Date(dt);
    var yy = dt.getFullYear();
    var mm = (dt.getMonth() + 1);
    var dd = dt.getDate();
    var hr = dt.getHours();
    var mi = dt.getMinutes();
    var ss = dt.getSeconds();
    // Curent DateTime


    var strTime = "";
    //parseInt

    strTime = dd + "/" + mm + "/" + yy + " " + hr + ":" + mi;
    return strTime;
}
function isNullOfEmpty(inputString) {
    if ((typeof (inputString) == "undefined") || (inputString == "") || (inputString == null)) {
        return true;
    }
    return false;
}
//##############################################################################
//##############################################################################
function GetAvatarPath(id, w, h) {
    return 'http://farm01.go.vn/avatar/store/account/' + Math.floor(id / 1000000, 0) + '/' + Math.floor(id / 1000, 0) + '/' + id + '/' + id + '.png.' + w + '.' + h + '.cache'
}
//##############################################################################
//##############################################################################

function changeTab(_currentTabId, _counter, _tabName, _unselectStyle, _selectStyle) {
    if (typeof (_currentTabId) == "undefined") var _currentTabId = "#tab_1_1";
    if (typeof (_counter) == "undefined") var _counter = 5;
    if (typeof (_unselectStyle) == "undefined") var _unselectStyle = "unselect";
    if (typeof (_selectStyle) == "undefined") var _selectStyle = "select";
    if (typeof (_tabName) == "undefined") var _tabName = '#tab_1_';

    for (var _index = 1; _index <= _counter; _index++) {
        $(_tabName + _index).removeClass(_selectStyle);
        $(_tabName + _index).addClass(_unselectStyle);
    }

    $(_currentTabId).removeClass(_unselectStyle);
    $(_currentTabId).addClass(_selectStyle);
}

function GetClientParameter1(_position) {
    if (typeof (_position) == "undefined")
        var _position = 0;
    var _url = location.href;
    var _parameter = '';
    if (_url.indexOf('#') >= 0) {
        _parameter = _url.substring(_url.indexOf('#') + 1, _url.length);
        switch (_position) {
            case 0:
                if (_parameter.indexOf('?') > 0)
                    _parameter = _parameter.substring(0, _parameter.indexOf('?'));
                if (_parameter.indexOf('&') > 0)
                    _parameter = _parameter.substring(0, _parameter.indexOf('&'));
                break;
            case 1:
                if (_parameter.indexOf('?') >= 0)
                    _parameter = '&' + _parameter.substring(_parameter.indexOf('?') + 1, _parameter.length);
                else _parameter = '';
                break;
        }
    }
    return _parameter;
}
function GetClientParameter(url ,name, isDecode) {
    name = name.replace("/[\[]/", "\\\[").replace("/[\]]/", "\\\]");
    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(url);
    if (results == null) return "";
    else {
        if (isDecode == true) {
            return decodeURIComponent(results[1]);
        }
        else (isDecode == false) 
            return results[1];
   
    }
    
}

function ResizeAlbumThumbnail(me, i, _categoryId) {
    var _maxWidth = 150;
    var _maxHeight = 125;
    var _iconHeight = 8;
    var _iconMarginLeft = -2;
    var _totalImageMargin = 10;
    var _marginLeft = 0;
    BrowserDetect.init();
    if ($(me).width() >= $(me).height()) {
        $(me).width(_maxHeight);
        $(me).parent().parent().parent().css({ "margin-top": Math.round(Math.abs(_maxHeight - $(me).height()) / 2) });
        _marginLeft = Math.round(Math.abs(_maxWidth - $(me).width() - _totalImageMargin) / 2);
        if (BrowserDetect.browser == 'Explorer' && BrowserDetect.version <= 7)
            $(me).parent().parent().css({ "margin-left": Math.round(_marginLeft / 2), "-ms-interpolation-mode": "nearest-neighbor" });
        else
            $(me).parent().parent().css({ "margin-left": _marginLeft, "-ms-interpolation-mode": "bicubic" });
    }
    else {
        $(me).height(_maxHeight);
        _marginLeft = Math.round(Math.abs(_maxWidth - $(me).width() - _totalImageMargin) / 2);
        if (BrowserDetect.browser == 'Explorer' && BrowserDetect.version <= 7)
            $(me).parent().parent().css({ "margin-left": Math.round(_marginLeft / 2) + 1, "-ms-interpolation-mode": "nearest-neighbor" });
        else
            $(me).parent().parent().css({ "margin-left": _marginLeft, "-ms-interpolation-mode": "bicubic" });
    }

    if (BrowserDetect.browser == 'Explorer' && BrowserDetect.version <= 7)
        $(me).css({ "-ms-interpolation-mode": "nearest-neighbor" });
    else
        $(me).css({ "-ms-interpolation-mode": "bicubic" });

    if (BrowserDetect.browser == 'Explorer' && BrowserDetect.version <= 7)
        $("#symbol_" + i).parent().parent().width($("#symbol_" + i).parent().parent().width() - 3);
    $("#symbol_" + i).css({ "margin-left": _marginLeft + _iconMarginLeft });
    $("#symbol_" + i).width($("#symbol_" + i).width() - (_marginLeft + _iconMarginLeft));
    $("#symbol_" + i).height(Math.round($(me).height() / _iconHeight) * _iconHeight);

    if (_categoryId == 67) {
        $(me).css({ "border": "solid 1px #dd0067" });
        $("#symbol_" + i).css({ "background": "url('http://photos.goonline.vn/Skins/Default/Images/bg_album_missteen.png') repeat-y" });
    }
    else {
        $(me).css({ "border": "solid 1px #b9b9b9" });
        $("#symbol_" + i).css({ "background": "url('http://photos.goonline.vn/Skins/Default/Images/bg_album.png') repeat-y" });
    }
}
function ResizeImageThumbnail(me) {
    var _maxWidth = 140;
    var _maxHeight = 125;
    var _marginLeft = 0;
    BrowserDetect.init();
    if ($(me).width() >= $(me).height()) {
        $(me).width(_maxHeight);
        _marginLeft = Math.round(Math.abs(_maxWidth - _maxHeight) / 4);
        $(me).css({ "margin-top": Math.round(Math.abs(_maxHeight - $(me).height()) / 2) });
        if (BrowserDetect.browser == 'Explorer' && BrowserDetect.version <= 7)
            $(me).css({ "margin-left": _marginLeft, "-ms-interpolation-mode": "nearest-neighbor" });
        else
            $(me).css({ "margin-left": _marginLeft, "-ms-interpolation-mode": "bicubic" });
    }
    else {
        $(me).height(_maxHeight);
        if (BrowserDetect.browser == 'Explorer' && BrowserDetect.version <= 7)
            $(me).css({ "margin-left": _marginLeft, "-ms-interpolation-mode": "nearest-neighbor" });
        else
            $(me).css({ "margin-left": _marginLeft, "-ms-interpolation-mode": "bicubic" });
    }
}


/*============================ Gen cac loai link  =========================== */
function signin() {
    var Url = "/Action/MusicAction.ashx?Object=member&action=login";
    SendRequestAjaxPost(Url, '',
    function (data, dataStatus) {

        document.location = data.rec;
    });
}

function GenLinkAlbumDetail(id) {
    return '/AlbumDetail.aspx?id=' + id;
}

function GenLinkSongDetail(id) {
    return '/SongDetail.aspx?id=' + id;
}

function GenLinkArtistDetail(id) {
    return '#';
}
function GenLinkUpload(id) {
    return '/Upload.aspx';
}
function GenLinkDownload(id) {
    return '/Download.aspx?id=' + id;
}

function GenLinkCreateAlbum(id) {
    return '/MyAlbumUpdate.aspx';
}

function GenLinkRadioDetail(id) {
    return '/RadioDetail.aspx?id=' + id;
}

function GenLinkMemberAvatar(id) {
    return myGo_GetAvatarPath(id, 50, 50);
}

function GenLinkMemberLink(id) {
    return 'http://my.go.vn/?id={0}'.format(id);
}

function myGo_GetAvatarPath(id, w, h) {
    return 'http://farm01.go.vn/avatar/store/account/' + Math.floor(id / 1000000, 0) + '/' + Math.floor(id / 1000, 0) + '/' + id + '/' + id + '.png.' + w + '.' + h + '.cache'
}

function GenLinkSearch(type, filter, key) {
    return '/Search.aspx?type={0}&filter={1}&key={2}'.format(type, filter, encodeURIComponent(key));
}

function GenLinkObject(id, type) {
    switch (type) {
        case 1:
            return GenLinkSongDetail(id);
            break;
        case 2:
            return GenLinkAlbumDetail(id);
            break;
        case 3:
            return GenLinkArtistDetail(id);
            break;
        case 4:
            return GenLinkRadioDetail(id);
            break;
        default:
            return "/Default.aspx";

    }

}


/*============================ End SongFavourite =========================== */

var AlbumImagePath = "http://music.go.vn/photo/images";
var MediaUrl = "http://media.gox.vn/music/";
var IMAGES_ROOT_VIEW = "http://localhost:2468/Uploads";
var PhotoServicePath = "http://music.go.vn/photo/images";


function GenUploadImagePath(url, isGetFromImageService) {
    if ((typeof (isGetFromImageService) == undefined) || (isGetFromImageService == false)) {
        var path = "";
        path = IMAGES_ROOT_VIEW + url;

        return path;

    }
    else if (isGetFromImageService == true) {
        var path = "";

        path = PhotoServicePath + url;
        return path;
    }
}

function GenAlbumImagePath(url, width, height) {
    if (url == "") {
        if (width == null || height == null || width == 0 || height == 0) {
            url = "/noimage.jpg";
        }
        else {
            url = "/SongDefault.jpg";
        }
    }
    var path = "";
    path = PhotoServicePath + url + "." + width + "." + height + ".cache";
    return path;
}

function CutStringTag(stringTag) {
    var shtml = "";
    if (stringTag.length > 0) {
        var myString = stringTag.split(",");
        for (i = 0; i < myString.length; i++) {
            shtml += '<a href="{0}">{1},</a>'.format(GenLinkSearch("all", 0, myString[i]), myString[i]);
        }
        return shtml;
    }
    else {
        return "";
    }
}
function changeTab(_currentTabId, _counter, _tabName, _unselectStyle, _selectStyle) {
    if (typeof (_currentTabId) == "undefined") var _currentTabId = "#tab_1_1";
    if (typeof (_counter) == "undefined") var _counter = 5;
    if (typeof (_unselectStyle) == "undefined") var _unselectStyle = "unselect";
    if (typeof (_selectStyle) == "undefined") var _selectStyle = "select";
    if (typeof (_tabName) == "undefined") var _tabName = '#tab_1_';

    for (var _index = 1; _index <= _counter; _index++) {
        $(_tabName + _index).removeClass(_selectStyle);
        $(_tabName + _index).addClass(_unselectStyle);
    }

    $(_currentTabId).removeClass(_unselectStyle);
    $(_currentTabId).addClass(_selectStyle);
}

function WriteClientParameter(_name, _value) {
    if (typeof (_name) != "undefined") {
        var _parameter = GetClientParameter1(0);
        if (_parameter.indexOf(_name) < 0)
            _parameter = _parameter.concat('/').concat(_name).concat('0');
        _parameter = location.href.substring(0, location.href.indexOf("#")).concat('#').concat(_parameter.replace(_name + GetClientParameterValue(_name, _parameter), _name + _value))
        document.location = _parameter;
    }
}

function GetClientParameterValue(_name, _parameter) {
    var _value = '0';
    if (typeof (_name) != "undefined") {
        if (typeof (_parameter) == "undefined")
            var _parameter = GetClientParameter1(0);

        var _parameterArray = _parameter.split('/');
        for (var _index = 0; _index < _parameterArray.length; _index++) {
            if (_parameterArray[_index].indexOf(_name) >= 0) {
                _value = _parameterArray[_index].replace(_name, '');
                break;
            }
        }
    }
    return _value;
}

function ShowToolTip(Sender, ObjectID, ObjectText, AddLeft) {
    SetSizeToolTip(Sender, ObjectID, AddLeft);
    $(ObjectID).css({ 'width': 380 + 'px', 'height': '160px' });
    var Html = "<div class=\"upload_tooltip\">" +
                "<div class=\"upload_tooltip_icon\">" +
                    "<img style=\"margin-top:5px;\" src=\"/Skins/Black/Images/Icon/corner.png\" />" +
                "</div>" +
                "<div class=\"upload_tooltip_text\">" + ObjectText + "</div>" +
                "<div class=\"clear\">" + "</div>" +
               "</div>";
    $(ObjectID).html(Html);
}

function HideToolTip(ObjectID) {
    $(ObjectID).css({ 'display': 'none' });
}

function SetSizeToolTip(Sender, ObjectID, AddLeft) {
    if (Sender) {
        var x = 0, y = 0;
        var w = 0, h = 0;
        w = Sender.offsetWidth;
        h = Sender.offsetHeight;
        while (Sender.offsetParent) {
            x += Sender.offsetLeft;
            y += Sender.offsetTop;
            Sender = Sender.offsetParent;
        }
        var display = $(ObjectID).css('display');
        if ($(ObjectID).length > 0) {
            if (display == 'none') {
                $(ObjectID).css({ 'left': x + AddLeft + 'px', 'top': y - 5 + 'px', 'display': 'block' });
            }
            else {
                $(ObjectID).css({ 'display': 'none' });
            }
        }
    }
    return false;
}
var _titleShare = "goMusic - Mạng Việt Nam Go.vn";
function ShareOnFacebook() {
    newWindow("http://www.facebook.com/share.php?u=" + location.href + "&t=" + _titleShare, "");
}

function ShareOnTweeter() {
    newWindow("http://twitter.com/?status=" + _titleShare + " - " + location.href, "");
}

function ShareOnGoogle() {
    newWindow("https://www.google.com/bookmarks/mark?op=edit&bkmk={0}&title={1}&annotation={1}&labels={1}".format(location.href, _titleShare), "");
}
function ShareGo() {
    window.open("http://my.go.vn/share.aspx?url=" + encodeURIComponent(location.href));
}

function SubString(str, n) {
    if (n <= 0)
        return "";
    else if (n > String(str).length)
        return str;
    else {
        var iLen = String(str).length;
        str = str.substring(0, n) + "...";
        return str;

    }
}