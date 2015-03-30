
function Init_Dialog_Ins() {

    $("#tabs").tabs();
    Change_Multi_TextareaToTinyMCE(".txt_Info");
    InputNumber("#txt_NumTableStandard", "#lbWarning_NumTableStandard");
    InputNumber("#txt_NumTableMax", "#lbWarning_NumTableMax");
    InputNumber(".txt_CostRef", ".lbWarning_CostRef", sys_NumLang);
}
function Init_Dialog_Upd() {
    $("#tabs").tabs();
    Change_Multi_TextareaToTinyMCE(".txt_Info");
    InputNumber("#txt_NumTableStandard", "#lbWarning_NumTableStandard");
    InputNumber("#txt_NumTableMax", "#lbWarning_NumTableMax");
    InputNumber(".txt_CostRef", ".lbWarning_CostRef", sys_NumLang);
}

// Thay đổi Change_TextareaToTinyMCE_OnPopup : Hàm nằm trong file common NhakHachchinhphu.js
//save tinymce --> textarea truoc khi submit : tinymce.get('txt_Info_Lang1').save();
//Huy Tinymce -->RemoveTinyMCE();

/*############################################################################*/
/*   FORM FORM FORM FORM FORM FORM FORM FORM FORM FORM FORM FORM FORM FORM    */
/*____________________________________________________________________________*/
// Code: Huy
// Date: 04/07/2013
// Template:
/*____________________________________________________________________________*/
// Info: Mo form insert 
/*############################################################################*/


function OpenDialog_Ins_Halls() {

    var title = "";
    var width = 810;
    var height = 660;
    var NumLang = $("#txtNumLang").val();
    if ($("#PositionShowDialog").length <= 0) {
        $("body").append('<div id="#PositionShowDialog" style="display:none; overflow-x:hidden; overflow-y:scroll;" title="' + title + '"></div>');
    }

    $('#PositionShowDialog').setTemplateURL('../../Templates/Ins_Halls.htm');
    $("#PositionShowDialog").setParam('NumLang', sys_NumLang); //sys_NumLang : trong file SystemConfig.js
    $("#PositionShowDialog").setParam('Lang', sys_Lang);
    $("#PositionShowDialog").processTemplate();
    $("#PositionShowDialog").dialog({
        modal: true,

        width: width,
        height: height,
        resizable: false,

        buttons: {
            'Cancel': function () {
                $(this).dialog("close");

            },

            'Save': function () {

                Save_Multi_TinyMCE("txt_Info_Lang", sys_NumLang);

                Ins_Halls();
                $(this).dialog("close");

            }
        },
        close: function () {
            $(this).dialog("close");
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
function Ins_Halls() {
    $.ajax({
        url: "/Action/ProcessBackendAction.ashx?ActionObject=Halls&action=CMS-Ins",
        type: "POST",
        dataType: "json",
        data: $("#frmIns_Halls").serialize(),

        success: function (data) {
            if ((data.status == "success") || (IsReloadRadgrid == 1)) {
                $(".flexgripHalls").flexReload();
                showMessageBox("Thêm Halls thành công.");
                $(".flexgripHalls").flexReload();

            }
            else if ((data.status != "success") || (IsReloadRadgrid == 0)) {
                showMessageBox("Thêm Halls lỗi: <font style='font-size:9px'>" + data.message + "</font>");
            }

            else {
                showMessageBox(data.messege);
                return;
            }
        },
        complete: function (data) {
            $(".flexgripHalls").flexReload();

        },

        error: function (ex) {
            //LoadCompleted("#Loading");
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

function OpenDialog_Upd_Halls(IDHalls) {
    var title = "";
    var width = 810;
    var height = 660;
    if ($("#PositionShowDialog").length <= 0) {
        $("body").append('<div id="PositionShowDialog" style="display:none; overflow-x:hidden; overflow-y:scroll;" title="' + title + '"></div>');
    }

    Fill_Halls_Dialog_Upd(IDHalls);
    $("#PositionShowDialog").dialog({
        modal: true,
        //open: setTimeout('Change_TextareaToTinyMCE_OnPopup("#txt_Info_Lang1");Change_TextareaToTinyMCE_OnPopup("#txt_Info_Lang2");Change_TextareaToTinyMCE_OnPopup("#txt_Info_Lang3");', 2000), // Cần phải có settimeout,
        width: width,
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

                Upd_Halls(IDHalls);
                $(this).dialog('close');
            }
        },
        close: function () {

            $(this).dialog('close');
        }
    });
}

/*======================================================================================*/
/*======================================================================================*/
function Fill_Halls_Dialog_Upd(IDHalls) {

    if (IDHalls > 0) {
        jQuery.ajax({
            url: "/Action/ProcessBackendAction.ashx?ActionObject=Halls&action=CMS-Sel_ByCode&IDHalls={0}".format(IDHalls),
            type: "POST",
            dataType: "json",
            data: "",
            success: function (data, dataStatus) {

                $("#PositionShowDialog").setTemplateURL('../../Templates/Upd_Halls.htm');
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
function Upd_Halls(IDHalls) {
    $.ajax({
        url: "/Action/ProcessBackendAction.ashx?ActionObject=Halls&action=CMS-Upd&IDHalls=" + IDHalls,
        type: "POST",
        dataType: "json",
        data: $("#frmUpd_Halls").serialize(),
        success: function (data) {
            if ((data.status == "success")) {
                $(".flexgripHalls").flexReload();
                showMessageBox("Update Halls thành công.");

                return;
            }
            else {
                showMessageBox("Update Halls lỗi: <font style='font-size:9px'>" + data.message + "</font>");
                return;
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

function Del_Halls(IDHalls) {

    $.ajax({
        url: "/Action/ProcessBackendAction.ashx?ActionObject=Halls&action=CMS-Del&IDHalls=" + IDHalls,
        type: "POST",
        dataType: "json",
        data: $("#frmUpd_Halls").serialize(),
        success: function (data) {
            if ((data.status == "success")) {
                $(".flexgripHalls").flexReload();
                return;
            }
            else {
                showMessageBox("Xóa Halls lỗi: <font style='font-size:9px'>" + data.message + "</font>");
                return;
            }
        },
        error: function (ex) {
        }
    });
}

