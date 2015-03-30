var SystemUsersBO = {
    Ins: function ()
    {
        //  ShowLoading("#frmIns_SystemUsers");
        $.ajax({
            url: "/Action/ProcessBackendAction.ashx?ActionObject=SystemUsers&action=Ins",
            type: "POST",
            dataType: "json",
            data: $("#frmIns_SystemUsers").serialize(),

            success: function (data) {
                if (data.status == "success") {
                    $(".flexgripSystemUsers").flexReload();
                    showMessageBox("Thêm SystemUsers thành công.");

                }
                else if (data.status != "success") {
                    showMessageBox("Thêm SystemUsers lỗi: <font style='font-size:9px'>" + data.message + "</font>");

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
            url: "/Action/ProcessBackendAction.ashx?ActionObject=SystemUsers&action=Upd&ID=" + ID,
            type: "POST",
            dataType: "json",
            data: $("#frmUpd_SystemUsers").serialize(),
            success: function (data) {
                if (data.status == "success") {
                    $(".flexgripSystemUsers").flexReload();
                    showMessageBox("Update SystemUsers thành công.");

                }
                else if (data.status != "success") {
                    showMessageBox("Update SystemUsers lỗi: <font style='font-size:9px'>" + data.message + "</font>");

                }
            },
            error: function (ex) {
            }
        });
    },
    Del: function (ID)
    {
        $.ajax({
            url: "/Action/ProcessBackendAction.ashx?ActionObject=SystemUsers&action=Del&ID=" + ID,
            type: "POST",
            dataType: "json",
            data: $("#frmUpd_SystemUsers").serialize(),
            success: function (data) {
                if (data.status == "success") {
                    $(".flexgripSystemUsers").flexReload();
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
    SendMail: function (IDForm)
    {
        //EnableLoading();
        $.ajax({
            url: "/Action/ProcessFrontendAction.ashx?ActionObject=SystemUsers&action=SendMail",
            type: "POST",
            dataType: "json",

            data: $(IDForm).serialize(),

            success: function (data) {
                if (data.status == "success") {
                
                    alert("Gửi đăng kí thành công.");
                    //DisableLoading();

                }
                else if (data.status != "success") {
                    alert("Gửi đăng kí lỗi: <font style='font-size:9px'>" + data.message + "</font>");
                    //DisableLoading();
                }
            },
            complete: function (data) {

            },

            error: function (ex) {
            }
        });
    }
}
