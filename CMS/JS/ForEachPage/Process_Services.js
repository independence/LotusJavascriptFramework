function Init_Dialog_Ins() {
    setTimeout('$("#tabs").tabs();', 1000);
    //setTimeout('Change_Multi_TextareaToTinyMCE(".txt_Info");', 2000);
}


function Init_Dialog_Upd() {
    setTimeout('$("#tabs").tabs();', 1000);
    //setTimeout('Change_Multi_TextareaToTinyMCE(".txt_Info");', 2000);
}

function OpenDialog_Ins_Services() {
    var title = "";
    var width = 810;
    var height = 500;
    if ($("#PositionShowDialog").length <= 0) {
        $("body").append('<div id="#PositionShowDialog" style="display:none; overflow-x:hidden; overflow-y:scroll;" title="' + title + '"></div>');
    }
 
    $("#PositionShowDialog").setTemplateURL('../../Templates/Ins_Services.htm');
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
                //Save_Multi_TinyMCE("txt_Info_Lang", sys_NumLang);
                Ins_Services();
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
function Ins_Services() {
  //  ShowLoading("#frmIns_Services");
    $.ajax({
        url: "/Action/ProcessBackendAction.ashx?ActionObject=Services&action=Ins",
        type: "POST",
        dataType: "json",
        data: $("#frmIns_Services").serialize(),

        success: function (data) {
           if (data.status == "success")  {
			   $(".flexgripServices").flexReload();
                showMessageBox("Thêm Services thành công.");

            }
            else if (data.status != "success") {
                showMessageBox("Thêm Services lỗi: <font style='font-size:9px'>" + data.message + "</font>");

            }
        },
        complete: function (data) {

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

function OpenDialog_Upd_Services(IDServices) {
    var title = "";
    var width = 810;
    var height = 500;
    if ($("#PositionShowDialog").length <= 0) {
        $("body").append('<div id="PositionShowDialog" style="display:none; overflow-x:hidden; overflow-y:scroll;" title="' + title + '"></div>');
    }

    Fill_Services_Dialog_Upd(IDServices);

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
                Upd_Services(IDServices);
                
                $(this).dialog('close');
            }
        },
        close: function () {

        }
    });
}

/*======================================================================================*/
/*======================================================================================*/
function Fill_Services_Dialog_Upd(IDServices) {

    if (IDServices > 0) {
        jQuery.ajax({
            url: "/Action/ProcessBackendAction.ashx?ActionObject=Services&action=Sel_ByCode&IDServices=" + IDServices,
            type: "POST",
            dataType: "json",
            data: "",
            success: function (data, dataStatus) {

                $("#PositionShowDialog").setTemplateURL('../../Templates/Upd_Services.htm');
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
function Upd_Services(IDServices) {
    $.ajax({
        url: "/Action/ProcessBackendAction.ashx?ActionObject=Services&action=Upd&IDServices=" + IDServices,
        type: "POST",
        dataType: "json",
        data: $("#frmUpd_Services").serialize(),
        success: function (data) {
           if (data.status == "success") {
                $(".flexgripServices").flexReload();
				showMessageBox("Update Services thành công.");

            }
            else if (data.status != "success") {
                showMessageBox("Update Services lỗi: <font style='font-size:9px'>" + data.message + "</font>");

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

function Del_Services(IDServices) {

    $.ajax({
        url: "/Action/ProcessBackendAction.ashx?ActionObject=Services&action=Del&IDServices=" + IDServices,
        type: "POST",
        dataType: "json",
        data: $("#frmUpd_Services").serialize(),
        success: function (data) {
           if (data.status == "success") {
                $(".flexgripServices").flexReload();
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

