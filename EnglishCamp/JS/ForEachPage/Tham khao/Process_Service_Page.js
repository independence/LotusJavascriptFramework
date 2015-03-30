
function LoadFormSearchRooms() {
    $("#MainContent").html("");
    $("#MainContent").setTemplateURL('../../Template/Content_Service_BookingRooms.htm');
    $("#MainContent").setParam('Lang', sys_Lang);
    $("#MainContent").processTemplate();
 

    $("#txt_CheckInPlan").datepicker({
        dateFormat: 'dd/mm/yy',
        defaultDate: "+1w",
        changeMonth: true,
        numberOfMonths: 1,
        onClose: function (selectedDate) {
            $("#txt_CheckOutPlan").datepicker("option", "minDate", selectedDate);
        }
    });
    $("#txt_CheckOutPlan").datepicker({
        dateFormat: 'dd/mm/yy',
        defaultDate: "+1w",
        changeMonth: true,
        numberOfMonths: 1,
        onClose: function (selectedDate) {
            $("#txt_CheckOutPlan").datepicker("option", "minDate", selectedDate);
        }
    });

}
function LoadFormSearchHalls() {

    $("#MainContent").setTemplateURL('../../Template/Content_Service_BookingHalls.htm');
    $("#MainContent").setParam('Lang', sys_Lang);
    $("#MainContent").processTemplate();
 
  
    $("#txt_Date").LunarDatepicker({
       dateFormat: 'dd/mm/yy' ,
       DivLunar: '#txt_LunarDate' 
    });

    $('#txt_Start').timepicker({
 
        showLeadingZero: true,
        onHourShow: tpStartOnHourShowCallback,
        onMinuteShow: tpStartOnMinuteShowCallback
    });

    $('#txt_End').timepicker({

        showLeadingZero: true,
        onHourShow: tpEndOnHourShowCallback,
        onMinuteShow: tpEndOnMinuteShowCallback
    });
}


//SearchAvaiableRoom
function SearchAvaiableRooms(div) {

    var HTML = "{#foreach $T.Rooms as aRooms}";


        HTML = HTML + "<li class='items clearfix' onclick='OpenFormBookingAndProcess(1,{$T.aRooms.Code},\"{$T.aRooms.Sku}\",{$T.aRooms.Type},{$T.aRooms.CostRef},\"{$T.aRooms.CostUnit}\",\"" + $('#txt_CheckInPlan').val() + "\",\"" + $('#txt_CheckOutPlan').val()  + "\",0);'>";
    
        HTML = HTML + " {#if $T.aRooms.Image != ''} <div class='imgs'><img src='" + sys_CommonType.PathImageThumb_Room + "{$T.aRooms.Image}' width='95' height='95' alt='' /></div> ";
        HTML = HTML + " {#elseif $T.aRooms.Image == ''} <div class='imgs'><img src='" + sys_CommonType.PathImageThumb_Room + "NoImage.jpg' width='95' height='95' alt='' /></div>{#/if} ";
        HTML = HTML + "<div class='droom'>";
        HTML = HTML + " {#if $T.aRooms.Type == 1} <div class='droomin'><span>" + sys_CommonType.RoomType_1 + "</span> <p>{$T.aRooms.Sku}</p></div> ";
        HTML = HTML + " {#elseif $T.aRooms.Type == 2} <div class='droomin'><span>" + sys_CommonType.RoomType_2 + "</span><p>{$T.aRooms.Sku}</p></div> ";
        HTML = HTML + " {#elseif $T.aRooms.Type == 3} <div class='droomin'><span>" + sys_CommonType.RoomType_3 + "</span><p>{$T.aRooms.Sku}</p></div> ";
        HTML = HTML + " {#else} <div class='droomin'><span>Undefine</span></div>{#/if} ";

        HTML= HTML+ "   </div>";
        HTML= HTML+ "    <div class='room-text'>";
        HTML = HTML + "    <ul>";

        HTML = HTML + "      <li><a href='#'>{$P.Lang[49].Text} {$T.aRooms.CostRef} ({$T.aRooms.CostUnit}) </a></li>";
        HTML = HTML + "      <li><a href='#'>{$P.Lang[50].Text} {$T.aRooms.Bed2} {$P.Lang[52].Text} </a></li>";
        HTML = HTML + "      <li><a href='#'>{$P.Lang[51].Text} {$T.aRooms.Bed1} {$P.Lang[52].Text} </a></li>";


        HTML= HTML+ "    </ul>";
        HTML= HTML+ "   </div>";
        HTML = HTML + "</li>";
        HTML = HTML + "{#/for}";


        $.ajax({
            url: "/Action/ProcessFrontendAction.ashx?ActionObject=Rooms&action=WEB-Sel_all_avaiable_rooms&from={0}&to={1}&roomtype={2}".format(encodeURIComponent($('#txt_CheckInPlan').val()), encodeURIComponent($('#txt_CheckOutPlan').val()), $('#txt_RoomType').val()),
            type: "POST",
            dataType: "json",
            // data: $("#frmSearchRooms").serialize(),
            success: function (data) {

                if (data.Rooms.length > 0) {
                    $(div).setTemplate(HTML);
                    $(div).attr('style', 'display:none');
                    
                    $(div).setParam('NumLang', sys_NumLang); //sys_NumLang : trong file SystemConfig.js
                    $(div).setParam('Lang', sys_Lang);

                    $(div).processTemplate(data);

                    options = { percent: 100 };
                    $(div).toggle('drop', options, 1000);
                    ChangeMenu_Scrollbar('#ListItemCrollbar', '360px');

                }
                else {

                    $(div).html("<span id='ErrorMessage_NoRoom' >" + sys_Lang[58].Text + "</span>");
                }
            },
            error: function (ex) {
            }
        });
        
    }

    //=================================================
    //SearchAvaiableHalls
    function SearchAvaiableHalls(div) {


        var Hour_Start = parseInt($('#txt_Start').timepicker('getHour')) - 2;
        var Minute_Start = parseInt($('#txt_Start').timepicker('getMinute'));

        var Hour_End = parseInt($('#txt_End').timepicker('getHour')) + 2;
        var Minute_End = parseInt($('#txt_End').timepicker('getMinute'));

        if (Hour_Start < 0) {
            Hour_Start = 0;
        }
        if (Hour_End > 24) {
            Hour_End = 24;
        }
        
        if (Hour_Start <10 ) {
            Hour_Start = "0" + String(Hour_Start) ;
        }
        if (Hour_End < 10) {
            Hour_End = "0" + Hour_End;
        }
        if (Minute_Start < 10) {
            Minute_Start = "0" + String(Minute_Start);
        }
        if (Minute_End < 10) {
            Minute_End = "0" + String(Minute_End);
        }


        var from = $('#txt_Date').val() + " " + Hour_Start + ":" + Minute_Start;
        var to = $('#txt_Date').val() + " " + Hour_End + ":" + Minute_End;
        var LunaDate = $('#txt_LunarDate').val();
   
        var HTML = "{#foreach $T.Halls as aHalls}";

        HTML = HTML + "<li class='items clearfix' onclick='OpenFormBookingAndProcess(2,\"{$T.aHalls.Code}\",\"{$T.aHalls.Sku}\",\"{$T.aHalls.Type}\",\"{$T.aHalls.CostRef}\",\"{$T.aHalls.CostUnit}\",\"" + from + "\",\"" + to + "\",\"" + LunaDate + "\");'>";
        
        HTML = HTML + " {#if $T.aHalls.Image != ''} <div class='imgs'><img src='" + sys_CommonType.PathImageThumb_Hall + "{$T.aHalls.Image}' width='95' height='95' alt='' /></div> ";
        HTML = HTML + " {#elseif $T.aHalls.Image == ''} <div class='imgs'><img  src='" + sys_CommonType.PathImageThumb_Hall + "NoImage.jpg' width='95' height='95' alt='' /></div>{#/if} ";
        HTML = HTML + "<div class='droom'>";
        HTML = HTML + " <div class='droomin'><span>{$T.aHalls.Sku}</span></div> ";


        HTML = HTML + "   </div>";
        HTML = HTML + "    <div class='room-text'>";
        HTML = HTML + "    <ul>";

        HTML = HTML + "      <li><a href='#'>{$P.Lang[54].Text} {$T.aHalls.TableType} {$P.Lang[53].Text}</a></li>";
        HTML = HTML + "      <li><a href='#'>{$P.Lang[55].Text} {$T.aHalls.NumTableStandard} {$P.Lang[54].Text} </a></li>";
        HTML = HTML + "      <li><a href='#'>{$P.Lang[56].Text} {$T.aHalls.NumTableMax} {$P.Lang[54].Text} </a></li>";

        HTML = HTML + "    </ul>";
        HTML = HTML + "   </div>";
        HTML = HTML + "</li>";
        HTML = HTML + "{#/for}";

        


        $.ajax({
            url: "/Action/ProcessFrontendAction.ashx?ActionObject=Halls&action=WEB-Sel_all_avaiable_halls&halltype=2&from={0}&to={1}".format(encodeURIComponent(from), encodeURIComponent(to)),
            type: "POST",
            dataType: "json",
            //data: $("#frmSearchHalls").serialize(),
            success: function (data) {

                if (data.Halls.length > 0) {
                    $(div).setTemplate(HTML);
                    $(div).attr('style', 'display:none');

                   // $(div).setParam('NumLang', sys_NumLang); //sys_NumLang : trong file SystemConfig.js
                    $(div).setParam('Lang', sys_Lang);

                    $(div).processTemplate(data);

                    ChangeMenu_Scrollbar('#ListItemCrollbar', '360px');
                    options = { percent: 100 };
                    $(div).toggle('drop', options, 1000);


                }
                else {
                    $(div).html("<span id='ErrorMessage_NoRoom' >" + sys_Lang[57].Text + "</span>");
                }
            },
            error: function (ex) {
            }
        });

    }

    //=================================================
    function OpenFormBookingAndProcess( ObjectBookingType, ObjectBookingCode, RoomSku, RoomType, Cost, CostUnit, From, To,LunaDate) {

        var name = $("#name"),
           email = $("#email"),
           mobile = $("#mobile"),
           
           allFields = $([]).add(name).add(email).add(mobile),
           tips = $(".validateTips");
           
           var Type = "";
           if (RoomType == 1) { Type = sys_CommonType.RoomType_1; }
           if (RoomType == 2) { Type = sys_CommonType.RoomType_2; }
           if (RoomType == 3) { Type = sys_CommonType.RoomType_3; }

           if (ObjectBookingType == 1) {
               var text = "Bạn đang lựa chọn phòng <b>{0}</b>, giá tham khảo thời điểm hiện tại là <b>{1} {2}/Ngày </b>".format(Type, Cost, CostUnit);
               text = text + "<br/>Ngày checkin: <b>{0}</b>, ngày checkout:  <b>{1}</b>".format(From, To);
           }
           else if (ObjectBookingType == 2) {
               var text = "Bạn đang lựa chọn hội trường <b>{0}</b>, giá tham khảo hội trường hiện tại là <b>{1} {2} </b>".format(RoomSku, Cost, CostUnit);
               text = text + "<br/>Khoảng thời gian từ : <b>{0}</b>, đến <b>{1}</b>".format(From, To);
           }

           $("#Info").html(text);

           $("#dialog-form").dialog({
               resizable: false,
               height: 420,
               width: 370,
               modal: true,
               buttons: {

                   "Giữ chỗ": function () {
                       var bValid = true;
                       allFields.removeClass("ui-state-error");
                       bValid = bValid && checkLength(name, "name", 3, 16);
                       bValid = bValid && checkLength(email, "email", 6, 80);
                       bValid = bValid && checkLength(mobile, "mobile", 5, 16);

                       bValid = bValid && checkRegexp(email, /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i, "Định dạng email chưa đúng | Email not available format");
                       bValid = bValid && checkRegexp(mobile, /^([0-9])+$/, " Chỉ nhập giá trị : 0-9 | Mobile field only allow : 0-9");
                       if (bValid) {

                           SaveBooking(ObjectBookingType, ObjectBookingCode, Cost, CostUnit, From, To, $("#name").val(), $("#email").val(), $("#mobile").val(), LunaDate);
                           
                           

                           $(this).dialog("close");
                       }
                       $("#name").val("");
                       $("#email").val("");
                       $("#mobile").val("");

                   },
                   "Đặt và thanh toán online": function () {
                       alert("Chức năng đang tạm khóa.");
                   },
                   Cancel: function () {
                       $(this).dialog("close");
                   }
               }


           });

           $("#create-user").button().click(function () {
               $("#dialog-form").dialog("open");
           });
    }
    //====================================================================
    function SaveBooking(ObjectBookingType, ObjectBookingCode, Cost, CostUnit, From, To, Name, Email, Mobile, LunaDate) {

        var RoomURLParamate = "RoomCode={0}&Cost={1}&CostUnit={2}&From={3}&To={4}".format(ObjectBookingCode, Cost, CostUnit, encodeURIComponent(From), encodeURIComponent(To));
        var HallURLParamate = "HallCode={0}&Cost={1}&CostUnit={2}&From={3}&To={4}&LunaDate={5}".format(ObjectBookingCode, Cost, CostUnit, encodeURIComponent(From), encodeURIComponent(To), encodeURIComponent(LunaDate));
        
        var CustomerURLParamate = "Name={0}&Email={1}&Mobile={2}".format(Name, Email, Mobile);
        var UrlProcess;
        var FormProcess;

        if (ObjectBookingType == 1) {
            UrlProcess = "/Action/ProcessFrontendAction.ashx?ActionObject=BookingRooms&action=WEB-BookingRoom_ByCustomer_Frontend&{0}&{1}".format(RoomURLParamate, CustomerURLParamate);
            FormProcess = "#frmSearchRooms";
        }
        else if (ObjectBookingType == 2) {
            UrlProcess = "/Action/ProcessFrontendAction.ashx?ActionObject=BookingHalls&action=WEB-BookingHalls_ByCustomer_Frontend&{0}&{1}".format(HallURLParamate, CustomerURLParamate);
            FormProcess = "#frmSearchHalls";
        }

        $.ajax({
            url: UrlProcess,
            type: "POST",
            dataType: "json",
            data: $(FormProcess).serialize(),
            success: function (data) {

                if (data.status == "success") {
                    showMessageBox("Chúng tôi đã lưu thông tin và sẽ liên hệ xác nhận lại với bạn trong vòng 24h.");

                }
                else if (data.status != "success") {
                    showMessageBox("Giữ phòng lỗi: <font style='font-size:9px'>" + data.message + "</font>");

                }
            },
            error: function (ex) {
            }
        });
    }


    //##################################################################################
    // Support for OpenFormBookingAndProcess
    //##################################################################################
    function updateTips(t) {
        tips.text(t).addClass("ui-state-highlight");

        setTimeout('tips.removeClass("ui-state-highlight", 1500);', 500);
    }

    function checkLength(o, n, min, max) {
        if (o.val().length > max || o.val().length < min) {
            o.addClass("ui-state-error");
            updateTips("Chiều dài của " + n + " phải từ " + min + " kí tự đến " + max + " kí tự. | " + "Length of " + n + " must be between " + min + " and " + max + ".");
            return false;
        } else {
            return true;
        }
    }
    function checkRegexp(o, regexp, n) {
        if (!(regexp.test(o.val()))) {
            o.addClass("ui-state-error");
            updateTips(n);
            return false;
        } else {
            return true;
        }
    }



    //#################################################################################################
    // Support for Timepicker
    //#################################################################################################


    function tpStartOnHourShowCallback(hour) {
        var tpEndHour = $('#txt_End').timepicker('getHour');
        // all valid if no end time selected
        if ($('#txt_End').val() == '') { return true; }
        // Check if proposed hour is prior or equal to selected end time hour
        if (hour <= tpEndHour) { return true; }
        // if hour did not match, it can not be selected
        return false;
    }
    function tpStartOnMinuteShowCallback(hour, minute) {
        var tpEndHour = $('#txt_End').timepicker('getHour');
        var tpEndMinute = $('#txt_End').timepicker('getMinute');
        // all valid if no end time selected
        if ($('#txt_End').val() == '') { return true; }
        // Check if proposed hour is prior to selected end time hour
        if (hour < tpEndHour) { return true; }
        // Check if proposed hour is equal to selected end time hour and minutes is prior
        if ((hour == tpEndHour) && (minute < tpEndMinute)) { return true; }
        // if minute did not match, it can not be selected
        return false;
    }

    function tpEndOnHourShowCallback(hour) {
        var tpStartHour = $('#txt_Start').timepicker('getHour');
        // all valid if no start time selected
        if ($('#txt_Start').val() == '') { return true; }
        // Check if proposed hour is after or equal to selected start time hour
        if (hour >= tpStartHour) { return true; }
        // if hour did not match, it can not be selected
        return false;
    }
    function tpEndOnMinuteShowCallback(hour, minute) {
        var tpStartHour = $('#txt_Start').timepicker('getHour');
        var tpStartMinute = $('#txt_Start').timepicker('getMinute');
        // all valid if no start time selected
        if ($('#txt_Start').val() == '') { return true; }
        // Check if proposed hour is after selected start time hour
        if (hour > tpStartHour) { return true; }
        // Check if proposed hour is equal to selected start time hour and minutes is after
        if ((hour == tpStartHour) && (minute > tpStartMinute)) { return true; }
        // if minute did not match, it can not be selected
        return false;
    }

