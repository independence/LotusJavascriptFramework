
var sys_NUM_LANG = "";
var sys_CUR_LANG = "";
var sys_DEF_LANG = "";

var sys_LIST_IDLANG = "";
var sys_CURRENT_USER = "";
var sys_DEF_LANG = "";
var sys_DATA_LANG_STATIC = "";
    
var sys_DATA_LANG = "";

//-------------------------------------------------------

function Init_System_CMS() {
    
    sys_LoadStaticDataLanguage();
    sys_LoadDynamicDataLanguage("Main");
    //sys_NUMLANG = jQuery("#txtNumLang").val();
    //sys_CUR_LANG = jQuery("#txtCurLang").val();
    //sys_DEF_LANG = jQuery("#txtDefLang").val();
    //sys_CURRENT_USER = jQuery("#txtCurrentUser").val();
    //sys_LIST_IDLANG = jQuery("#txtList_IDLang").val();
    //sys_DATA_LANG = JSON.parse(jQuery("#txtLANG_DATA").val());  //convert chuoi Json thanh Object Javascript

}

var sys_CommonType = {
    Path_Contents: "Contents.aspx",
    URL: "http://localhost:2338",
    URL_CMS: "http://localhost:2338",

    PathDefaultUpload: "http://localhost:2338/Uploads/",
    PathDefaultUploadThumb: "http://localhost:2338/Uploads/thumb_"

}

function sys_LoadPage(filename, data) {


    if (filename.toLowerCase().indexOf("lst") >= 0) {
        $("#PageContent").load('../../Templates/' + filename, function () {
            // $("#PageContent").processTemplate();
        });
    }
    else if (filename.toLowerCase().indexOf("ins") >= 0 ) {
        $("#PageContent").setTemplateURL('../../Templates/' + filename);
        $("#PageContent").processTemplate();
    }
    else if (filename.toLowerCase().indexOf("upd") >= 0) {
        $("#PageContent").setTemplateURL('../../Templates/' + filename);
        $("#PageContent").processTemplate(data);
    }
    else {
        alert("Bạn đặt tên file không đúng nguyên tắc");
    }
    //var html = $("#PageContent").html();

    //$("#PageContent").setTemplateURL('../../Templates/' + filename);
    //$("#PageContent").setParam('NumLang', sys_NUMLANG);
    //$("#PageContent").setParam('Lang', sys_CUR_LANG);
    //$("#PageContent").processTemplate();
   
    //$("#PageContent").setTemplateURL('../../Templates/' + filename);
    //$("#PageContent").setParam('NumLang', sys_NUMLANG); //sys_NumLang : trong file SystemConfig.js
    //$("#PageContent").setParam('Lang', sys_CUR_LANG);
    //$("#PageContent").processTemplate();

    //$("#PageContent").setTemplateURL('../../Templates/' + filename);
    //$("#PageContent").processTemplate();
}

   