var CustomersBO = {
    Ins: function ()
    {
        //  ShowLoading("#frmIns_Customers");
        $.ajax({
            url: "/Action/ProcessBackendAction.ashx?ActionObject=Customers&action=CMS-Ins_Customers",
            type: "POST",
            dataType: "json",
            data: $("#frmIns_Customers").serialize(),

            success: function (data) {
                if (data.status == "success") {
                    $(".flexgripCustomers").flexReload();
                    showMessageBox("Thêm Customers thành công.");

                }
                else if (data.status != "success") {
                    showMessageBox("Thêm Customers lỗi: <font style='font-size:9px'>" + data.message + "</font>");

                }
            },
            complete: function (data) {

            },

            error: function (ex) {
            }
        });
    },
    Upd: function (ID)
    {
        $.ajax({
            url: "/Action/ProcessBackendAction.ashx?ActionObject=Customers&action=CMS-Upd_Customers&IDCustomers=" + ID,
            type: "POST",
            dataType: "json",
            data: $("#frmUpd_Customers").serialize(),
            success: function (data) {
                if (data.status == "success") {
                    $(".flexgripCustomers").flexReload();
                    showMessageBox("Update Customers thành công.");

                }
                else if (data.status != "success") {
                    showMessageBox("Update Customers lỗi: <font style='font-size:9px'>" + data.message + "</font>");

                }
            },
            error: function (ex) {
            }
        });
    },
    Del: function (ID)
    {
        $.ajax({
            url: "/Action/ProcessBackendAction.ashx?ActionObject=Customers&action=CMS-Del_Customers&IDCustomers=" + ID,
            type: "POST",
            dataType: "json",
            data: $("#frmUpd_Customers").serialize(),
            success: function (data) {
                if (data.status == "success") {
                    $(".flexgripCustomers").flexReload();
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
}
