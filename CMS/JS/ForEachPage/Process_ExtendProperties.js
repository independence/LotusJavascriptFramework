function Init_Dialog_Ins() {
    setTimeout('$("#tabs").tabs();', 1000);
    //setTimeout('Change_Multi_TextareaToTinyMCE(".txt_Info");', 2000);
}


function Init_Dialog_Upd() {
    setTimeout('$("#tabs").tabs();', 1000);
    //setTimeout('Change_Multi_TextareaToTinyMCE(".txt_Info");', 2000);
}

function OpenDialog_Ins_ExtendProperties() {
    var title = "";
    var width = 810;
    var height = 500;
    if ($("#PositionShowDialog").length <= 0) {
        $("body").append('<div id="#PositionShowDialog" style="display:none; overflow-x:hidden; overflow-y:scroll;" title="' + title + '"></div>');
    }
 
    $("#PositionShowDialog").setTemplateURL('../../Templates/Ins_ExtendProperties.htm');
    $("#PositionShowDialog").setParam('NumLang', sys_NumLang); //sys_NumLang : trong file SystemConfig.js
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
                //Save_Multi_TinyMCE("txt_Info_Lang", sys_NumLang);
                Ins_ExtendProperties();
                $(this).dialog("close");
            }
        },
        close: function () {
          
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
function Ins_ExtendProperties() {
  //  ShowLoading("#frmIns_ExtendProperties");
    $.ajax({
        url: "/Action/ProcessBackendAction.ashx?ActionObject=ExtendProperties&action=Ins",
        type: "POST",
        dataType: "json",
        data: $("#frmIns_ExtendProperties").serialize(),

        success: function (data) {
           if (data.status == "success")  {
			   $(".flexgripExtendProperties").flexReload();
                showMessageBox("Thêm ExtendProperties thành công.");

            }
            else if (data.status != "success") {
                showMessageBox("Thêm ExtendProperties lỗi: <font style='font-size:9px'>" + data.message + "</font>");

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

function OpenDialog_Upd_ExtendProperties(IDExtendProperties) {
    var title = "";
    var width = 810;
    var height = 500;
    if ($("#PositionShowDialog").length <= 0) {
        $("body").append('<div id="PositionShowDialog" style="display:none; overflow-x:hidden; overflow-y:scroll;" title="' + title + '"></div>');
    }

    Fill_ExtendProperties_Dialog_Upd(IDExtendProperties);

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
                //Save_Multi_TinyMCE("txt_Info_Lang", sys_NumLang);
                Upd_ExtendProperties(IDExtendProperties);
                
                $(this).dialog('close');
            }
        },
        close: function () {

        }
    });
}

/*======================================================================================*/
/*======================================================================================*/
function Fill_ExtendProperties_Dialog_Upd(IDExtendProperties) {

    if (IDExtendProperties > 0) {
        jQuery.ajax({
            url: "/Action/ProcessBackendAction.ashx?ActionObject=ExtendProperties&action=Sel_ByCode&IDExtendProperties=" + IDExtendProperties,
            type: "POST",
            dataType: "json",
            data: "",
            success: function (data, dataStatus) {

                $("#PositionShowDialog").setTemplateURL('../../Templates/Upd_ExtendProperties.htm');
                $("#PositionShowDialog").setParam('NumLang', sys_NumLang); //sys_NumLang : trong file SystemConfig.js
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
function Upd_ExtendProperties(IDExtendProperties) {
    $.ajax({
        url: "/Action/ProcessBackendAction.ashx?ActionObject=ExtendProperties&action=Upd&IDExtendProperties=" + IDExtendProperties,
        type: "POST",
        dataType: "json",
        data: $("#frmUpd_ExtendProperties").serialize(),
        success: function (data) {
           if (data.status == "success") {
                $(".flexgripExtendProperties").flexReload();
				showMessageBox("Update ExtendProperties thành công.");

            }
            else if (data.status != "success") {
                showMessageBox("Update ExtendProperties lỗi: <font style='font-size:9px'>" + data.message + "</font>");

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

function Del_ExtendProperties(IDExtendProperties) {

    $.ajax({
        url: "/Action/ProcessBackendAction.ashx?ActionObject=ExtendProperties&action=Del&IDExtendProperties=" + IDExtendProperties,
        type: "POST",
        dataType: "json",
        data: $("#frmUpd_ExtendProperties").serialize(),
        success: function (data) {
           if (data.status == "success") {
                $(".flexgripExtendProperties").flexReload();
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

