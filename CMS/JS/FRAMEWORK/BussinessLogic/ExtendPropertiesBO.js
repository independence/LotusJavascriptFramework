var ExtendPropertiesBO = {
    Ins: function ()
    {
        $.ajax({
            url: "/Action/ProcessBackendAction.ashx?ActionObject=ExtendProperties&action=CMS-Ins",
            type: "POST",
            dataType: "json",
            data: $("#frmIns_ExtendProperties").serialize(),

            success: function (data) {
                if (data.status == "success") {
                    //$(".flexgripExtendProperties").flexReload();
                    alert("Thêm ExtendProperties thành công.");

                }
                else if (data.status != "success") {
                    alert("Thêm ExtendProperties lỗi: <font style='font-size:9px'>" + data.message + "</font>");

                }
            },
            error: function (ex) {
            }
        });
    },
    Upd: function (IDExtendProperties)
    {
        $.ajax({
            url: "/Action/ProcessBackendAction.ashx?ActionObject=ExtendProperties&action=CMS-Upd&IDExtendProperties=" + IDExtendProperties,
            type: "POST",
            dataType: "json",
            data: $("#frmUpd_ExtendProperties").serialize(),
            success: function (data) {
                if (data.status == "success") {
                    $(".flexgripExtendProperties").flexReload();
                    alert("Update ExtendProperties thành công.");

                }
                else if (data.status != "success") {
                    alert("Update ExtendProperties lỗi: <font style='font-size:9px'>" + data.message + "</font>");

                }
            },
            error: function (ex) {
            }
        });
    },
    Del: function (IDExtendProperties)
    {
        $.ajax({
            url: "/Action/ProcessBackendAction.ashx?ActionObject=ExtendProperties&action=Del&IDExtendProperties=" + IDExtendProperties,
            type: "POST",
            dataType: "json",
            data: $("#frmUpd_ExtendProperties").serialize(),
            success: function (data) {
                if (data.status == "success") {
                   // $(".flexgripExtendProperties").flexReload();
                    alert("Delete thành công.");

                }
                else if (data.status != "success") {
                    alert("Delete lỗi: <font style='font-size:9px'>" + data.message + "</font>");

                }
            },
            error: function (ex) {
            }
        });
    }
}