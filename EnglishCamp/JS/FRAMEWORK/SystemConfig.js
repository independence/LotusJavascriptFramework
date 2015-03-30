
var sys_NUM_LANG = "";
var sys_CUR_LANG = "";
var sys_DEF_LANG = "";

var sys_LIST_IDLANG = "";
var sys_CURRENT_USER = "";
var sys_DEF_LANG = "";
var sys_DATA_LANG_STATIC = "";

var sys_DATA_LANG = "";

function Init_System_WEB() {

    sys_LoadStaticDataLanguage();
    //sys_LoadDynamicDataLanguage("Main");

}

var sys_CommonType = {
    Path_Contents: "Contents.aspx",
    URL: "http://localhost:9565",
    URL_CMS: "http://localhost:2338",

    PathDefaultUpload: "http://localhost:2338/Uploads/",
    PathDefaultUploadThumb: "http://localhost:2338/Uploads/thumb_"
}

