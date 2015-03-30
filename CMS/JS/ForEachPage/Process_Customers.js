function Init_Dialog_Ins() {
    //setTimeout('$("#tabs").tabs();', 1000);
    //Datetime picker Jquery
    $("#txt_Birthday").datepicker({ dateFormat: 'dd/mm/yy' });
}


function Init_Dialog_Upd() {
    //setTimeout('$("#tabs").tabs();', 1000);
    $("#txt_Birthday").datepicker({ dateFormat: "dd/mm/yy" });
   
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

function OpenDialog_Ins_Customers() {
    var title = "";
    var width = 650;
    var height = 410;
    if ($("#PositionShowDialog").length <= 0) {
        $("body").append('<div id="#PositionShowDialog" style="display:none; overflow-x:hidden; overflow-y:scroll;" title="' + title + '"></div>');
    }
    $("#PositionShowDialog").setTemplateURL('../../Templates/Ins_Customers.htm');
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
                Ins_Customers();
				
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
function Ins_Customers() {
  //  ShowLoading("#frmIns_Customers");
    $.ajax({
        url: "/Action/ProcessBackendAction.ashx?ActionObject=Customers&action=CMS-Ins_Customers",
        type: "POST",
        dataType: "json",
        data: $("#frmIns_Customers").serialize(),

        success: function (data) {
           if (data.status == "success")  {
			   $(".flexgripCustomers").flexReload();
                showMessageBox("Thêm Customers thành công.");

            }
            else if (data.status != "success") {
                showMessageBox("Thêm Customers lỗi: <font style='font-size:9px'>" + data.message + "</font>");

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

function OpenDialog_Upd_Customers(IDCustomers) {
    var title = "";
    var width = 650;
    var height = 410;
    if ($("#PositionShowDialog").length <= 0) {
        $("body").append('<div id="PositionShowDialog" style="display:none; overflow-x:hidden; overflow-y:scroll;" title="' + title + '"></div>');
    }

    Fill_Customers_Dialog_Upd(IDCustomers);

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
                Upd_Customers(IDCustomers);
                
                $(this).dialog('close');
            }
        },
        close: function () {

        }
    });
}

/*======================================================================================*/
/*======================================================================================*/
function Fill_Customers_Dialog_Upd(IDCustomers) {

    if (IDCustomers > 0) {
        jQuery.ajax({
            url: "/Action/ProcessBackendAction.ashx?ActionObject=Customers&action=CMS-Sel_Customers&IDCustomers=" + IDCustomers,
            type: "POST",
            dataType: "json",
            data: "",
            success: function (data, dataStatus) {

                $("#PositionShowDialog").setTemplateURL('../../Templates/Upd_Customers.htm');
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
function Upd_Customers(IDCustomers) {
    $.ajax({
        url: "/Action/ProcessBackendAction.ashx?ActionObject=Customers&action=CMS-Upd_Customers&IDCustomers=" + IDCustomers,
        type: "POST",
        dataType: "json",
        data: $("#frmUpd_Customers").serialize(),
        success: function (data) {
           if (data.status == "success") {
                $(".flexgripCustomers").flexReload();
				showMessageBox("Update Customers thành công.");

            }
            else if (data.status != "success") {
                showMessageBox("Update Customers lỗi: <font style='font-size:9px'>" + data.message + "</font>");

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

function Del_Customers(IDCustomers) {

    $.ajax({
        url: "/Action/ProcessBackendAction.ashx?ActionObject=Customers&action=CMS-Del_Customers&IDCustomers=" + IDCustomers,
        type: "POST",
        dataType: "json",
        data: $("#frmUpd_Customers").serialize(),
        success: function (data) {
           if (data.status == "success") {
                $(".flexgripCustomers").flexReload();
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

