/// <reference path="../../Templates/Ins_Albums.htm" />
/// <reference path="../../Templates/Ins_ExtendProperties.htm" />
/// <reference path="../../Templates/Ins_Configs.htm" />
/// <reference path="../../Templates/Ins_Languages.htm" />
function Init_Dialog_Ins() {
    setTimeout('$("#tabs").tabs();', 1000);
}


function Init_Dialog_Upd() {
    setTimeout('$("#tabs").tabs();', 1000);
}

/*############################################################################*/
/*   FORM FORM FORM FORM FORM FORM FORM FORM FORM FORM FORM FORM FORM FORM    */
/*____________________________________________________________________________*/
// Code: BUI MINH NGOC
// Date: 30/04/2013
// Template:
/*____________________________________________________________________________*/
// Info: Mo form insert 
/*############################################################################*/

function OpenDialog_Ins_Permits() {
    var title = "";
    var width = 810;
    var height = 500;
    if ($("#PositionShowDialog").length <= 0) {
        $("body").append('<div id="#PositionShowDialog" style="display:none; overflow-x:hidden; overflow-y:scroll;" title="' + title + '"></div>');
    }
    $("#PositionShowDialog").setTemplateURL('../../Templates/Ins_Permits.htm');
    $("#PositionShowDialog").setParam('NumLang', sys_NumLang); //sys_NumLang : trong file SystemConfig.js
    $("#PositionShowDialog").setParam('Lang', sys_Lang);
    $("#PositionShowDialog").processTemplate();
    
    $("#PositionShowDialog").dialog({
        modal: true,
        width: width,
        height: height,
        resizable: false,
        //open: setTimeout('Change_TextareaToTinyMCE_OnPopup("#txt_InfoAlbumLang1");Change_TextareaToTinyMCE_OnPopup("#txt_InfoAlbumLang2");Change_TextareaToTinyMCE_OnPopup("#txt_InfoAlbumLang3");', 2000), // Cần phải có settimeout,
        
        show: {
            effect: "clip",
            duration: 1000
        },
        hide: {
            effect: "explode",
            duration: 1000
        },

        buttons: {
            'Cancel': function () {
                $(this).dialog("close");

            },

            'Save': function () {
                //tinymce.get('txt_InfoLang1').save();
                Ins_Permits();
				
                $(this).dialog("close");
            }
        },
        close: function () {
            //$(this).dialog("close");
        }
    });
}

/*############################################################################*/
/*  PROCESSING PROCESSING PROCESSING PROCESSING PROCESSING PROCESSING         */
/*____________________________________________________________________________*/
// Code: BUI MINH NGOC
// Date: 30/04/2013
// Template:
/*____________________________________________________________________________*/
// Info: Xu ly insert 
/*############################################################################*/
function Ins_Permits() {
  //  ShowLoading("#frmIns_Permits");
    $.ajax({
        url: "/Action/ProcessBackendAction.ashx?ActionObject=Permits&action=Ins",
        type: "POST",
        dataType: "json",
        data: $("#frmIns_Permits").serialize(),

        success: function (data) {
           if (data.status == "success")  {
			   $(".flexgripPermits").flexReload();
                showMessageBox("Thêm Permits thành công.");

            }
            else if (data.status != "success") {
                showMessageBox("Thêm Permits lỗi: <font style='font-size:9px'>" + data.message + "</font>");

            }
        },
        error: function (ex) {
        }
    });
}
/*############################################################################*/
/*   FORM FORM FORM FORM FORM FORM FORM FORM FORM FORM FORM FORM FORM FORM    */
/*____________________________________________________________________________*/
// Code: BUI MINH NGOC
// Date: 30/04/2013
// Template:
/*____________________________________________________________________________*/
// Info: Mo form insert 
/*############################################################################*/

function OpenDialog_Upd_Permits(IDPermits) {
    var title = "";
    var width = 810;
    var height = 500;
    if ($("#PositionShowDialog").length <= 0) {
        $("body").append('<div id="PositionShowDialog" style="display:none; overflow-x:hidden; overflow-y:scroll;" title="' + title + '"></div>');
    }
    Fill_Permits_Dialog_Upd(IDPermits);
    $("#PositionShowDialog").dialog({
        modal: true,
        width: width,
        //open: setTimeout('Change_TextareaToTinyMCE_OnPopup("#txt_InfoAlbumLang1")', 2000), // Cần phải có settimeout,
        
        height: height,
        resizable: false,
        show: {
            effect: "clip",
            duration: 1000
        },
        hide: {
            effect: "explode",
            duration: 1000
        },

        buttons: {
            'Đóng': function () {
                $(this).dialog('close');
            },
            'Sửa': function () {
	        //tinymce.get('txt_InfoLang1').save();
                Upd_Permits(IDPermits);
                
                $(this).dialog('close');
            }
        },
        close: function () {

        }
    });
}

/*======================================================================================*/
/*======================================================================================*/
function Fill_Permits_Dialog_Upd(IDPermits) {
    if (IDPermits > 0) {
        jQuery.ajax({
            url: "/Action/ProcessBackendAction.ashx?ActionObject=Permits&action=Sel&IDPermits=" + IDPermits,
            type: "POST",
            dataType: "json",
            data: "",
            success: function (data, dataStatus) {
                $("#PositionShowDialog").setTemplateURL('../../Templates/Upd_Permits.htm');
                $("#PositionShowDialog").setParam('NumLang', sys_NumLang); //sys_NumLang : trong file SystemConfig.js
                $("#PositionShowDialog").setParam('Lang', sys_Lang);
                $("#PositionShowDialog").processTemplate(data);
                callback(data)
            },
            timeout: 30000,
            error: function (request, error)
            {
            }
        });
    }
}
/*======================================================================================*/
/*======================================================================================*/
function Upd_Permits(IDPermits) {
    $.ajax({
        url: "/Action/ProcessBackendAction.ashx?ActionObject=Permits&action=Upd&IDPermits=" + IDPermits,
        type: "POST",
        dataType: "json",
        data: $("#frmUpd_Permits").serialize(),
        success: function (data) {
           if (data.status == "success") {
                $(".flexgripPermits").flexReload();
				showMessageBox("Update Permits thành công.");

            }
            else if (data.status != "success") {
                showMessageBox("Update Permits lỗi: <font style='font-size:9px'>" + data.message + "</font>");

            }
        },
        error: function (ex) {
        }
    });
}
/*======================================================================================*/
/*======================================================================================*/

/*======================================================================================*/
/*======================================================================================*/

function Del_Permits(IDPermits) {

    $.ajax({
        url: "/Action/ProcessBackendAction.ashx?ActionObject=Permits&action=Del&IDPermits=" + IDPermits,
        type: "POST",
        dataType: "json",
        data: $("#frmUpd_Permits").serialize(),
        success: function (data) {
           if (data.status == "success") {
                $(".flexgripPermits").flexReload();
				showMessageBox("Delete thành công.");

            }
            else if (data.status != "success") {
                showMessageBox("Delete lỗi: <font style='font-size:9px'>" + data.message + "</font>");

            }
        },
        error: function (ex) {
        }
    });
}

