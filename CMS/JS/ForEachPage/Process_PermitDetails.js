function Init_Dialog_Ins(div) {
    //setTimeout('$("#tabs").tabs();', 1000);
    Fill_Permit_DropdowList(div);
}


function Init_Dialog_Upd(divPermit, divPermitID) {
    //setTimeout('$("#tabs").tabs();', 1000);
    
    var PermitID = $(divPermitID).val();
    FillPermitDataToDropdowList_EditForm(divPermit, PermitID);
}


function Fill_Permit_DropdowList(div) {
    jQuery.ajax({
        url: "/Action/ProcessBackendAction.ashx?ActionObject=Permits&action=Sel_all",
        type: "POST",
        dataType: "json",
        data: "",
        async: false,
        success: function (data, dataStatus) {
            shtml = "<select id='txt_IDPermit' name='txt_IDPermit' style='width:100%'>";
            if (data.Permits.length >= 1) {
                $(data.Permits).each(function (i, item) {
                    shtml += "<option value='{0}'>ID:{1}-Name:{2}</option>".format(item.ID, item.ID, item.Name);
                });
            }
            else {
                shtml += "<option value='0'>[Chưa có thông tin]</option>";
            }
            shtml += "</select>";
            $(div).html(shtml);
        },
        timeout: 3000,
        error: function (request, error) {
        }
    });

}

function FillPermitDataToDropdowList_EditForm(div, PermitID) {
    jQuery.ajax({
        url: "/Action/ProcessBackendAction.ashx?ActionObject=Permits&action=Sel_all",
        type: "POST",
        dataType: "json",
        async: false,
        data: "",
        success: function (data, dataStatus) {
            shtml = "<select id='txt_IDPermit' name='txt_IDPermit' style='width:200px'>";
            if (data.Permits.length >= 1) {
                $(data.Permits).each(function (i, item) {
                    if (item.ID == PermitID) {
                        shtml += "<option value='{0}'selected='selected'>ID:{1}-Name:{2}</option>".format(item.ID, item.ID, item.Name);
                    }
                    else {
                        shtml += "<option value='{0}'>ID:{1}-Name:{2}</option>".format(item.ID, item.ID, item.Name);
                    }
                });
            }
            else {
                shtml += "<option value='0'>[Chưa có thông tin khách]</option>";
            }
            shtml += "</select>";
            $(div).html(shtml);

        },
        timeout: 3000,
        error: function (request, error) {
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

function OpenDialog_Ins_PermitDetails() {
    var title = "";
    var width = 810;
    var height = 500;
    if ($("#PositionShowDialog").length <= 0) {
        $("body").append('<div id="#PositionShowDialog" style="display:none; overflow-x:hidden; overflow-y:scroll;" title="' + title + '"></div>');
    }

    $("#PositionShowDialog").setTemplateURL('../../Templates/Ins_PermitDetails.htm');
    $("#PositionShowDialog").setParam('NumLang', sys_NumLang); //sys_NumLang : trong file SystemConfig.js\
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
                Ins_PermitDetails();
				
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
function Ins_PermitDetails() {
  //  ShowLoading("#frmIns_PermitDetails");
    $.ajax({
        url: "/Action/ProcessBackendAction.ashx?ActionObject=PermitDetails&action=Ins",
        type: "POST",
        dataType: "json",
        data: $("#frmIns_PermitDetails").serialize(),

        success: function (data) {
           if (data.status == "success")  {
			   $(".flexgripPermitDetails").flexReload();
                showMessageBox("Thêm PermitDetails thành công.");

            }
            else if (data.status != "success") {
                showMessageBox("Thêm PermitDetails lỗi: <font style='font-size:9px'>" + data.message + "</font>");

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

function OpenDialog_Upd_PermitDetails(IDPermitDetails) {
    var title = "";
    var width = 810;
    var height = 500;
    if ($("#PositionShowDialog").length <= 0) {
        $("body").append('<div id="PositionShowDialog" style="display:none; overflow-x:hidden; overflow-y:scroll;" title="' + title + '"></div>');
    }

    Fill_PermitDetails_Dialog_Upd(IDPermitDetails);

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
                Upd_PermitDetails(IDPermitDetails);
                
                $(this).dialog('close');
            }
        },
        close: function () {

        }
    });
}

/*======================================================================================*/
/*======================================================================================*/
function Fill_PermitDetails_Dialog_Upd(IDPermitDetails) {

    if (IDPermitDetails > 0) {
        jQuery.ajax({
            url: "/Action/ProcessBackendAction.ashx?ActionObject=PermitDetails&action=Sel&IDPermitDetails=" + IDPermitDetails,
            type: "POST",
            dataType: "json",
            data: "",
            success: function (data, dataStatus) {

                $("#PositionShowDialog").setTemplateURL('../../Templates/Upd_PermitDetails.htm');
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
function Upd_PermitDetails(IDPermitDetails) {
    $.ajax({
        url: "/Action/ProcessBackendAction.ashx?ActionObject=PermitDetails&action=Upd&IDPermitDetails=" + IDPermitDetails,
        type: "POST",
        dataType: "json",
        data: $("#frmUpd_PermitDetails").serialize(),
        success: function (data) {
           if (data.status == "success") {
                $(".flexgripPermitDetails").flexReload();
				showMessageBox("Update PermitDetails thành công.");

            }
            else if (data.status != "success") {
                showMessageBox("Update PermitDetails lỗi: <font style='font-size:9px'>" + data.message + "</font>");

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

function Del_PermitDetails(IDPermitDetails) {

    $.ajax({
        url: "/Action/ProcessBackendAction.ashx?ActionObject=PermitDetails&action=Del&IDPermitDetails=" + IDPermitDetails,
        type: "POST",
        dataType: "json",
        data: $("#frmUpd_PermitDetails").serialize(),
        success: function (data) {
           if (data.status == "success") {
                $(".flexgripPermitDetails").flexReload();
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

