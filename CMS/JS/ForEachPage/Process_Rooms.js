function Init_Dialog_Ins() {
    setTimeout('$("#tabs").tabs();', 1000);
    setTimeout('Change_Multi_TextareaToTinyMCE(".txt_Info");', 2000);
    InputNumber(".txt_CostRef", ".lbWarning_CostRef", sys_NumLang);
}


function Init_Dialog_Upd() {
    setTimeout('$("#tabs").tabs();', 1000);
    setTimeout('Change_Multi_TextareaToTinyMCE(".txt_Info");', 2000);
    InputNumber(".txt_CostRef", ".lbWarning_CostRef", sys_NumLang);

    //setTimeout('Change_Multi_TextareaToTinyMCE(".txt_Info");', 2000);
}

function OpenDialog_Ins_Rooms() {
    var title = "";
    var width = 810;
    var height = 500;
    if ($("#PositionShowDialog").length <= 0) {
        $("body").append('<div id="#PositionShowDialog" style="display:none; overflow-x:hidden; overflow-y:scroll;" title="' + title + '"></div>');
    }
 
    $("#PositionShowDialog").setTemplateURL('../../Templates/Ins_Rooms.htm');
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
                Save_Multi_TinyMCE("txt_Info_Lang", sys_NumLang);
                Ins_Rooms();
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
function Ins_Rooms() {
  //  ShowLoading("#frmIns_Rooms");
    $.ajax({
        url: "/Action/ProcessBackendAction.ashx?ActionObject=Rooms&action=CMS-Ins",
        type: "POST",
        dataType: "json",
        data: $("#frmIns_Rooms").serialize(),

        success: function (data) {
           if (data.status == "success")  {
			   $(".flexgripRooms").flexReload();
                showMessageBox("Thêm Rooms thành công.");

            }
            else if (data.status != "success") {
                showMessageBox("Thêm Rooms lỗi: <font style='font-size:9px'>" + data.message + "</font>");

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

function OpenDialog_Upd_Rooms(IDRooms) {
    var title = "";
    var width = 810;
    var height = 500;
    if ($("#PositionShowDialog").length <= 0) {
        $("body").append('<div id="PositionShowDialog" style="display:none; overflow-x:hidden; overflow-y:scroll;" title="' + title + '"></div>');
    }

    Fill_Rooms_Dialog_Upd(IDRooms);

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
                Save_Multi_TinyMCE("txt_Info_Lang", sys_NumLang);
                Upd_Rooms(IDRooms);
                
                $(this).dialog('close');
            }
        },
        close: function () {

        }
    });
}

/*======================================================================================*/
/*======================================================================================*/
function Fill_Rooms_Dialog_Upd(IDRooms) {

    if (IDRooms > 0) {
        jQuery.ajax({
            url: "/Action/ProcessBackendAction.ashx?ActionObject=Rooms&action=CMS-Sel_ByCode&IDRooms=" + IDRooms,
            type: "POST",
            dataType: "json",
            data: "",
            success: function (data, dataStatus) {

                $("#PositionShowDialog").setTemplateURL('../../Templates/Upd_Rooms.htm');
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
function Upd_Rooms(IDRooms) {
    $.ajax({
        url: "/Action/ProcessBackendAction.ashx?ActionObject=Rooms&action=CMS-Upd&IDRooms=" + IDRooms,
        type: "POST",
        dataType: "json",
        data: $("#frmUpd_Rooms").serialize(),
        success: function (data) {
           if (data.status == "success") {
                $(".flexgripRooms").flexReload();
				showMessageBox("Update Rooms thành công.");

            }
            else if (data.status != "success") {
                showMessageBox("Update Rooms lỗi: <font style='font-size:9px'>" + data.message + "</font>");

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

function Del_Rooms(IDRooms) {

    $.ajax({
        url: "/Action/ProcessBackendAction.ashx?ActionObject=Rooms&action=CMS-Del&IDRooms=" + IDRooms,
        type: "POST",
        dataType: "json",
        data: $("#frmUpd_Rooms").serialize(),
        success: function (data) {
           if (data.status == "success") {
                $(".flexgripRooms").flexReload();
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
function Dis_Rooms(IDRooms) {

    $.ajax({
        url: "/Action/ProcessBackendAction.ashx?ActionObject=Rooms&action=CMS-Dis&IDRooms=" + IDRooms,
        type: "POST",
        dataType: "json",
        data: $("#frmUpd_Rooms").serialize(),
        success: function (data) {
            if (data.status == "success") {
                $(".flexgripRooms").flexReload();
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

