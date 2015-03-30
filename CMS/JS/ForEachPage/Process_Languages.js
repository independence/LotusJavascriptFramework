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

function OpenDialog_Ins_Languages() {
    var title = "";
    var width = 610;
    var height = 300;
    if ($("#PositionShowDialog").length <= 0) {
        $("body").append('<div id="#PositionShowDialog" style="display:none; overflow-x:hidden; overflow-y:scroll;" title="' + title + '"></div>');
    }

    $("#PositionShowDialog").setTemplateURL('../../Templates/Ins_Languages.htm');
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
                Ins_Languages();
				
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
function Ins_Languages() {
  //  ShowLoading("#frmIns_Languages");
    $.ajax({
        url: "/Action/ProcessBackendAction.ashx?ActionObject=Languages&action=Ins",
        type: "POST",
        dataType: "json",
        data: $("#frmIns_Languages").serialize(),

        success: function (data) {
           if (data.status == "success")  {
			   $(".flexgripLanguages").flexReload();
                showMessageBox("Thêm Languages thành công.");

            }
            else if (data.status != "success") {
                showMessageBox("Thêm Languages lỗi: <font style='font-size:9px'>" + data.message + "</font>");

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
          
function OpenDialog_Upd_Languages(IDLanguages) {
    var title = "";
    var width = 810;
    var height = 500;
    if ($("#PositionShowDialog").length <= 0) {
        $("body").append('<div id="PositionShowDialog" style="display:none; overflow-x:hidden; overflow-y:scroll;" title="' + title + '"></div>');
    }

    Fill_Languages_Dialog_Upd(IDLanguages);

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
                Upd_Languages(IDLanguages);
                
                $(this).dialog('close');
            }
        },
        close: function () {

        }
    });
}

/*======================================================================================*/
/*======================================================================================*/
function Fill_Languages_Dialog_Upd(IDLanguages) {

    if (IDLanguages > 0) {
        jQuery.ajax({
            url: "/Action/ProcessBackendAction.ashx?ActionObject=Languages&action=Sel&IDLanguages=" + IDLanguages,
            type: "POST",
            dataType: "json",
            data: "",
            success: function (data, dataStatus) {

                $("#PositionShowDialog").setTemplateURL('../../Templates/Upd_Languages.htm');
                $("#PositionShowDialog").setParam('NumLang', sys_NumLang); //sys_NumLang : trong file SystemConfig.js
                $("#PositionShowDialog").setParam('Lang', sys_Lang);
                $("#PositionShowDialog").processTemplate(data);
            },
            timeout: 30000,
            error: function (request, error) {
            }
        });
    }
}
/*======================================================================================*/
/*======================================================================================*/
function Upd_Languages(IDLanguages) {
    $.ajax({
        url: "/Action/ProcessBackendAction.ashx?ActionObject=Languages&action=Upd&IDLanguages=" + IDLanguages,
        type: "POST",
        dataType: "json",
        data: $("#frmUpd_Languages").serialize(),
        success: function (data) {
           if (data.status == "success") {
                $(".flexgripLanguages").flexReload();
				showMessageBox("Update Languages thành công.");

            }
            else if (data.status != "success") {
                showMessageBox("Update Languages lỗi: <font style='font-size:9px'>" + data.message + "</font>");

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

function Del_Languages(IDLanguages) {

    $.ajax({
        url: "/Action/ProcessBackendAction.ashx?ActionObject=Languages&action=Del&IDLanguages=" + IDLanguages,
        type: "POST",
        dataType: "json",
        data: $("#frmUpd_Languages").serialize(),
        success: function (data) {
           if (data.status == "success") {
                $(".flexgripLanguages").flexReload();
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

