
function sys_GetText(index, DefText) {
 
    for (i = 0; i < sys_DATA_LANG.length ; i++) {

        if (sys_DATA_LANG[i].Key == index) {
            return sys_DATA_LANG[i].Text;
        }
    }
    return DefText;

}

function sys_GetText_Static(index, DefText) {

    for (i = 0; i < sys_DATA_LANG_STATIC.length ; i++) {

        if (sys_DATA_LANG_STATIC[i].Key == index) {
            return sys_DATA_LANG_STATIC[i].Text;
        }
    }
    return DefText;
}

function sys_LoadStaticDataLanguage() {
   
    jQuery.ajax({
        url: "/Action/ProcessBackendAction.ashx?ActionObject=CORE&action=STATIC_DATA_LANGUAGE" ,
        type: "POST",
        dataType: "json",
        data: "",
        success: function (data, dataStatus) {
            // Luu vao bien toan cuc dung tam;

            sys_DATA_LANG_STATIC = data.DATA_LANG;
            sys_NUM_LANG = data.sys_NUM_LANG;
            sys_DEF_LANG = data.sys_DEF_LANG;
            sys_CUR_LANG = data.sys_CUR_LANG;
            sys_LIST_IDLANG = $("#txtLIST_IDLANG").val();
            sys_CURRENT_USER = $("#txtCURRENT_USER").val();

            // Luu du phong vao hidden textbox
            $("#txtNUM_LANG").val(data.sys_NUM_LANG);
            $("#txtCUR_LANG").val(data.sys_CUR_LANG);
            $("#txtDEF_LANG").val(data.sys_DEF_LANG);
           
            $("#txtDATA_LANG_STATIC").val(JSON.stringify(data.DATA_LANG));
            
            $("#txtCURRENT_USER").val();
            $("#txtLIST_IDLANG").val();



            return data;
        },
        timeout: 30000,
      
        error: function (request, error) {
            alert(error);
        }
    });

    

}

function sys_LoadDynamicDataLanguage(FileName) {
   
    jQuery.ajax({
        url: "/Action/ProcessBackendAction.ashx?ActionObject=CORE&action=DYNAMIC_DATA_LANGUAGE&filename=" + FileName,
        type: "POST",
        dataType: "json",
        data: "",
        success: function (data, dataStatus) {
       
            sys_DATA_LANG = data.DATA_LANG;
            sys_CURRENT_USER = $("#txtCURRENT_USER").val();
            sys_CUR_LANG = data.sys_CUR_LANG;

            //Luu du phong vao hidden text box
            $("#txtCUR_LANG").val(data.sys_CUR_LANG);
            $("#txtDATA_LANG").val(JSON.stringify(data.DATA_LANG));
            $("#txtCURRENT_USER").val();



            return data;
        },
        timeout: 30000,

        error: function (request, error) {
            alert(error);
        }
    });



}

