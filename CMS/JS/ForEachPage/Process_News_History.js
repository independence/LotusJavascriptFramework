function Init_Dialog_Ins(divAlbums) {
    setTimeout('$("#tabs").tabs();', 1000);
    setTimeout('Change_Multi_TextareaToTinyMCE(".txt_Info");', 2000);

    setTimeout('$("#txt_ExpireDate").datepicker({ dateFormat: "dd/mm/yy" });', 1000);
    setTimeout('$("#txt_PublishDate").datepicker({ dateFormat: "dd/mm/yy" });', 1000);
    //FillCategoryLevel1DataToDropdowList(divCategoryLevel1);
    FillAlbumDataToDropdowList(divAlbums);
}


function Init_Dialog_Upd(divAlbums,divIDAlbums) {
    setTimeout('$("#tabs").tabs();', 1000);
    setTimeout('Change_Multi_TextareaToTinyMCE(".txt_Info");', 2000);

    setTimeout('$("#txt_ExpireDate").datepicker({ dateFormat: "dd/mm/yy" });', 1000);
    setTimeout('$("#txt_PublishDate").datepicker({ dateFormat: "dd/mm/yy" });', 1000);
    var IDAlbums = $(divIDAlbums).val();
   //FillCategoryLevel1DataToDropdowList(divCategoryLevel1, CodeCategoryLevel1);
    FillAlbumDataToDropdowList(divAlbums,IDAlbums);
}

/*======================================================================================*/
/*======================================================================================*/
function FillAlbumDataToDropdowList(div, FocusID) {

    if (1 > 0) {
        jQuery.ajax({
            url: "/Action/ProcessBackendAction.ashx?ActionObject=Albums&action=Sel_all_ByIDLang",
            type: "POST",
            dataType: "json",
            data: "",
            success: function (data, dataStatus) {
                shtml = "<select id='txt_IDAlbum' name='txt_IDAlbum' style='width:200px'>";
                if (data.Albums_Group.length >= 1) {


                    $(data.Albums_Group).each(function (i, item) {

                        if (item.ID == FocusID) {
                            shtml += "<option value='{0}' selected='selected'>{1}</option>".format(item.ID, item.Name);
                        }
                        else {
                            shtml += "<option value='{0}'>{1}</option>".format(item.ID, item.Name);
                        }

                    });
                }
                else {
                    shtml += "<option value='-1'>Chưa có Album</option>";
                }
                shtml += "</select>";
                //Div_ListIDRoom
                $(div).html(shtml);
            },
            timeout: 3000,
            error: function (request, error) {
            }
        });
    }
}
/*======================================================================================*/
function OpenDialog_Ins_Contents() {
    var title = "";
    var width = 810;
    var height = 600;
    if ($("#PositionShowDialog").length <= 0) {
        $("body").append('<div id="#PositionShowDialog" style="display:none; overflow-x:hidden; overflow-y:scroll;" title="' + title + '"></div>');
    }
 
    $("#PositionShowDialog").setTemplateURL('../../Templates/Ins_Contents_History.htm');
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
                Ins_Contents();
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
function Ins_Contents() {
  //  ShowLoading("#frmIns_Contents");
    $.ajax({
        url: "/Action/ProcessBackendAction.ashx?ActionObject=Contents&action=Ins",
        type: "POST",
        dataType: "json",
        data: $("#frmIns_Contents").serialize(),

        success: function (data) {
           if (data.status == "success")  {
			   $(".flexgripContents").flexReload();
                showMessageBox("Thêm Contents thành công.");

            }
            else if (data.status != "success") {
                showMessageBox("Thêm Contents lỗi: <font style='font-size:9px'>" + data.message + "</font>");

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

function OpenDialog_Upd_Contents(IDContents) {
    var title = "";
    var width = 810;
    var height = 500;
    if ($("#PositionShowDialog").length <= 0) {
        $("body").append('<div id="PositionShowDialog" style="display:none; overflow-x:hidden; overflow-y:scroll;" title="' + title + '"></div>');
    }

    Fill_Contents_Dialog_Upd(IDContents);

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
                Upd_Contents(IDContents);
                
                $(this).dialog('close');
            }
        },
        close: function () {

        }
    });
}

/*======================================================================================*/
/*======================================================================================*/
function Fill_Contents_Dialog_Upd(IDContents) {

    if (IDContents > 0) {
        jQuery.ajax({
            url: "/Action/ProcessBackendAction.ashx?ActionObject=Contents&action=Sel_ByCode&IDContents=" + IDContents,
            type: "POST",
            dataType: "json",
            data: "",
            success: function (data, dataStatus) {

                $("#PositionShowDialog").setTemplateURL('../../Templates/Upd_Contents_History.htm');
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
function Upd_Contents(IDContents) {
    $.ajax({
        url: "/Action/ProcessBackendAction.ashx?ActionObject=Contents&action=Upd&IDContents=" + IDContents,
        type: "POST",
        dataType: "json",
        data: $("#frmUpd_Contents").serialize(),
        success: function (data) {
           if (data.status == "success") {
                $(".flexgripContents").flexReload();
				showMessageBox("Update Contents thành công.");

            }
            else if (data.status != "success") {
                showMessageBox("Update Contents lỗi: <font style='font-size:9px'>" + data.message + "</font>");

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

function Del_Contents(IDContents) {

    $.ajax({
        url: "/Action/ProcessBackendAction.ashx?ActionObject=Contents&action=Del&IDContents=" + IDContents,
        type: "POST",
        dataType: "json",
        data: $("#frmUpd_Contents").serialize(),
        success: function (data) {
           if (data.status == "success") {
                $(".flexgripContents").flexReload();
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

