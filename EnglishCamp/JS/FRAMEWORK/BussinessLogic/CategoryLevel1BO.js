
var CategoryLevel1BO = {
    LoadListCategoryLevel1_ByCodeCategoryLevel2: function (CodeCategoryLevel2, TitleLenght, IntroLenght, Limit, Order, IsDesc) {

        var ret;
        jQuery.ajax({
            url: "/Action/ProcessFrontendAction.ashx?ActionObject=CategoryLevel1&action=SelectListCategoryLevel1_ByCodeCategoryLevel2&CodeCategoryLevel2=" + CodeCategoryLevel2 + "&Type=NormalNews&TitleLenght=" + TitleLenght + "&IntroLenght=" + IntroLenght + "&Limit=" + Limit + "&IsDesc=" + IsDesc + "&Order=" + Order,
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
    LoadCategoryLevel1_ByCodeCategoryLevel2_001: function (TitleLenght, Limit,Order,IsDesc) {
   
        var ret;
        jQuery.ajax({
            url: "/Action/ProcessFrontendAction.ashx?ActionObject=CategoryLevel1&action=SelectListCategoryLevel1_ByCodeCategoryLevel2_001&Type=NormalNews&TitleLenght=" + TitleLenght +  "&Limit=" + Limit + "&IsDesc=" + IsDesc + "&Order="+Order,
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

    LoadCategoryLevel1_ByCodeCategoryLevel2_002: function (TitleLenght, Limit,Order,IsDesc) {
   
    var ret;
    jQuery.ajax({
        url: "/Action/ProcessFrontendAction.ashx?ActionObject=CategoryLevel1&action=SelectListCategoryLevel1_ByCodeCategoryLevel2_002&Type=NormalNews&TitleLenght=" + TitleLenght +  "&Limit=" + Limit + "&IsDesc=" + IsDesc + "&Order="+Order,
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

    LoadCategoryLevel1_ByCodeCategoryLevel2_003: function (TitleLenght, Limit,Order,IsDesc) {
   
        var ret;
        jQuery.ajax({
            url: "/Action/ProcessFrontendAction.ashx?ActionObject=CategoryLevel1&action=SelectListCategoryLevel1_ByCodeCategoryLevel2_003&Type=NormalNews&TitleLenght=" + TitleLenght +  "&Limit=" + Limit + "&IsDesc=" + IsDesc + "&Order="+Order,
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

    LoadCategoryLevel1_ByCodeCategoryLevel2_004: function (TitleLenght, Limit,Order,IsDesc) {
   
    var ret;
    jQuery.ajax({
        url: "/Action/ProcessFrontendAction.ashx?ActionObject=CategoryLevel1&action=SelectListCategoryLevel1_ByCodeCategoryLevel2_004&Type=NormalNews&TitleLenght=" + TitleLenght +  "&Limit=" + Limit + "&IsDesc=" + IsDesc + "&Order="+Order,
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

    LoadCategoryLevel1_ByCodeCategoryLevel2_005: function (TitleLenght, Limit,Order,IsDesc) {

        var ret;
        jQuery.ajax({
            url: "/Action/ProcessFrontendAction.ashx?ActionObject=CategoryLevel1&action=SelectListCategoryLevel1_ByCodeCategoryLevel2_005&Type=NormalNews&TitleLenght=" + TitleLenght +  "&Limit=" + Limit + "&IsDesc=" + IsDesc + "&Order="+Order,
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
    LoadCategoryLevel1_ByCodeCategoryLevel2_006: function (TitleLenght, Limit,Order,IsDesc) {

    var ret;
    jQuery.ajax({
        url: "/Action/ProcessFrontendAction.ashx?ActionObject=CategoryLevel1&action=SelectListCategoryLevel1_ByCodeCategoryLevel2_006&Type=NormalNews&TitleLenght=" + TitleLenght +  "&Limit=" + Limit + "&IsDesc=" + IsDesc + "&Order="+Order,
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
    LoadCategoryLevel1_ByCodeCategoryLevel2_007: function (TitleLenght, Limit,Order,IsDesc) {

        var ret;
        jQuery.ajax({
            url: "/Action/ProcessFrontendAction.ashx?ActionObject=CategoryLevel1&action=SelectListCategoryLevel1_ByCodeCategoryLevel2_007&Type=NormalNews&TitleLenght=" + TitleLenght +  "&Limit=" + Limit + "&IsDesc=" + IsDesc + "&Order="+Order,
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
    LoadCategoryLevel1_ByCodeCategoryLevel2_008: function (TitleLenght, Limit,Order,IsDesc) {

        var ret;
        jQuery.ajax({
            url: "/Action/ProcessFrontendAction.ashx?ActionObject=CategoryLevel1&action=SelectListCategoryLevel1_ByCodeCategoryLevel2_008&Type=NormalNews&TitleLenght=" + TitleLenght +  "&Limit=" + Limit + "&IsDesc=" + IsDesc + "&Order="+Order,
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
    LoadCategoryLevel1_ByCodeCategoryLevel2_009: function (TitleLenght, Limit,Order,IsDesc) {

        var ret;
        jQuery.ajax({
            url: "/Action/ProcessFrontendAction.ashx?ActionObject=CategoryLevel1&action=SelectListCategoryLevel1_ByCodeCategoryLevel2_009&Type=NormalNews&TitleLenght=" + TitleLenght +  "&Limit=" + Limit + "&IsDesc=" + IsDesc + "&Order="+Order,
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

    LoadCategoryLevel1_ByCodeCategoryLevel2_010: function (TitleLenght, Limit,Order,IsDesc) {

    var ret;
    jQuery.ajax({
        url: "/Action/ProcessFrontendAction.ashx?ActionObject=CategoryLevel1&action=SelectListCategoryLevel1_ByCodeCategoryLevel2_010&Type=NormalNews&TitleLenght=" + TitleLenght +  "&Limit=" + Limit + "&IsDesc=" + IsDesc + "&Order="+Order,
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

   
    LoadCategoryLevel1_ByListCodeCategoryLevel2_001: function (TitleLenght, Limit, Order, IsDesc) {

        var ret;
        jQuery.ajax({
            url: "/Action/ProcessFrontendAction.ashx?ActionObject=CategoryLevel1&action=SelectListCategoryLevel1_ByListCodeCategoryLevel2_001&Type=NormalNews&TitleLenght=" + TitleLenght + "&Limit=" + Limit + "&IsDesc=" + IsDesc + "&Order=" + Order,
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

    LoadCategoryLevel1_ByListCodeCategoryLevel2_002: function (TitleLenght, Limit, Order, IsDesc) {

        var ret;
        jQuery.ajax({
            url: "/Action/ProcessFrontendAction.ashx?ActionObject=CategoryLevel1&action=SelectListCategoryLevel1_ByListCodeCategoryLevel2_002&Type=NormalNews&TitleLenght=" + TitleLenght + "&Limit=" + Limit + "&IsDesc=" + IsDesc + "&Order=" + Order,
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

    LoadCategoryLevel1_ByListCodeCategoryLevel2_003: function (TitleLenght, Limit, Order, IsDesc) {

        var ret;
        jQuery.ajax({
            url: "/Action/ProcessFrontendAction.ashx?ActionObject=CategoryLevel1&action=SelectListCategoryLevel1_ByListCodeCategoryLevel2_003&Type=NormalNews&TitleLenght=" + TitleLenght + "&Limit=" + Limit + "&IsDesc=" + IsDesc + "&Order=" + Order,
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

    LoadCategoryLevel1_ByListCodeCategoryLevel2_004: function (TitleLenght, Limit, Order, IsDesc) {

        var ret;
        jQuery.ajax({
            url: "/Action/ProcessFrontendAction.ashx?ActionObject=CategoryLevel1&action=SelectListCategoryLevel1_ByListCodeCategoryLevel2_004&Type=NormalNews&TitleLenght=" + TitleLenght + "&Limit=" + Limit + "&IsDesc=" + IsDesc + "&Order=" + Order,
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

    LoadCategoryLevel1_ByListCodeCategoryLevel2_005: function (TitleLenght, Limit, Order, IsDesc) {

        var ret;
        jQuery.ajax({
            url: "/Action/ProcessFrontendAction.ashx?ActionObject=CategoryLevel1&action=SelectListCategoryLevel1_ByListCodeCategoryLevel2_005&Type=NormalNews&TitleLenght=" + TitleLenght + "&Limit=" + Limit + "&IsDesc=" + IsDesc + "&Order=" + Order,
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
    LoadCategoryLevel1_ByListCodeCategoryLevel2_006: function (TitleLenght, Limit, Order, IsDesc) {

        var ret;
        jQuery.ajax({
            url: "/Action/ProcessFrontendAction.ashx?ActionObject=CategoryLevel1&action=SelectListCategoryLevel1_ByListCodeCategoryLevel2_006&Type=NormalNews&TitleLenght=" + TitleLenght + "&Limit=" + Limit + "&IsDesc=" + IsDesc + "&Order=" + Order,
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
    LoadCategoryLevel1_ByListCodeCategoryLevel2_007: function (TitleLenght, Limit, Order, IsDesc) {

        var ret;
        jQuery.ajax({
            url: "/Action/ProcessFrontendAction.ashx?ActionObject=CategoryLevel1&action=SelectListCategoryLevel1_ByListCodeCategoryLevel2_007&Type=NormalNews&TitleLenght=" + TitleLenght + "&Limit=" + Limit + "&IsDesc=" + IsDesc + "&Order=" + Order,
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
    LoadCategoryLevel1_ByListCodeCategoryLevel2_008: function (TitleLenght, Limit, Order, IsDesc) {

        var ret;
        jQuery.ajax({
            url: "/Action/ProcessFrontendAction.ashx?ActionObject=CategoryLevel1&action=SelectListCategoryLevel1_ByListCodeCategoryLevel2_008&Type=NormalNews&TitleLenght=" + TitleLenght + "&Limit=" + Limit + "&IsDesc=" + IsDesc + "&Order=" + Order,
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
    LoadCategoryLevel1_ByListCodeCategoryLevel2_009: function (TitleLenght, Limit, Order, IsDesc) {

        var ret;
        jQuery.ajax({
            url: "/Action/ProcessFrontendAction.ashx?ActionObject=CategoryLevel1&action=SelectListCategoryLevel1_ByListCodeCategoryLevel2_009&Type=NormalNews&TitleLenght=" + TitleLenght + "&Limit=" + Limit + "&IsDesc=" + IsDesc + "&Order=" + Order,
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

    LoadCategoryLevel1_ByListCodeCategoryLevel2_010: function (TitleLenght, Limit, Order, IsDesc) {

        var ret;
        jQuery.ajax({
            url: "/Action/ProcessFrontendAction.ashx?ActionObject=CategoryLevel1&action=SelectListCategoryLevel1_ByListCodeCategoryLevel2_010&Type=NormalNews&TitleLenght=" + TitleLenght + "&Limit=" + Limit + "&IsDesc=" + IsDesc + "&Order=" + Order,
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
    // xử lý insert
    Ins: function () {

        //  ShowLoading("#frmIns_CategoryLevel1");
        $.ajax({
            url: "/Action/ProcessBackendAction.ashx?ActionObject=CategoryLevel1&action=Ins",
            type: "POST",
            dataType: "json",
            data: $("#frmIns_CategoryLevel1").serialize(),

            success: function (data) {
                if (data.status == "success") {
                    // $(".flexgripCategoryLevel1").flexReload();
                    // showMessageBox("Thêm CategoryLevel1 thành công.");
                    alert("Thêm CategoryLevel1 thành công.");

                }
                else if (data.status != "success") {

                    //showMessageBox("Thêm CategoryLevel1 lỗi: <font style='font-size:9px'>" + data.message + "</font>");

                    alert("Thêm CategoryLevel1 lỗi: <font style='font-size:9px'>" + data.message + "</font>");
                }
            },
            error: function (ex) {
            }
        });
    },
    // xu ly update
    Upd: function (IDCategoryLevel1)
    {
        $.ajax({
            url: "/Action/ProcessBackendAction.ashx?ActionObject=CategoryLevel1&action=Upd&IDCategoryLevel1=" + IDCategoryLevel1,
            type: "POST",
            dataType: "json",
            data: $("#frmUpd_CategoryLevel1").serialize(),
            success: function (data) {
                if (data.status == "success") {
                   // $(".flexgripCategoryLevel1").flexReload();
                   // showMessageBox("Update CategoryLevel1 thành công.");

                    alert("Update CategoryLevel1 thành công.");
                }
                else if (data.status != "success") {
                    //showMessageBox("Update CategoryLevel1 lỗi: <font style='font-size:9px'>" + data.message + "</font>");

                    alert("Update CategoryLevel1 lỗi: <font style='font-size:9px'>" + data.message + "</font>");

                }
            },
            error: function (ex) {
            }
        });
    },
    // xu ly delete
    Del: function (IDCategoryLevel1)
    {
        $.ajax({
            url: "/Action/ProcessBackendAction.ashx?ActionObject=CategoryLevel1&action=Del&IDCategoryLevel1=" + IDCategoryLevel1,
            type: "POST",
            dataType: "json",
            data: $("#frmUpd_CategoryLevel1").serialize(),
            success: function (data) {
                if (data.status == "success") {
                   // $(".flexgripCategoryLevel1").flexReload();
                   // showMessageBox("Delete thành công.");
                    alert("Delete thành công.");
                }
                else if (data.status != "success") {
                   // showMessageBox("Delete lỗi: <font style='font-size:9px'>" + data.message + "</font>");
                    alert("Delete lỗi: <font style='font-size:9px'>" + data.message + "</font>");
                }
            },
            error: function (ex) {
            }
        });
    },
    // 
    Dis: function (IDCategoryLevel1)
    {
        $.ajax({
            url: "/Action/ProcessBackendAction.ashx?ActionObject=CategoryLevel1&action=Dis&IDCategoryLevel1=" + IDCategoryLevel1,
            type: "POST",
            dataType: "json",
            data: $("#frmUpd_CategoryLevel1").serialize(),
            success: function (data) {
                if (data.status == "success") {
                   // $(".flexgripCategoryLevel1").flexReload();
                    //showMessageBox("Disable thành công.");
                    alert("Disable thành công.");

                }
                else if (data.status != "success") {
                   // showMessageBox("Disable lỗi: <font style='font-size:9px'>" + data.message + "</font>");

                    alert("Disable lỗi: <font style='font-size:9px'>" + data.message + "</font>");
                }
            },
            error: function (ex) {
            }
        });
    },

}