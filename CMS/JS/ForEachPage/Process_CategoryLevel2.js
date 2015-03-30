function Init_Dialog_Ins(divAlbums) {

    FillAlbumDataToDropdowList(divAlbums);
    $('#tab-container').easytabs({
        animationSpeed: 300,
        collapsible: false,
        tabActiveClass: "clicked"
    });
    $("select, .check, .check :checkbox, input:radio, input:file").uniform();

    //setTimeout('$("#tabs").tabs(); $("select, .check, .check :checkbox, input:radio, input:file").uniform();', 1000);
    setTimeout('Change_Multi_TextareaToTinyMCE(".txt_Info");', 2000);
    //setTimeout('Change_Multi_TextareaToTinyMCE(".txt_Info");', 2000);
}


function Init_Dialog_Upd(divAlbums, divIDAlbums) {  

    setTimeout('$("#tabs").tabs();', 1000);
    setTimeout('Change_Multi_TextareaToTinyMCE(".txt_Info");', 2000);   

    var IDAlbums = $(divIDAlbums).val();
    FillAlbumDataToDropdowList(divAlbums, IDAlbums);
    
    //setTimeout('Change_Multi_TextareaToTinyMCE(".txt_Info");', 2000);
}

function OpenDialog_Ins_CategoryLevel2() {
    var title = "";
    var width = 1200;
    var height = 900;
    //if ($("#PositionShowDialog").length <= 0) {
    //    $("body").append('<div id="#PositionShowDialog" style="display:none; overflow-x:hidden; overflow-y:scroll;" title="' + title + '"></div>');
    //}
  
    $("#content > .wrapper").setTemplateURL('../../Templates/Ins_CategoryLevel2-1.htm');

    $("#content > .wrapper").setParam('NumLang', sys_NumLang); //sys_NumLang : trong file SystemConfig.js
    $("#content > .wrapper").setParam('Lang', sys_Lang);
    $("#content > .wrapper").processTemplate();
   

    //$("#PositionShowDialog").dialog({
    //    modal: true,
    //    width: width,
    //    height: height,
    //    resizable: false,
    //    //open: setTimeout('Change_TextareaToTinyMCE_OnPopup("#txt_InfoAlbumLang1");Change_TextareaToTinyMCE_OnPopup("#txt_InfoAlbumLang2");Change_TextareaToTinyMCE_OnPopup("#txt_InfoAlbumLang3");', 2000), // Cần phải có settimeout,
        
    //    show: {
    //        effect: "clip",
    //        duration: 1000
    //    },
    //    hide: {
    //        effect: "explode",
    //        duration: 1000
    //    },

    //    buttons: {
    //        'Cancel': function () {
    //            $(this).dialog("close");
    //        },

    //        'Save': function () {
    //            Save_Multi_TinyMCE("txt_Info_Lang", sys_NumLang);
    //            Ins_CategoryLevel2();
    //            $(this).dialog("close");
    //        }
    //    },
    //    close: function () {
          
    //    }
    //});

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
function Ins_CategoryLevel2() {
  //  ShowLoading("#frmIns_CategoryLevel2");
    CategoryLevel2BO.Ins();

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

function OpenDialog_Upd_CategoryLevel2(IDCategoryLevel2) {
    var title = "";
    var width = 1200;
    var height = 900;
    if ($("#PositionShowDialog").length <= 0) {
        $("body").append('<div id="PositionShowDialog" style="display:none; overflow-x:hidden; overflow-y:scroll;" title="' + title + '"></div>');
    }   
    Fill_CategoryLevel2_Dialog_Upd(IDCategoryLevel2);    
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
                Upd_CategoryLevel2(IDCategoryLevel2);
                
                $(this).dialog('close');
            }
        },
        close: function () {

        }
    });
}

/*======================================================================================*/
/*======================================================================================*/
function Fill_CategoryLevel2_Dialog_Upd(IDCategoryLevel2) {

    if (IDCategoryLevel2 > 0) {
        jQuery.ajax({
            url: "/Action/ProcessBackendAction.ashx?ActionObject=CategoryLevel2&action=Sel_ByCode&IDCategoryLevel2=" + IDCategoryLevel2,
            type: "POST",
            dataType: "json",
            data: "",
            success: function (data, dataStatus) {

                $("#PositionShowDialog").setTemplateURL('../../Templates/Upd_CategoryLevel2.htm');
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

                    shtml += "<option value='0'>[Chọn Album tài liệu]</option>";                   
                    $(data.Albums_Group).each(function (i, item) {

                        if (item.ID == FocusID) {
                            shtml += "<option value='{0}' selected='selected'>{1}</option>".format(item.ID, item.Title);
                        }
                        else {
                            shtml += "<option value='{0}'>{1}</option>".format(item.ID, item.Title);
                        }

                    });
                }
                else {
                    shtml += "<option value='-1'>Chưa có Album</option>";
                }
                
                shtml += "</select>";

                //Div_ListIDRoom
                $(div).html(shtml);
                $("#txt_IDAlbum").uniform();
            },
            timeout: 3000,
            error: function (request, error) {
            }
        });
    }
}
/*======================================================================================*/
/*======================================================================================*/
function Upd_CategoryLevel2(IDCategoryLevel2) {
    CategoryLevel2BO.Upd(IDCategoryLevel2);

}
/*======================================================================================*/
/*======================================================================================*/

/*======================================================================================*/
/*======================================================================================*/

function Del_CategoryLevel2(IDCategoryLevel2) {

    CategoryLevel2BO.Del(IDCategoryLevel2);
}


function Dis_CategoryLevel2(IDCategoryLevel2) {

    CategoryLevel2BO.Dis(IDCategoryLevel2);
}

