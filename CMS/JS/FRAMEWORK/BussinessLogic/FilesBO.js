
var FilesBO = {
    LoadListFile_ByCodeAlbum: function (CodeAlbum, Type ,TitleLenght, IntroLenght, Limit, Order, IsDesc) {

        var ret;
        jQuery.ajax({
            url: "/Action/ProcessFrontendAction.ashx?ActionObject=Files&action=Sel_File_ByCodeAlbum&CodeAlbum=" + CodeAlbum + "&Limit=" + Limit + "&IsDesc=" + IsDesc + "&Order=" + Order,
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
    },
    LoadListFile_ByCodeContents: function (CodeContents, Limit, Order, IsDesc) {

        var ret;
        jQuery.ajax({
            url: "/Action/ProcessFrontendAction.ashx?ActionObject=Files&action=Sel_File_ByCodeContents&CodeContents=" + CodeContents + "&Limit=" + Limit + "&IsDesc=" + IsDesc + "&Order=" + Order,
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
    },
    // insert files
    Ins: function ()
    {
        //  ShowLoading("#frmIns_Files");
        $.ajax({
            url: "/Action/ProcessBackendAction.ashx?ActionObject=Files&action=Ins",
            type: "POST",
            dataType: "json",
            data: $("#frmIns_Files").serialize(),

            success: function (data) {
                if (data.status == "success") {
                   // $(".flexgripFiles").flexReload();
                    alert("Thêm file thành công.");

                }
                else if (data.status != "success") {
                    alert("Thêm Files lỗi: <font style='font-size:9px'>" + data.message + "</font>");

                }
            },
            error: function (ex) {
            }
        });
    },
    Upd: function (ID)
    {
        $.ajax({
            url: "/Action/ProcessBackendAction.ashx?ActionObject=Files&action=Upd&IDFiles=" + ID,
            type: "POST",
            dataType: "json",
            data: $("#frmUpd_Files").serialize(),
            success: function (data) {
                if (data.status == "success") {
                    //$(".flexgripFiles").flexReload();
                    alert("Update Files thành công.");

                }
                else if (data.status != "success") {
                    alert("Update Files lỗi: <font style='font-size:9px'>" + data.message + "</font>");

                }
            },
            error: function (ex) {
            }
        });
    },
    Del: function (ID)
    {
        $.ajax({
            url: "/Action/ProcessBackendAction.ashx?ActionObject=Files&action=Del&IDFiles=" + ID,
            type: "POST",
            dataType: "json",
            data: $("#frmUpd_Files").serialize(),
            success: function (data) {
                if (data.status == "success") {
                   // $(".flexgripFiles").flexReload();
                    alert("Delete thành công.");

                }
                else if (data.status != "success") {
                    alert("Delete lỗi: <font style='font-size:9px'>" + data.message + "</font>");

                }
            },
            error: function (ex) {
            }
        });
    },
    
}

