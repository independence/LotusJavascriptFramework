var CategoryLevel2BO = {
    LoadListCategoryLevel2_ByListCodeCategoryLevel2_001: function (TitleLenght, Limit, Order, IsDesc) {

        var ret;
        jQuery.ajax({
            url: "/Action/ProcessFrontendAction.ashx?ActionObject=CategoryLevel2&action=Sel_ByListCodeCategoryLevel2_001&Type=NormalNews&TitleLenght=" + TitleLenght + "&Limit=" + Limit + "&IsDesc=" + IsDesc + "&Order=" + Order,
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

    LoadViewAllContent_ByCodeCategoryLevel2: function (CodeCategoryLevel2, TitleLenght, Limit, Order, IsDesc) {

        var ret;
        jQuery.ajax({
            url: "/Action/ProcessFrontendAction.ashx?ActionObject=CategoryLevel2&action=SelectViewAllContent&CodeCategoryLevel2=" + CodeCategoryLevel2 + "&Limit=" + Limit + "&IsDesc=" + IsDesc + "&Order=" + Order,
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
    Ins: function ()
    {
        //  ShowLoading("#frmIns_CategoryLevel2");
        $.ajax({
            url: "/Action/ProcessBackendAction.ashx?ActionObject=CategoryLevel2&action=Ins",
            type: "POST",
            dataType: "json",
            data: $("#frmIns_CategoryLevel2").serialize(),

            success: function (data) {
                if (data.status == "success") {
                   // $(".flexgripCategoryLevel2").flexReload();
                    alert("Thêm CategoryLevel2 thành công.");

                }
                else if (data.status != "success") {
                    alert("Thêm CategoryLevel2 lỗi: <font style='font-size:9px'>" + data.message + "</font>");

                }
            },
            error: function (ex) {
            }
        });
    },
    Upd: function (ID)
    {
        $.ajax({
            url: "/Action/ProcessBackendAction.ashx?ActionObject=CategoryLevel2&action=Upd&IDCategoryLevel2=" + IDCategoryLevel2,
            type: "POST",
            dataType: "json",
            data: $("#frmUpd_CategoryLevel2").serialize(),
            success: function (data) {
                if (data.status == "success") {
                   // $(".flexgripCategoryLevel2").flexReload();
                    alert("Update CategoryLevel2 thành công.");

                }
                else if (data.status != "success") {
                    alert("Update CategoryLevel2 lỗi: <font style='font-size:9px'>" + data.message + "</font>");

                }
            },
            error: function (ex) {
            }
        });
    },
    Del: function (ID)
    {
        $.ajax({
            url: "/Action/ProcessBackendAction.ashx?ActionObject=CategoryLevel2&action=Del&IDCategoryLevel2=" + IDCategoryLevel2,
            type: "POST",
            dataType: "json",
            data: $("#frmUpd_CategoryLevel2").serialize(),
            success: function (data) {
                if (data.status == "success") {
                   // $(".flexgripCategoryLevel2").flexReload();
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
    Dis: function (ID)
    {
        $.ajax({
            url: "/Action/ProcessBackendAction.ashx?ActionObject=CategoryLevel2&action=Dis&IDCategoryLevel2=" + IDCategoryLevel2,
            type: "POST",
            dataType: "json",
            data: $("#frmUpd_CategoryLevel2").serialize(),
            success: function (data) {
                if (data.status == "success") {
                    //$(".flexgripCategoryLevel2").flexReload();
                    alert("Disable thành công.");

                }
                else if (data.status != "success") {
                    alert("Disable lỗi: <font style='font-size:9px'>" + data.message + "</font>");

                }
            },
            error: function (ex) {
            }
        });
    }
}

