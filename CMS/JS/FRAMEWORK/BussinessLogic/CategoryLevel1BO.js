
var CategoryLevel1BO = {

    Sel_ByCodeCategoryLevel2: function (CodeCategoryLevel2, TitleLenght, IntroLenght, Limit, Order, IsDesc) {

        var ret;
        jQuery.ajax({
            url: "/Action/ProcessBackendAction.ashx?ActionObject=CategoryLevel1&action=Sel_ByCodeCategoryLevel2&CodeCategoryLevel2=" + CodeCategoryLevel2 + "&Type=NormalCategoryLevel1&TitleLenght=" + TitleLenght + "&IntroLenght=" + IntroLenght + "&Limit=" + Limit + "&IsDesc=" + IsDesc + "&Order=" + Order,
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
            url: "/Action/ProcessBackendAction.ashx?ActionObject=CategoryLevel1&action=Sel_ByCode&Code=" + Code + "&TitleLenght=" + TitleLenght + "&IntroLenght=" + IntroLenght,
            type: "POST",
            dataType: "json",
            data: "",
            success: function (data, dataStatus) {
                ret = data;
            },
            timeout: 30000,
            async: true,
            error: function (request, error) {
            }
        });
        return ret;
    },

    Sel_Ext_ByCode: function (Code, TitleLenght, IntroLenght) {
        var ret;
        jQuery.ajax({
            url: "/Action/ProcessBackendAction.ashx?ActionObject=CategoryLevel1&action=Sel_Ext_ByCode&Code=" + Code + "&TitleLenght=" + TitleLenght + "&IntroLenght=" + IntroLenght,
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

    Sel_ByLang: function ()
    {
        var ret;
        jQuery.ajax({
            url: "/Action/ProcessBackendAction.ashx?ActionObject=CategoryLevel1&action=Sel_ByIDLang" + "&IDLang=" + sys_CUR_LANG,
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

    UpdateCountView: function (CodeCategoryLevel1) {

        $.ajax({
            url: "/Action/ProcessBackendAction.ashx?ActionObject=CategoryLevel1&action=UpdateViewCount&CodeCategoryLevel1=" + CodeCategoryLevel1,
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
            url: "/Action/ProcessBackendAction.ashx?ActionObject=CategoryLevel1&action=Ins",
            type: "POST",
            dataType: "json",
            data: $("#frmIns_CategoryLevel1").serialize(),

            success: function (data) {
                if (data.status == "success") {

                    DisableLoading();

                    //ShowMessageBox("Thêm CategoryLevel1 thành công.");
                    alert("Thêm CategoryLevel1 thành công.");
                }
                else if (data.status != "success") {
                    DisableLoading();

                    alert("Thêm CategoryLevel1 lỗi: <font style='font-size:9px'>" + data.message + "</font>");

                }
            },
            error: function (ex) {
            }
        });
    },
    Upd: function (IDCategoryLevel1) {
        $.ajax({
            url: "/Action/ProcessBackendAction.ashx?ActionObject=CategoryLevel1&action=Upd&IDCategoryLevel1=" + IDCategoryLevel1,
            type: "POST",
            dataType: "json",
            data: $("#frmUpd_CategoryLevel1").serialize(),
            success: function (data) {
                if (data.status == "success") {
                    // $(".flexgripCategoryLevel1").flexReload();
                    alert("Update CategoryLevel1 thành công.");

                }
                else if (data.status != "success") {
                    alert("Update CategoryLevel1 lỗi: <font style='font-size:9px'>" + data.message + "</font>");

                }
            },
            error: function (ex) {
            }
        });
    },
    Del: function (IDCategoryLevel1) {
        $.ajax({
            url: "/Action/ProcessBackendAction.ashx?ActionObject=CategoryLevel1&action=Del&IDCategoryLevel1=" + IDCategoryLevel1,
            type: "POST",
            dataType: "json",
            data: $("#frmUpd_CategoryLevel1").serialize(),
            success: function (data) {
                if (data.status == "success") {
                    $(".flexgripCategoryLevel1").flexReload();
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
    Sel_ByKeyCodeCategoryLevel1_ByIDLang: function (KeyCodeCategoryLevel1, TitleLenght, IntroLenght) {
        var ret;
        jQuery.ajax({
            url: "/Action/ProcessBackendAction.ashx?ActionObject=CategoryLevel1&action=Sel_ByKeyCodeCategoryLevel1_ByIDLang" + "&KeyCodeCategoryLevel1=" + KeyCodeCategoryLevel1 + "&TitleLenght=" + TitleLenght + "&IntroLenght=" + IntroLenght + "&IDLang=" + sys_CUR_LANG,
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
    Sel_ByKeyCodeCategoryLevel2_ByIDLang: function (KeyCodeCategoryLevel2, TitleLenght, IntroLenght) {

        var ret;
        jQuery.ajax({
            url: "/Action/ProcessBackendAction.ashx?ActionObject=CategoryLevel1&action=Sel_ByKeyCodeCategoryLevel2_ByIDLang" + "&KeyCodeCategoryLevel2=" + KeyCodeCategoryLevel2 + "&TitleLenght=" + TitleLenght + "&IntroLenght=" + IntroLenght + "&IDLang=" + sys_CUR_LANG,
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