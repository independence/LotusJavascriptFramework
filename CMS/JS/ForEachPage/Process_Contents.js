//######################################################################################
function Init_LotusTable() {
    //oTable.fnDestroy();

    InitLotusTable("#checkBll",
        {

            'url': sys_CommonType.URL_CMS + '/Action/ProcessBackendAction.ashx?ActionObject=Contents&action=Sel_ByIDLang&IDLang=' + sys_CUR_LANG,
            'Col_Key': 'Contents_Code',
            'Col_Image': 'Contents_Image',
            'Path_Image': sys_CommonType.URL_CMS + '/Action/ProcessImageServiceAction.ashx?W=60&H=60&Scale=crop&Img=',
            'pageLength': 14,

            columns: [
                        
                        { data: 'CategoryLevel1_CategoryNameLevel1'},
                        { data: 'Contents_Title' },
                        { data: 'Contents_Code' },
                        { data: 'CategoryLevel1_Code' }

            ]
        }
        );
 
    
}
// sua content

function LotusTable_EditRow(KeyRow) {
    if (KeyRow > 0) {
        var Data = ContentsBO.Sel_ByCode(KeyRow);
        

        var callbacks = $.Callbacks();
        callbacks.add(sys_LoadPage('Upd_Contents.htm', Data));
        callbacks.add(FillCategoryLevel1DataToDropdowList('#Div_CategoryLevel1', KeyRow));
        callbacks.add(Init_Dialog_Upd());
        callbacks.fire();

    }
}
function LotusTable_AddRow() {
    // Đưa các hàm cần gọi vào hàm callback để các hàm chạy theo thứ tự lần lượt thay vì settimeout không có lợi
    var callbacks = $.Callbacks();
    callbacks.add(sys_LoadPage('Ins_Contents.htm'));
    callbacks.add(FillCategoryLevel1DataToDropdowList('#Div_CategoryLevel1'));
    callbacks.add(Init_Dialog_Ins());
    callbacks.fire();
}
function LotusTable_RemoveRow(Key) {

    var conf = confirm('Bạn có chắc muốn xóa record này không ?');
    if (conf) {

        Del_ByCode(Key);
    }
  
}
function LotusTable_RemoveSelectedRows(ListIDRow) {

    var conf = confirm('Bạn có chắc muốn xóa những record này không ?');
    if (conf) {
        //Del_Albums(IDRow);
        alert("LotusTable_RemoveSelectedRows : " + ListIDRow);
    }

}
//######################################################################################

function Init_Dialog_Ins(divCategoryLevel1) {
    
    $('#divtabs').LotusTabs();
    $('select, .check, .check :checkbox, input:radio, input:file').uniform();
    $('.txtInfo').LotusEditor();  // Active Text editer
    $("#txtDateCreated").datepicker1({
        defaultDate: +7,
        showOtherMonths: true,
        autoSize: true,
        appendText: '(dd-mm-yyyy)',
        dateFormat: 'dd-mm-yy'
    });


    //Change_Multi_TextareaToTinyMCE(".txt_Info");

    //setTimeout('Change_Multi_TextareaToTinyMCE(".txt_Info");', 3000);

    //setTimeout('$("#txt_ExpireDate").datepicker({ dateFormat: "dd/mm/yy" });',1000);
    //setTimeout('$("#txt_PublishDate").datepicker({ dateFormat: "dd/mm/yy" });', 1000);
    //FillCategoryLevel1DataToDropdowList(divCategoryLevel1);
    //FillAlbumDataToDropdowList(divAlbums);
}
function Init_Dialog_Upd(IDCode) {

    $('#divtabs').LotusTabs();
    $('select, .check, .check :checkbox, input:radio, input:file').uniform();
    $('.txtInfo').LotusEditor();  // Active Text editer
    
}

/*
function Init_Dialog_Upd(divCategoryLevel1, divAlbums, divCodeCategoryLevel1, divIDAlbums) {
    
    setTimeout('$("#tabs").tabs();', 1000);
    setTimeout('Change_Multi_TextareaToTinyMCE(".txt_Info");', 2000);
    setTimeout('$("#txt_ExpireDate").datepicker({ dateFormat: "dd/mm/yy" });', 1000);
    setTimeout('$("#txt_PublishDate").datepicker({ dateFormat: "dd/mm/yy" });', 1000);
    var CodeCategoryLevel1 = $(divCodeCategoryLevel1).val();
    var IDAlbums = $(divIDAlbums).val();

    FillCategoryLevel1DataToDropdowList(divCategoryLevel1, CodeCategoryLevel1);
    FillAlbumDataToDropdowList(divAlbums, IDAlbums);
}
*/
/*======================================================================================*/
function FillCategoryLevel2ToDropdowList_Filter(div, FocusCode) {
    if (1 > 0) {
        jQuery.ajax({
            url: "/Action/ProcessBackendAction.ashx?ActionObject=CategoryLevel2&action=Sel_ByIDLang",
            type: "POST",
            dataType: "json",
            data: "",
            success: function (data, dataStatus) {
                shtml = "<select id='txt_CategoryLevel2_Filter' name='txt_CategoryLevel2_Filter' style='width:200px'  onchange=\"FillCategoryLevel1ToDropdowList_Filter(\'#div_Cat1_Filter\');\">";
                if (data.CategoryLevel2_Group.length >= 1) {
                    //alert(FocusCode);
                    $(data.CategoryLevel2_Group).each(function (i, item) {
                        if (item.Code == FocusCode) {

                            shtml += "<option value='{0}' selected='selected'>{1}</option>".format(item.Code, item.Code);
                        }
                        else {
                            shtml += "<option value='{0}' >{1}</option>".format(item.Code, item.CategoryNameLevel2, item.Code);
                        }
                    });

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
function FillCategoryLevel1ToDropdowList_Filter(div, FocusCode) {

    var CodeCategoryLevel2 = $("#txt_CategoryLevel2_Filter").val();
    
    if (1 > 0) {
        jQuery.ajax({
            url: "/Action/ProcessBackendAction.ashx?ActionObject=CategoryLevel1&action=Sel_ByCodeCategoryLevel2&CategoryLevel2=" + CodeCategoryLevel2,
            type: "POST",
            dataType: "json",
            data: "",
            success: function (data, dataStatus) {
                shtml = "<select id='txt_CategoryLevel1_Filter' name='txt_CategoryLevel1_Filter' style='width:200px'  onchange=\"ReloadFlexgrid();\" >";
                if (data.CategoryLevel1_Group.length >= 1) {
                    //alert(FocusCode);
                    $(data.CategoryLevel1_Group).each(function (i, item) {
                        if (item.Code == FocusCode) {

                            shtml += "<option value='{0}' selected='selected'>{1}</option>".format(item.Code, item.CategoryNameLevel1);
                        }
                        else {
                            shtml += "<option value='{0}'>{1}</option>".format(item.Code, item.CategoryNameLevel1);
                        }
                    });

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

/*======================================================================================*/
function FillCategoryLevel1DataToDropdowList(div, CodeCategoryLevel1)
{
    var data = CategoryLevel1BO.Sel_ByLang();
    var Focus = Contents_CategoryLevel1BO.Sel_ByCodeContents_ByIDLang(CodeCategoryLevel1, sys_CUR_LANG);

    $(div).LotusCheckList({
        'Div': div,
        'DataName':'ckbCodeCategoryLevel1',
        'Data': data.data,
        'Col_Title': 'CategoryNameLevel1',
        'Col_Key': 'Code',
        'Col_Image': 'Image',
        'Path_Image': sys_CommonType.URL + '/Action/ProcessImageServiceAction.ashx?W=60&H=60&Scale=crop&Img=',
        'PageLength': 14,

        'Focus': Focus.data,
        'KeyFocus': 'CodeCategoryLevel1'

    });
    
}
/*======================================================================================*/
function FillAlbumDataToDropdowList(div, FocusID) {
    if (1 > 0) {
        jQuery.ajax({
            url: "/Action/ProcessBackendAction.ashx?ActionObject=CategoryLevel1&action=Sel_ByIDLang&IDLang=" + sys_CUR_LANG,
            type: "POST",
            dataType: "json",
            data: "",
            success: function (data, dataStatus) {
               
            },
            timeout: 3000,
            error: function (request, error) {
            }
        });
    }
}
/*======================================================================================*/
function Ins() {

    ContentsBO.Ins();
}
/*############################################################################*/

function OpenDialog_Upd_Contents(IDContents) {
    var title = "";
    var width = 1200;
    var height = 1350;
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

// Khoi 
function Fill_Contents_Dialog_Upd(IDContents) {
    if (IDContents > 0) {
        jQuery.ajax({
            url: "/Action/ProcessBackendAction.ashx?ActionObject=Contents&action=Sel_ByCode&IDContents=" + IDContents,
            type: "POST",
            dataType: "json",
            data: "",
            success: function (data, dataStatus) {

                $("#PositionShowDialog").setTemplateURL('../../Templates/Upd_Contents.htm');
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

function Upd_ByCode() {
    ContentsBO.Upd_ByCode();
}


function Del_ByCode(Code) {
    ContentsBO.Del_ByCode(Code);
}

