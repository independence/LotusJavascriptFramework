function Init_Dialog_Ins(divCategoryLevel2, divAlbums) {
    setTimeout('$("#tabs").tabs();', 1000);
    setTimeout('Change_Multi_TextareaToTinyMCE(".txt_Info");', 2000);
    setTimeout('FillAlbumDataToDropdowList("' + divAlbums + '");', 2000);


    var CodeCategoryLevel2 = $('#txt_CodeCategoryLevel2_Tempt').val();
    setTimeout('FillCategoryLevel2DataToDropdowList_EditForm("' + divCategoryLevel2 + '","' + CodeCategoryLevel2 + '");', 2000);

}

function Init_Dialog_Upd(divCategoryLevel2, divFocusCodeCategoryLevel2) {
    setTimeout('$("#tabs").tabs();', 1000);
    var FoucusCodeCategoryLevel2 = $(divFocusCodeCategoryLevel2).val();

    FillCategoryLevel2DataToDropdowList_EditForm(divCategoryLevel2, FoucusCodeCategoryLevel2);
}
/*======================================================================================*/
function FillCategoryLevel2DataToDropdowList(div) {

    if (1 > 0) {
        jQuery.ajax({
            url: "/Action/ProcessBackendAction.ashx?ActionObject=CategoryLevel2&action=Sel_ByIDLang",
            type: "POST",
            dataType: "json",
            data: "",
            success: function (data, dataStatus) {
                if (data.CategoryLevel2_Group.length >= 1) {
                    shtml = "<select id='txt_CodeCategoryLevel2' name='txt_CodeCategoryLevel2' style='width:200px'>";

                    $(data.CategoryLevel2_Group).each(function (i, item) {
                        shtml += "<option value='{0}'>{1}</option>".format(item.Code, item.CategoryNameLevel2);
                    });
                    shtml += "</select>";
                    $(div).html(shtml);
                }
            },
            timeout: 3000,
            error: function (request, error) {
            }
        });
    }
}
/*======================================================================================*/
function FillCategoryLevel2DataToDropdowList_EditForm(div, divCodeCategoryLevel2) {
    jQuery.ajax({
        url: "/Action/ProcessBackendAction.ashx?ActionObject=CategoryLevel2&action=CMS-Sel_ByIDLang",
        type: "POST",
        dataType: "json",
        data: "",
        success: function (data, dataStatus) {
            if (data.CategoryLevel2_Group.length >= 1) {
                shtml = "<select id='txt_CodeCategoryLevel2' name='txt_CodeCategoryLevel2' style='width:200px'>";

                $(data.CategoryLevel2_Group).each(function (i, item) {
                    if (item.Code == divCodeCategoryLevel2) {
                        shtml += "<option value='{0}' selected='selected'>{1}</option>".format(item.Code, item.CategoryNameLevel2);
                    }
                    else {
                        shtml += "<option value='{0}'>{1}</option>".format(item.Code, item.CategoryNameLevel2);
                    }
                });
                shtml += "</select>";
                $(div).html(shtml);
            }
        },
        timeout: 3000,
        error: function (request, error) {
        }
    });
}
/*======================================================================================*/
function FillAlbumDataToDropdowList(div, FocusID) {
    if (1 > 0) {
        jQuery.ajax({
            url: "/Action/ProcessBackendAction.ashx?ActionObject=Albums&action=CMS-Sel_all_ByIDLang",
            type: "POST",
            dataType: "json",
            data: "",
            success: function (data, dataStatus) {
                shtml = "<select id='txt_IDAlbum' name='txt_IDAlbum' style='width:200px'>";
                if (data.Albums_Group.length >= 1) {

                    shtml += "<option value='0'>[Chọn Album tài liệu]</option>";
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

function OpenDialog_Ins_CategoryLevel1() {
    var title = "";
    var width = 1200;
    var height = 900;
    if ($("#PositionShowDialog").length <= 0) {
        $("body").append('<div id="#PositionShowDialog" style="display:none; overflow-x:hidden; overflow-y:scroll;" title="' + title + '"></div>');
    }
 
    $("#PositionShowDialog").setTemplateURL('../../Templates/Ins_CategoryLevel1ToCategoryLevel2_005.htm');
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
                Ins_CategoryLevel1();
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
function Ins_CategoryLevel1() {
  //  ShowLoading("#frmIns_CategoryLevel1");
    $.ajax({
        url: "/Action/ProcessBackendAction.ashx?ActionObject=CategoryLevel1&action=CMS-Ins",
        type: "POST",
        dataType: "json",
        data: $("#frmIns_CategoryLevel1").serialize(),

        success: function (data) {
           if (data.status == "success")  {
			   $(".flexgripCategoryLevel1").flexReload();
                showMessageBox("Thêm CategoryLevel1 thành công.");

            }
            else if (data.status != "success") {
                showMessageBox("Thêm CategoryLevel1 lỗi: <font style='font-size:9px'>" + data.message + "</font>");

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

function OpenDialog_Upd_CategoryLevel1(IDCategoryLevel1) {
    var title = "";
    var width = 1200;
    var height = 900;
    if ($("#PositionShowDialog").length <= 0) {
        $("body").append('<div id="PositionShowDialog" style="display:none; overflow-x:hidden; overflow-y:scroll;" title="' + title + '"></div>');
    }

    Fill_CategoryLevel1_Dialog_Upd(IDCategoryLevel1);

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
                Upd_CategoryLevel1(IDCategoryLevel1);
                
                $(this).dialog('close');
            }
        },
        close: function () {

        }
    });
}

/*======================================================================================*/
/*======================================================================================*/
function Fill_CategoryLevel1_Dialog_Upd(IDCategoryLevel1) {

    if (IDCategoryLevel1 > 0) {
        jQuery.ajax({
            url: "/Action/ProcessBackendAction.ashx?ActionObject=CategoryLevel1&action=CMS-Sel_ByCode&IDCategoryLevel1=" + IDCategoryLevel1,
            type: "POST",
            dataType: "json",
            data: "",
            success: function (data, dataStatus) {

                $("#PositionShowDialog").setTemplateURL('../../Templates/Upd_CategoryLevel1ToCategoryLevel2_005.htm');
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
function Upd_CategoryLevel1(IDCategoryLevel1) {
    $.ajax({
        url: "/Action/ProcessBackendAction.ashx?ActionObject=CategoryLevel1&action=CMS-Upd&IDCategoryLevel1=" + IDCategoryLevel1,
        type: "POST",
        dataType: "json",
        data: $("#frmUpd_CategoryLevel1").serialize(),
        success: function (data) {
           if (data.status == "success") {
                $(".flexgripCategoryLevel1").flexReload();
				showMessageBox("Update CategoryLevel1 thành công.");

            }
            else if (data.status != "success") {
                showMessageBox("Update CategoryLevel1 lỗi: <font style='font-size:9px'>" + data.message + "</font>");

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

function Del_CategoryLevel1(IDCategoryLevel1) {

    $.ajax({
        url: "/Action/ProcessBackendAction.ashx?ActionObject=CategoryLevel1&action=CMS-Del&IDCategoryLevel1=" + IDCategoryLevel1,
        type: "POST",
        dataType: "json",
        data: $("#frmUpd_CategoryLevel1").serialize(),
        success: function (data) {
           if (data.status == "success") {
                $(".flexgripCategoryLevel1").flexReload();
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
function Dis_CategoryLevel1(IDCategoryLevel1) {

    $.ajax({
        url: "/Action/ProcessBackendAction.ashx?ActionObject=CategoryLevel1&action=CMS-Dis&IDCategoryLevel1=" + IDCategoryLevel1,
        type: "POST",
        dataType: "json",
        data: $("#frmUpd_CategoryLevel1").serialize(),
        success: function (data) {
            if (data.status == "success") {
                $(".flexgripCategoryLevel1").flexReload();
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

