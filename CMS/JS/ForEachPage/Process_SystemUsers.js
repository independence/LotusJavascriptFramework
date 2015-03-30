

//================================================================================

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

function OpenDialog_Ins_SystemUsers() {
    var title = "";
    var width = 810;
    var height = 500;
    if ($("#PositionShowDialog").length <= 0) {
        $("body").append('<div id="#PositionShowDialog" style="display:none; overflow-x:hidden; overflow-y:scroll;" title="' + title + '"></div>');
    }
    $("#PositionShowDialog").setTemplateURL('../../Templates/Ins_SystemUsers.htm');
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
                Ins_SystemUsers();
				
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
function Ins_SystemUsers() {
  //  ShowLoading("#frmIns_SystemUsers");
    $.ajax({
        url: "/Action/ProcessBackendAction.ashx?ActionObject=SystemUsers&action=Ins",
        type: "POST",
        dataType: "json",
        data: $("#frmIns_SystemUsers").serialize(),

        success: function (data) {
           if (data.status == "success")  {
			   $(".flexgripSystemUsers").flexReload();
			   showMessageBox("Thêm SystemUsers thành công.");
            }
            else if (data.status != "success") {
                showMessageBox("Thêm SystemUsers lỗi: <font style='font-size:9px'>" + data.message + "</font>");
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

function OpenDialog_Upd_SystemUsers(IDSystemUsers) {
    var title = "";
    var width = 810;
    var height = 500;
    if ($("#PositionShowDialog").length <= 0) {
        $("body").append('<div id="PositionShowDialog" style="display:none; overflow-x:hidden; overflow-y:scroll;" title="' + title + '"></div>');
    }

    Fill_SystemUsers_Dialog_Upd(IDSystemUsers);

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
                Upd_SystemUsers(IDSystemUsers);
                
                $(this).dialog('close');
            }
        },
        close: function () {

        }
    });
}

/*======================================================================================*/
/*======================================================================================*/
function Fill_SystemUsers_Dialog_Upd(IDSystemUsers) {

    if (IDSystemUsers > 0) {
        jQuery.ajax({
            url: "/Action/ProcessBackendAction.ashx?ActionObject=SystemUsers&action=Sel&IDSystemUsers=" + IDSystemUsers,
            type: "POST",
            dataType: "json",
            data: "",
            success: function (data, dataStatus) {

                $("#PositionShowDialog").setTemplateURL('../../Templates/Upd_SystemUsers.htm');
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
function Upd_SystemUsers(IDSystemUsers) {
    $.ajax({
        url: "/Action/ProcessBackendAction.ashx?ActionObject=SystemUsers&action=Upd&IDSystemUsers=" + IDSystemUsers,
        type: "POST",
        dataType: "json",
        data: $("#frmUpd_SystemUsers").serialize(),
        success: function (data) {
           if (data.status == "success") {
                $(".flexgripSystemUsers").flexReload();
				showMessageBox("Update SystemUsers thành công.");

            }
            else if (data.status != "success") {
                showMessageBox("Update SystemUsers lỗi: <font style='font-size:9px'>" + data.message + "</font>");

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

function Del_SystemUsers(IDSystemUsers) {

    $.ajax({
        url: "/Action/ProcessBackendAction.ashx?ActionObject=SystemUsers&action=Del&IDSystemUsers=" + IDSystemUsers,
        type: "POST",
        dataType: "json",
        data: $("#frmUpd_SystemUsers").serialize(),
        success: function (data) {
           if (data.status == "success") {
                $(".flexgripSystemUsers").flexReload();
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

