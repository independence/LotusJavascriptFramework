
function Init_Dialog_Ins() {
    setTimeout('$("#tabs").tabs();', 1000);
    setTimeout('Change_Multi_TextareaToTinyMCE(".txt_Info");', 2000);
    setTimeout('$("#txt_CreateDate").datepicker({ dateFormat: "dd/mm/yy" });', 1000);
}

function Init_Dialog_Upd() {
    setTimeout('$("#tabs").tabs();', 1000);
    setTimeout('Change_Multi_TextareaToTinyMCE(".txt_Info");', 2000);
    setTimeout('$("#txt_CreateDate").datepicker({ dateFormat: "dd/mm/yy" });', 1000);
}

function OpenDialog_Ins_Albums() {
    var title = "";
    var width = 1200;
    var height = 600;
    if ($("#PositionShowDialog").length <= 0) {
        $("body").append('<div id="#PositionShowDialog" style="display:none; overflow-x:hidden; overflow-y:scroll;" title="' + title + '"></div>');
    }
 
    $("#PositionShowDialog").setTemplateURL('../../Templates/Ins_Albums.htm');
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
                Ins_Albums();
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
function Ins_Albums() {
  //  ShowLoading("#frmIns_Albums");
    $.ajax({
        url: "/Action/ProcessBackendAction.ashx?ActionObject=Albums&action=Ins",
        type: "POST",
        dataType: "json",
        data: $("#frmIns_Albums").serialize(),

        success: function (data) {
           if (data.status == "success")  {
			   $(".flexgripAlbums").flexReload();
                showMessageBox("Thêm Albums thành công.");

            }
            else if (data.status != "success") {
                showMessageBox("Thêm Albums lỗi: <font style='font-size:9px'>" + data.message + "</font>");

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

function OpenDialog_Upd_Albums(IDAlbums) {
    var title = "";
    var width = 1200;
    var height = 1350;
    if ($("#PositionShowDialog").length <= 0) {
        $("body").append('<div id="PositionShowDialog" style="display:none; overflow-x:hidden; overflow-y:scroll;" title="' + title + '"></div>');
    }

    Fill_Albums_Dialog_Upd(IDAlbums);

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
                Save_Multi_TinyMCE("txt_Info_Lang", sys_NumLang);
                Upd_Albums(IDAlbums);
                
                $(this).dialog('close');
            }
        },
        close: function () {

        }
    });
}

/*======================================================================================*/
/*======================================================================================*/
function Fill_Albums_Dialog_Upd(IDAlbums) {

    if (IDAlbums > 0) {
        jQuery.ajax({
            url: "/Action/ProcessBackendAction.ashx?ActionObject=Albums&action=Sel_all_ByCode&IDAlbums=" + IDAlbums,
            type: "POST",
            dataType: "json",
            data: "",
            success: function (data, dataStatus) {
                $("#PositionShowDialog").html();
                $("#PositionShowDialog").setTemplateURL('../../Templates/Upd_Albums.htm');
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
function Upd_Albums(IDAlbums) {
    $.ajax({
        url: "/Action/ProcessBackendAction.ashx?ActionObject=Albums&action=Upd&IDAlbums=" + IDAlbums,
        type: "POST",
        dataType: "json",
        data: $("#frmUpd_Albums").serialize(),
        success: function (data) {
           if (data.status == "success") {
                $(".flexgripAlbums").flexReload();
				showMessageBox("Update Albums thành công.");

            }
            else if (data.status != "success") {
                showMessageBox("Update Albums lỗi: <font style='font-size:9px'>" + data.message + "</font>");

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

function Del_Albums(IDAlbums) {

    $.ajax({
        url: "/Action/ProcessBackendAction.ashx?ActionObject=Albums&action=Del&IDAlbums=" + IDAlbums,
        type: "POST",
        dataType: "json",
        data: $("#frmUpd_Albums").serialize(),
        success: function (data) {
           if (data.status == "success") {
               $(".flexgripAlbums").flexReload();
               //sys_Lang.Item[1]
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


function Dis_Albums(IDAlbums) {

    $.ajax({
        url: "/Action/ProcessBackendAction.ashx?ActionObject=Albums&action=Dis&IDAlbums=" + IDAlbums,
        type: "POST",
        dataType: "json",
        data: $("#frmUpd_Albums").serialize(),
        success: function (data) {
            if (data.status == "success") {
                $(".flexgripAlbums").flexReload();
                //sys_Lang.Item[1]
                showMessageBox("Disable thành công.");

            }
            else if (data.status != "success") {
                showMessageBox("Disable lỗi: <font style='font-size:9px'>" + data.message + "</font>");

            }
        },
        error: function (ex) {
        }
    });
}
