function Init_Dialog_Ins(divListIDAlbum) {
    FillAlbumsDataToDropdowList(divListIDAlbum);
    setTimeout('$("#tabs").tabs();', 1000);
    setTimeout('Change_Multi_TextareaToTinyMCE(".txt_Info");', 2000);

    $("#txt_UploadDate").datepicker({ dateFormat: 'dd/mm/yy' });
    setTimeout('InputNumber("#txt_Width", "#lbWarning_NumTableStandard");', 1000);
    setTimeout('InputNumber("#txt_Height", "#lbWarning_NumTableStandard");', 1000);
    //setTimeout('Change_Multi_TextareaToTinyMCE(".txt_Info");', 2000);
}
function Init_Dialog_Upd(divListIDAlbum, divCodeAlbum) {
    var CodeAlbum = $(divCodeAlbum).val();
    FillAlbumsDataToDropdowList_EditForm(divListIDAlbum, CodeAlbum);
    setTimeout('$("#tabs").tabs();', 1000);
    setTimeout('Change_Multi_TextareaToTinyMCE(".txt_Info");', 2000);

    $("#txt_UploadDate").datepicker({ dateFormat: 'dd/mm/yy' });
    setTimeout('InputNumber("#txt_Height", "#lbWarning_NumTableStandard");', 1000);
    setTimeout('InputNumber("#txt_Width", "#lbWarning_NumTableStandard");', 1000);
    //setTimeout('Change_Multi_TextareaToTinyMCE(".txt_Info");', 2000);
}
/*###########################################################################*/
function FillAlbumsDataToDropdowList_ForLoadImage(div, type) {
    if (1 > 0) {
        jQuery.ajax({
            url: "/Action/ProcessBackendAction.ashx?ActionObject=Albums&action=Sel_all_ByIDLang",
            type: "POST",
            dataType: "json",
            data: "",
            success: function (data, dataStatus) {
                shtml = "<select id='txt_AlbumID' name='txt_AlbumID' style='width:200px'>";
                if (type == "[Show All]") {
                    shtml += "<option value='0' onclick='Reload_Flexgrid_ByAlbumID(0);' >[Show All]</option>";

                }
                if (data.Albums_Group.length >= 1) {
                    $(data.Albums_Group).each(function (i, item) {
                        shtml += "<option value='{0}'  onclick='Reload_Flexgrid_ByAlbumID({1});' >{2}</option>".format(item.Code, item.ID, item.Title);
                    });

                }
                $(div).html(shtml);
                shtml += "</select>";
            },
            timeout: 3000,
            error: function (request, error) {
            }
        });
    }
}
/*###########################################################################*/
function Reload_Flexgrid_ByAlbumID(AlbumID) {

    if (AlbumID == 0) //Load toan bo Image
    {
        $(".flexgripFiles").flexOptions({ url: "/Action/ProcessBackendAction.ashx?ActionObject=Files&action=Sel_Page_ForFlexigrid" });
        $(".flexgripFiles").flexReload();
    }
    else {

        var urlGetData = "/Action/ProcessBackendAction.ashx?ActionObject=Files&action=Sel_Page_ForFlexigrid_ByCode&AlbumsID={0}".format(AlbumID);
        $(".flexgripFiles").flexOptions({ url: urlGetData });
        $(".flexgripFiles").flexReload();

    }

}
/*###########################################################################*/
function FillAlbumsDataToDropdowList(div) {
    if (1 > 0) {
        jQuery.ajax({
            url: "/Action/ProcessBackendAction.ashx?ActionObject=Albums&action=Sel_all_ByIDLang",
            type: "POST",
            dataType: "json",
            data: "",
            success: function (data, dataStatus) {
                shtml = "<select id='txt_CodeAlbums' name='txt_CodeAlbums' style='width:200px'>";
                if (data.Albums_Group.length >= 1) {
                    $(data.Albums_Group).each(function (i, item) {
                        shtml += "<option value='{0}'>{1}</option>".format(item.Code, item.Title);
                    });

                }
                else {
                    shtml += "<option value='-1'>Chưa có Album</option>"
                }
                $(div).html(shtml);
                shtml += "</select>";
            },
            timeout: 3000,
            error: function (request, error) {
            }
        });
    }
}
/*###########################################################################*/
function FillAlbumsDataToDropdowList_EditForm(div, CodeAlbum) {

    if (1 > 0) {
        jQuery.ajax({
            url: "/Action/ProcessBackendAction.ashx?ActionObject=Albums&action=Sel_all_ByIDLang",
            type: "POST",
            dataType: "json",
            data: "",
            success: function (data, dataStatus) {
                shtml = "<select id='txt_CodeAlbums' name='txt_CodeAlbums' style='width:200px'>";
                if (data.Albums_Group.length >= 1) {
                    $(data.Albums_Group).each(function (i, item) {
                        if (item.Code == CodeAlbum) {
                            shtml += "<option value='{0}'selected='selected'>{1}</option>".format(item.Code, item.Title);
                        }
                        else
                            shtml += "<option value='{0}'>{1}</option>".format(item.Code, item.Title);
                    });

                }
                else { shtml += "<option value='-1'>Chưa có Album</option>"; }
                $(div).html(shtml);
                shtml += "</select>";
            },
            timeout: 3000,
            error: function (request, error) {
            }
        });
    }
}
/*###########################################################################*/
function OpenDialog_Ins_Files() {
    var title = "";
    var width = 1200;
    var height = 1350;
    if ($("#PositionShowDialog").length <= 0) {
        $("body").append('<div id="#PositionShowDialog" style="display:none; overflow-x:hidden; overflow-y:scroll;" title="' + title + '"></div>');
    }

    $("#PositionShowDialog").setTemplateURL('../../Templates/Ins_Files.htm');
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
                Ins_Files();
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
function Ins_Files() {
  //  ShowLoading("#frmIns_Files");
    $.ajax({
        url: "/Action/ProcessBackendAction.ashx?ActionObject=Files&action=Ins",
        type: "POST",
        dataType: "json",
        data: $("#frmIns_Files").serialize(),

        success: function (data) {
           if (data.status == "success")  {
			   $(".flexgripFiles").flexReload();
                showMessageBox("Thêm file thành công.");

            }
            else if (data.status != "success") {
                showMessageBox("Thêm Files lỗi: <font style='font-size:9px'>" + data.message + "</font>");

            }
        },
        error: function (ex) {
        }
    });
}
/*____________________________________________________________________________*/
// Code: BUI MINH NGOC
// Date: 30/04/2013
// Template:
/*____________________________________________________________________________*/
// Info: Xu ly insert 
/*############################################################################*/
function Ins_Files() {
    //  ShowLoading("#frmIns_Files");
    $.ajax({
        url: "/Action/ProcessBackendAction.ashx?ActionObject=Files&action=Ins",
        type: "POST",
        dataType: "json",
        data: $("#frmIns_Files").serialize(),

        success: function (data) {
            if (data.status == "success") {
                $(".flexgripFiles").flexReload();
                showMessageBox("Thêm file thành công.");

            }
            else if (data.status != "success") {
                showMessageBox("Thêm Files lỗi: <font style='font-size:9px'>" + data.message + "</font>");

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

function OpenDialog_Upd_Files(IDFiles) {
    var title = "";
    var width = 1200;
    var height = 1350;
    if ($("#PositionShowDialog").length <= 0) {
        $("body").append('<div id="PositionShowDialog" style="display:none; overflow-x:hidden; overflow-y:scroll;" title="' + title + '"></div>');
    }

    Fill_Files_Dialog_Upd(IDFiles);

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
                Upd_Files(IDFiles);
                
                $(this).dialog('close');
            }
        },
        close: function () {

        }
    });
}

/*======================================================================================*/
/*======================================================================================*/
function Fill_Files_Dialog_Upd(IDFiles) {

    if (IDFiles > 0) {
        jQuery.ajax({
            url: "/Action/ProcessBackendAction.ashx?ActionObject=Files&action=Sel_ByCode&IDFiles=" + IDFiles,
            type: "POST",
            dataType: "json",
            data: "",
            success: function (data, dataStatus) {

                $("#PositionShowDialog").setTemplateURL('../../Templates/Upd_Files.htm');
                $("#PositionShowDialog").setParam('NumLang', sys_NumLang); //sys_NumLang : trong file SystemConfig.js
                $("#PositionShowDialog").setParam('Lang', sys_Lang);

                $("#PositionShowDialog").processTemplate(data);
                html = $("#PositionShowDialog").html();
                html = Encoder.htmlDecode(html);
                $("#PositionShowDialog").html(html);

            },
            timeout: 30000,
            error: function (request, error) {
            }
        });
    }
}
/*======================================================================================*/
/*======================================================================================*/
function Upd_Files(IDFiles) {
    $.ajax({
        url: "/Action/ProcessBackendAction.ashx?ActionObject=Files&action=Upd&IDFiles=" + IDFiles,
        type: "POST",
        dataType: "json",
        data: $("#frmUpd_Files").serialize(),
        success: function (data) {
           if (data.status == "success") {
                $(".flexgripFiles").flexReload();
				showMessageBox("Update Files thành công.");

            }
            else if (data.status != "success") {
                showMessageBox("Update Files lỗi: <font style='font-size:9px'>" + data.message + "</font>");

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

function Del_Files(IDFiles) {

    $.ajax({
        url: "/Action/ProcessBackendAction.ashx?ActionObject=Files&action=Del&IDFiles=" + IDFiles,
        type: "POST",
        dataType: "json",
        data: $("#frmUpd_Files").serialize(),
        success: function (data) {
           if (data.status == "success") {
                $(".flexgripFiles").flexReload();
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

