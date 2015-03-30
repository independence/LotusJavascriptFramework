function ConvertToUrlRewriteFriendly(str) {
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    /* tìm và thay thế các kí tự đặc biệt trong chuỗi sang kí tự - */
    str = str.replace(/!|@|%20|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'| |\"|\&|\#|\[|\]|~|$|_/g, "-");
    str = str.replace(/%/g, "-");
    while (str.indexOf("--") >= 0) {
        str = str.replace(/-+-/g, "-"); //thay thế 2- thành 1- 
    }
    str = str.replace(/^\-+|\-+$/g, "");
    //cắt bỏ ký tự - ở đầu và cuối chuỗi  
    return str;
}
/*============================ Gen cac loai link  =========================== */
function isNullOfEmpty(inputString) {
    if ((typeof (inputString) == "undefined") || (inputString == "") || (inputString == null)) {
        return true;
    }
    return false;
}
function signin() {
    var url = location.href;
    document.location = 'http://go.vn/accounts/sso/login/?sid=660008&ur=' + url + '&m=1&continue=http://music.go.vn/CheckLogin.aspx';
}

function GenLinkAlbumDetail(id, title) {
    if (title == null || title == "")
        title = "goMusic-" + title;
    return '/AlbumDetail/{0}/{1}/'.format(ConvertToUrlRewriteFriendly(title), id);
}

function GenLinkSongDetail(id, title) {
    if (title == null || title=="")
        title = "goMusic-" + title;
    return '/SongDetail/{0}/{1}/'.format(ConvertToUrlRewriteFriendly(title), id);
}

function GenLinkArtistDetail(id) {
    return '#';
}
function GenLinkArtist() {
    return '/Artist.aspx';
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
function GenLinkRankDetail(id) {
    return '/RankDetail.aspx?id=' + id;
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
            return GenLinkSongDetail(id, "goMusic");
            break;
        case 2:
            return GenLinkAlbumDetail(id, "goMusic");
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

/*============================ SongFavourite =========================== */

function SongFavouriteFeedBack(dataId, songId) {
    var _opener = "#linkSong" + songId;
    if (dataId == 0) {
        showMessageBox("Bạn cần <a href=\"http://go.vn/accounts/account.register.aspx\" class=\"reg\">đăng ký</a> hoặc <a href=\"javascript:void(0)\" onclick=\"signin()\" class=\"reg\">đăng nhập</a> để thực hiện chức năng này.");
    }
    else {
        if (songId > 0) {
            var Url = "/Action/MusicAction.ashx?Object=song&action=addfavou&Id={0}".format(songId);
            SendRequestAjax(Url, '',
                function (data, dataStatus) {
                    if (data.Message == "success") {
                        showMessageBox("Đã đưa vào danh sách bài hát yêu thích");
                        $(_opener).removeClass('fav');
                        $(_opener).addClass('faved');
                    }
                    else {
                        showMessageBox(data.Message);
                    }
                });
        }
    }
}

function SongFavourite(dataId, songId) {

    if (dataId == 0) {
        showMessageBox("Bạn cần <a href=\"http://go.vn/accounts/account.register.aspx\" class=\"reg\">đăng ký</a> hoặc <a href=\"javascript:void(0)\" onclick=\"signin()\" class=\"reg\">đăng nhập</a> để thực hiện chức năng này.");
    }
    else {
        if (songId > 0) {
            var Url = "/Action/MusicAction.ashx?Object=song&action=addfavou&Id={0}".format(songId);
            SendRequestAjax(Url, '',
                function (data, dataStatus) {
                    if (data.Message == "success") {
                        showMessageBox("Đã đưa vào danh sách bài hát yêu thích");
                    }
                    else {
                        showMessageBox(data.Message);
                    }
                });
        }
    }
}
function SongWarning(dataId, songId) {
    if (dataId <= 0) {
        showMessageBox("Bạn cần <a href=\"http://go.vn/accounts/account.register.aspx\" class=\"reg\">đăng ký</a> hoặc <a href=\"javascript:void(0)\" onclick=\"signin()\" class=\"reg\">đăng nhập</a> để thực hiện chức năng này.");
    }
    else {
        var sHTML = '';
        sHTML = "<form name=\"frmWarning\" id=\"frmWarning\" method=\"post\" onsubmit=\"return false\">";
        sHTML += "<span class=\"norB\" style=\"padding-left:15px; padding-right:5px; margin:0;\">Nhập mã bảo mật:</span><br /><br />";
        sHTML += "<span style=\"padding-left:10px; padding-right:5px; margin:0;\"><img src=\"/CaptchaImg.aspx?ss=" + Math.random().toString() + "\" id=\"CapchaImg\" alt=\"captcha\" /><input type=\"text\" name=\"scode\" id=\"scode\" size=\"10\" /></span>";
        sHTML += "<input type=\"hidden\" name=\"id\" value=\"" + songId + "\" /><br /><br />";
        sHTML += "<span style=\"color:#ff0000;\" id=\"errMesg\"></span><br />";
        sHTML += "</form>";
        showConfirmBox(sHTML, function () {
            var btn = this;
            if (Trim($("#scode").val()) == "") {
                $("#errMesg").html("Bạn phải nhập mã bảo mật trước khi báo xấu");
                $("#scode").focus();
                return false;
            } else {
                SendRequestAjaxPost("/Action/MusicAction.ashx?Object=warning&action=songwarning",
                    $("#frmWarning").serialize(),
                        function (data) {
                            if (data.Message == "success") {
                                $("#GoMessageBox").dialog('close');
                                showMessageBox("Bạn đã báo xấu thành công.");
                            }
                            else {
                                $("#errMesg").html(data.Message);
                                $("#CapchaImg").attr("src", "/CaptchaImg.aspx?ss=" + Math.random().toString());
                                $("#scode").focus();
                                $("#scode").val('');
                                return;
                            }
                        });
            }
        }, false);
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
function GenWidgetImagePath(url, width, height) {
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
        var myString = stringTag.split(";");
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

function GetClientParameter(_position) {
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

function WriteClientParameter(_name, _value) {
    if (typeof (_name) != "undefined") {
        var _parameter = GetClientParameter(0);
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
            var _parameter = GetClientParameter(0);

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

function CutStringTag(passTag) {
    var shtml = "";
    var stringTag = passTag.replace(',', ';');
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
function RemoveDagerousChar(str) {
    str = str.replace("<", "&lt;");
    str = str.replace(">", "&gt;");
    str = str.replace('"', '&quot;');
    return str;
}
