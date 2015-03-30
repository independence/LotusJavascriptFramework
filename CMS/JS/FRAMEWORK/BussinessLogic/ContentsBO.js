
var ContentsBO = {

    Sel_ByCodeCategoryLevel1: function (CodeCategoryLevel1, TitleLenght, IntroLenght, Limit, Order, IsDesc) {

        var ret;
        jQuery.ajax({
            url: "/Action/ProcessBackendAction.ashx?ActionObject=Contents&action=Sel_ByCodeCategoryLevel1&CodeCategoryLevel1=" + CodeCategoryLevel1 + "&Type=NormalContents&TitleLenght=" + TitleLenght + "&IntroLenght=" + IntroLenght + "&Limit=" + Limit + "&IsDesc=" + IsDesc + "&Order=" + Order,
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

    Sel_ByCodeCategoryLevel1_001: function (TitleLenght, IntroLenght, Limit, Order, IsDesc) {

        var ret;
        jQuery.ajax({
            url: "/Action/ProcessBackendAction.ashx?ActionObject=Contents&action=Sel_ByCodeCategoryLevel1_001&Type=NormalContents&TitleLenght=" + TitleLenght + "&IntroLenght=" + IntroLenght + "&Limit=" + Limit + "&IsDesc=" + IsDesc + "&Order=" + Order,
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

    Sel_ByCode: function (Code, TitleLenght, IntroLenght) {
        var ret;
        jQuery.ajax({
            url: "/Action/ProcessBackendAction.ashx?ActionObject=Contents&action=Sel_ByCode&Code=" + Code + "&TitleLenght=" + TitleLenght + "&IntroLenght=" + IntroLenght,
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

    Sel_ByCode_001: function (TitleLenght, IntroLenght) {
        var ret;
        jQuery.ajax({
            url: "/Action/ProcessBackendAction.ashx?ActionObject=Contents&action=Sel_ByCode_001" + "&TitleLenght=" + TitleLenght + "&IntroLenght=" + IntroLenght,
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

    UpdateCountView: function (CodeContents) {

        $.ajax({
            url: "/Action/ProcessBackendAction.ashx?ActionObject=Contents&action=UpdateViewCount&CodeContents=" + CodeContents,
            type: "POST",
            dataType: "json",
            data: "",

            success: function (data) {

            },
            error: function (ex) {
            }
        });
    },
    Ins: function () {
        EnableLoading();
        $.ajax({
            url: "/Action/ProcessBackendAction.ashx?ActionObject=Contents&action=Ins",
            type: "POST",
            dataType: "json",
            data: $("#frmIns_Contents").serialize(),

            success: function (data) {
                if (data.status == "success") {

                    DisableLoading();

                    //ShowMessageBox("Thêm Contents thành công.");
                    alert("Thêm Contents thành công.");
                }
                else if (data.status != "success") {
                    DisableLoading();

                    alert("Thêm Contents lỗi: <font style='font-size:9px'>" + data.message + "</font>");

                }
            },
            error: function (ex) {
            }
        });
    },
    Upd_ByCode: function (IDContents) {
        $.ajax({
            url: "/Action/ProcessBackendAction.ashx?ActionObject=Contents&action=Upd_ByCode",
            type: "POST",
            dataType: "json",
            data: $("#frmUpd_Contents").serialize(),
            success: function (data) {
                if (data.status == "success") {
                    // $(".flexgripContents").flexReload();
                    alert("Update Contents thành công.");

                }
                else if (data.status != "success") {
                    alert("Update Contents lỗi: <font style='font-size:9px'>" + data.message + "</font>");

                }
            },
            error: function (ex) {
            }
        });
    },
    Del_ByCode: function (Key) {
        $.ajax({
            url: "/Action/ProcessBackendAction.ashx?ActionObject=Contents&action=Del_ByCode&Code=" + Key,
            type: "POST",
            dataType: "json",
            data: $("#frmUpd_Contents").serialize(),
            success: function (data) {
                if (data.status == "success") {
                    //$(".flexgripContents").flexReload();
                    showMessageBox("Delete thành công.");

                }
                else if (data.status != "success") {
                    showMessageBox("Delete lỗi: <font style='font-size:9px'>" + data.message + "</font>");

                }
            },
            error: function (ex) {
            }
        });
    },

    //#############################################################################
    // NgocBM
    Sel_ByKeyCodeContent_ByIDLang: function (KeyCodeContent, TitleLenght, IntroLenght) {
        var ret;
        jQuery.ajax({
            url: "/Action/ProcessBackendAction.ashx?ActionObject=Contents&action=Sel_ByKeyCodeContent_ByIDLang" + "&KeyCodeContent=" + KeyCodeContent + "&TitleLenght=" + TitleLenght + "&IntroLenght=" + IntroLenght + "&IDLang=" + sys_CUR_LANG,
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
    //#############################################################################
    Sel_ByKeyCodeCategoryLevel1_ByIDLang: function (KeyCodeCategoryLevel1, TitleLenght, IntroLenght) {

        var ret;
        jQuery.ajax({
            url: "/Action/ProcessBackendAction.ashx?ActionObject=Contents&action=Sel_ByKeyCodeCategoryLevel1_ByIDLang" + "&KeyCodeCategoryLevel1=" + KeyCodeCategoryLevel1 + "&TitleLenght=" + TitleLenght + "&IntroLenght=" + IntroLenght + "&IDLang=" + sys_CUR_LANG,
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
    //#############################################################################
}

