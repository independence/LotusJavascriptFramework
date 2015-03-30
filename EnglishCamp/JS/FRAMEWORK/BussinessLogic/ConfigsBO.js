var ConfigsBO = {
    Sel_ByAccessKey: function (AccessKey) {
      
        var ret;
        jQuery.ajax({
            url: "/Action/ProcessFrontendAction.ashx?ActionObject=Configs&action=Sel_ByAccessKey&AccessKey=" + AccessKey ,
            type: "POST",
            dataType: "json",
            data: "",
            success: function (data, dataStatus) {
                ret = data;
            },
            timeout: 30000,
            async: false,
            error: function (request, error) {
            }
        });
        return ret;
    }
}