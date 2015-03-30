//########################################################
// Hiện cửa sổ Loading khi gọi Ajax
//########################################################
function ShowLoading(div_id) {
    if (typeof (div_id) == "undefined") div_id = '#loading';
    if ($(div_id).length <= 0)
        $("body").append("<div id=\"" + div_id.replace("#", "") + "\"></div>");
    $(div_id).html("<img src=\"/Skins/Black/images/icon/loading.gif\" alt=\"loading...\" />&nbsp;&nbsp;Đang tải...");
    $(div_id).fadeIn("slow");
}
//########################################################
// Ẩn cửa sổ Loading khi gọi Ajax xong
//########################################################
function LoadCompleted(div_id) {
    if (typeof (div_id) == "undefined") div_id = '#loading'; jQuery(div_id).fadeOut("slow");
}
//########################################################
// Hiện cửa sổ Loading khi gọi Ajax , Loading này bao trùm
// toàn bộ trang web
//########################################################
function ShowLoadingOver(objContainer) {
    var offset = $(objContainer).offset();
    var w = $(objContainer).width();
    var h = $(objContainer).height();
    if ($("#LoadingOver").length <= 0) $("body").append("<div id=\"LoadingOver\"></div>");
    $("#LoadingOver").css({ "top": offset.top + "px", "left": offset.left + "px", "width": w + "px", "height": h + "px", "z-index": "2000", "background-color": "#000", "opacity": "0", "position": "absolute", "display": "none", "background-image": "url(/Skins/Black/images/icon/loading.gif)", "background-position": "center center", "background-repeat": "no-repeat" });
    $("#LoadingOver").fadeIn('0');
}
//########################################################
// Ẩn cửa sổ Loading khi gọi Ajax , Loading này bao trùm
// toàn bộ trang web, nếu dùng hàm ShowLoadingOver thì khi
// ẩn loading đi bằng hàm này
//########################################################
function HideLoadingOver() {
    $("#LoadingOver").fadeOut('0');
}
//########################################################
//########################################################
function NewWindow(file, window, resizable, w, h) {
    msgWindow = open(file, window, 'resizable=' + (resizable ? 'yes' : 'no') + ',width=' + w + ',height=' + h + ',titlebar=no,toolbar=no,scrollbars=yes');
    if (msgWindow.opener == null) msgWindow.opener = self;
}
//########################################################
// Hiện thông điệp
//########################################################
function ShowMessageBox(msg, title, width) {
    if (typeof (title) == "undefined") var title = "Thông báo";
    if ($("#GoMessageBox").length <= 0) {
        $("body").append('<div id="GoMessageBox" style="display:none;" title="' + title + '"><br /><span style="float:left; margin-right:10px;"><img src="/Skins/Images/popup_logo.jpg" alt="logo" width=\'66\' /></span><div class="popup_message"></div></div>');
    }
    var goMessageTimer;
    $("#GoMessageBox>div").html(msg);
    $("#GoMessageBox").dialog({
        modal: true,
        resizable: false,
        zIndex: 9999,
        buttons: {
            'Đồng ý': function () {
                $(this).dialog('close');
            }
        },
        hide: "fade",
        open: function () {
            goMessageTimer = setTimeout(function () { $('#GoMessageBox').dialog('close'); }, 10000);
        },
        close: function () {
            clearTimeout(goMessageTimer);
            $(this).dialog("destroy");
        }
    });
    $("#GoMessageBox").dialog('open');
    return false;
}
//########################################################
// Hiện cửa sổ xác thực
//########################################################
function ShowConfirmBox(msg, callBack, close, title) {
    if (typeof (close) == "undefined") var close = true;
    if (typeof (title) == "undefined") var title = "Xác nhận";

    if ($("#GoMessageBox").length <= 0) {
        $("body").append('<div id="GoMessageBox" style="display:none;" title="' + title + '"><br /><span style="float:left; margin-right:10px;"><img src="/Skins/images/popup_logo.jpg" alt="logo" width=\'66\' /></span><div class="popup_message"></div></div>');
    }
    else
        $("#GoMessageBox").removeAttr("title").attr("title", title);
    $("#GoMessageBox>div").html(msg);
    $("#GoMessageBox").dialog({
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
    $("#GoMessageBox").dialog('open');
    $('.ui-dialog-buttonset span:first-child').addClass('gray');
}
//########################################################
// Hiện cửa sổ thông báo
//########################################################
function WaitingBox(msg, title, btntitle) {
    if (typeof (title) == "undefined") var title = "Thông báo";
    if ($("#GoMessageBox").length <= 0) {
        $("body").append('<div id="GoMessageBox" style="display:none;" title="' + title + '"><br /><span style="float:left; margin-right:10px;"><img src="/images/popup_logo.jpg" alt="logo" width=\'66\' /></span><div class="popup_message"></div></div>');
    }
    else
        $("#GoMessageBox").removeAttr("title").attr("title", "Xác nhận");
    $("#GoMessageBox>div").html(msg + '<br /><br /><center><img src="/Skins/Black/Images/ajax-loader.gif" /></center>');
    $("#GoMessageBox").dialog({
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
    $("#GoMessageBox").dialog('open');
}
//########################################################
// 
//########################################################
function PopupBox(objContainer, width, height, title, BeforeCallBack) {
    if (typeof (title) == "undefined") var title = "";
    if (typeof (width) == "undefined") var width = 500;
    if (typeof (height) == "undefined") var height = 300;
    if (typeof (objContainer) == "undefined") var objContainer = "#GoMessageBox";
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
    $(objContainer).dialog('open');
    $('.ui-dialog-buttonset span:first-child').addClass('gray');
    if (typeof BeforeCallBack != "undefined") BeforeCallBack();
}
//########################################################
// 
//########################################################
function PopupForm(objContainer, width, height, title, BeforeCallBack, CallBack) {
    if (typeof (title) == "undefined") var title = "";
    if (typeof (width) == "undefined") var width = 500;
    if (typeof (height) == "undefined") var height = 300;
    if (typeof (objContainer) == "undefined") var objContainer = "#GoMessageBox";
    if ($(objContainer).length <= 0) {
        $("body").append('<div id="' + objContainer.replace('#', '') + '" style="display:none; overflow-x:hidden; overflow-y:scroll;" title="' + title + '"></div>');
    }
    $(objContainer).dialog({
        modal: true,
        width: width,
        title: title,
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
    $(objContainer).dialog('open');
    $('.ui-dialog-buttonset span:first-child').addClass('gray');
    if (typeof BeforeCallBack != "undefined") BeforeCallBack();
}
