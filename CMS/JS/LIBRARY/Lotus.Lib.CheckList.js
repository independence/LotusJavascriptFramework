
$(function () {

    jQuery.fn.LotusCheckList = function (options) {
        var settings = $.extend({}, { default: 0 }, options);
        var DataName = settings.DataName;
        var URL = settings.URL;
        var Title = settings.Title;
        var Col_Key = settings.Col_Key;
        var CompareValue = settings.CompareValue;
        var Div = settings.Div;

        var Data = settings.Data;
        if ((typeof (Data) === 'undefined') && (Data === null)) {
            if ((typeof (URL) === 'undefined') && (URL === null)) {
                alert("Chưa gán nguồn dữ liệu");
            }
            else {
                Data = LoadData(URL);
            }
        }
        else {


            if (settings.Data.length >= 1) {
                var shtml = "<div class='Lotus_Scrollbar'><div class='Checklistbox'>";
                shtml += "<input type='Checkbox' value='0' name='{0}[]'><label >Tất cả</label></br>".format(DataName);;
                $(settings.Data).each(function (i, item) {

                    shtml += "<input type='Checkbox' value='{0}' name='{2}[]' style='margin-right:5px;'/><label style='margin-top:-3'>{1} </label></br>".format(item.Code, item.CategoryNameLevel1, DataName);


                });
            }
            else {
                shtml += "</div></div>";
            }

            //Div_ListIDRoom
            //alert(IDTable);
            $(Div).html(shtml);

            //alert(JSON.stringify(settings.Data));

        }



    }

});

function LoadData(url) {

    alert(url);
}
