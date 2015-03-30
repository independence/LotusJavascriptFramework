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

function OpenDialog_Ins_VIPCustomers() {
    var title = "";
    var width = 650;
    var height = 350;
    var NumLang = $("#txtNumLang").val();
    if ($("#PositionShowDialog").length <= 0) {
        $("body").append('<div id="#PositionShowDialog" style="display:yes; overflow-x:hidden; overflow-y:scroll;" title="' + title + '"></div>');
    }

    $("#PositionShowDialog").setTemplateURL('../../Templates/Ins_VIPCustomers.htm');
    $("#PositionShowDialog").setParam('NumLang', sys_NumLang); //sys_NumLang : trong file SystemConfig.js
    $("#PositionShowDialog").setParam('Lang', sys_Lang);
    $("#PositionShowDialog").processTemplateURL('../../Templates/Ins_VIPCustomers.htm', sys_Lang, sys_NumLang);
    $("#PositionShowDialog").dialog({
        modal: true,
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
            'Cancel': function () {
                $(this).dialog('close');


            },

            'Save': function () {
                Ins_VIPCustomers(1);
                
                $(this).dialog('close');
            }
        },
        close: function () {
            $(this).dialog('close');
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
function Ins_VIPCustomers() {
    //ShowLoading("#frmIns_Customers");
    $.ajax({
        url: "/Action/ProcessBackendAction.ashx?ActionObject=VIPCustomers&action=Ins_VIPCustomers",
        type: "POST",
        dataType: "json",
        data: $("#frmIns_Customers").serialize(),

        success: function (data) {
            if ((data.status == "success")) {
                $(".flexgripVIPCustomers").flexReload();
                showMessageBox("Thêm VIPCustomers thành công.");

            }
            else if (data.status != "success") {
                $(".flexgripVIPCustomers").flexReload();
                showMessageBox("Update VIPCustomers lỗi: <font style='font-size:9px'>" + data.message + "</font>");

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

function OpenDialog_Upd_VIPCustomers(IDCustomers) {
    var title = "";
    var width = 650;
    var height = 350;
    if ($("#PositionShowDialog").length <= 0) {
        $("body").append('<div id="PositionShowDialog" style="display:none; overflow-x:hidden; overflow-y:scroll;" title="' + title + '"></div>');
    }
    Fill_VIPCustomers_Dialog_Upd(IDCustomers);
    $("#PositionShowDialog").dialog({
        modal: true,
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
                Upd_VIPCustomers(IDCustomers);
                
                $(this).dialog('close');
            }
        },
        close: function () {

        }
    });
}

/*======================================================================================*/
/*======================================================================================*/
function Fill_VIPCustomers_Dialog_Upd(IDCustomers) {
    
    if (IDCustomers > 0) {
        jQuery.ajax({
            url: "/Action/ProcessBackendAction.ashx?ActionObject=VIPCustomers&action=Sel_VIPCustomers&IDCustomers=" + IDCustomers,
            type: "POST",
            dataType: "json",
            async: false,
            data: "",
            success: function (data, dataStatus) {

                $("#PositionShowDialog").setTemplateURL('../../Templates/Upd_VIPCustomers.htm');
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
function Upd_VIPCustomers(IDCustomers) {
    $.ajax({
        url: "/Action/ProcessBackendAction.ashx?ActionObject=VIPCustomers&action=Upd_VIPCustomers&IDCustomers=" + IDCustomers,
        type: "POST",
        dataType: "json",
        data: $("#frmUpd_VIPCustomers").serialize(),
        success: function (data) {
            if ((data.status == "success")) {
                $(".flexgripVIPCustomers").flexReload();
                showMessageBox("Update VIPCustomers thành công.");
                return;
            }
            else {
                showMessageBox("Update VIPCustomers lỗi: <font style='font-size:9px'>" + data.message + "</font>");
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

function Del_VIPCustomers(IDCustomers) {

    $.ajax({
        url: "/Action/ProcessBackendAction.ashx?ActionObject=VIPCustomers&action=Del_VIPCustomers&IDCustomers=" + IDCustomers,
        type: "POST",
        dataType: "json",
        data: $("#frmUpd_VIPCustomers").serialize(),
        success: function (data) {
            if ((data.status == "success")) {

                $(".flexgripVIPCustomers").flexReload();
                showMessageBox("Xóa thành công");
                return;

            }
            else {
                showMessageBox("Xóa VIPCustomers lỗi: <font style='font-size:9px'>" + data.message + "</font>");
                return;
            }
        },
        error: function (ex) {
        }
    });
}

