




$(function () {

    jQuery.fn.LotusTable = function(options){
        var settings = $.extend({},{default:0},options);
 

        var settings = $.extend(settings, { default: 0 }, {
            
            "createdRow": function (row, data, index) {
                //alert(row);
                $('td', row).eq(0).html('<div id="uniform-undefined" class="checker"><span class=""><input type="checkbox" name="checkRow" style="opacity: 0;" ID="Key' + data[settings.Col_Key] + '\" value="' + data[settings.Col_Key] + '\"  /></span></div>');
                $('td', row).eq(1).html('<img src="' + settings.Path_Image + data[settings.Col_Image] + "\"/>");
    

                var btnHTML = "	<a href='#' class='tablectrl_small bDefault tipS' title='Edit' onclick='LotusTable_EditRow(" + data[settings.Col_Key] + ");'><span class='iconb' data-icon='&#xe1db;'></span></a>	";
                btnHTML = btnHTML + "	<a href='#' class='tablectrl_small bDefault tipS' title='Remove' onclick='LotusTable_RemoveRow(" + data[settings.Col_Key] + ");'><span class='iconb' data-icon='&#xe136;'></span></a>	";
              

                $('td', row).eq(parseInt(settings.columns.length) - 1).html(btnHTML);
               // $('td', row).eq(5).html(" <a href='#' class='tablectrl_small bDefault tipS' title='Edit'><span class='iconb' data-icon='&#xe1db;'></span></a>	 ");
            }

        });
       
        settings.columns = $.merge(settings.columns, [{ "data": "ID" }, { "data": "ID" }]);

     

        var settings = $.extend(settings, { default: 0 }, {
            "processing": true,
            "pageLength": settings.pageLength,
            "pagingType": "full_numbers",
            
            "ajax": {
                "url": settings.url,
                "dataType": "json",
                "dataSrc": "rows"
            },

            "language": {
                "decimal": ",",
                "thousands": "."
            }
        });


        //var ControlGroupBtn = '<tr><td class="ControlGroupBtn" rowspan="1" colspan="1"></td>';
        //ControlGroupBtn = ControlGroupBtn + '	<td class="ControlGroupBtn" rowspan="1" colspan="1">	';
        //ControlGroupBtn = ControlGroupBtn + '	<div class="itemActions">	';
        //ControlGroupBtn = ControlGroupBtn + '	<label>Apply action:</label>	';
        //ControlGroupBtn = ControlGroupBtn + '	<div id="uniform-undefined" class="selector">	';
        //ControlGroupBtn = ControlGroupBtn + '	<span style="-moz-user-select: none;">Select action...</span>	';
        //ControlGroupBtn = ControlGroupBtn + '	<select style="opacity: 0;">	';
        //ControlGroupBtn = ControlGroupBtn + '	<option value="">Select action...</option>	';
        //ControlGroupBtn = ControlGroupBtn + '	<option value="Edit">'+ 6+'Edit</option>	';
        //ControlGroupBtn = ControlGroupBtn + '	<option value="Delete">Delete</option>	';
        //ControlGroupBtn = ControlGroupBtn + '	<option value="Move">Move somewhere</option>	';
        //ControlGroupBtn = ControlGroupBtn + '	</select>	';
        //ControlGroupBtn = ControlGroupBtn + '	</div>	';
        //ControlGroupBtn = ControlGroupBtn + '	</div>	';
        //ControlGroupBtn = ControlGroupBtn + '	</td>	';
        //ControlGroupBtn = ControlGroupBtn + '</tr>	';

        //ControlGroupBtn = Encoder.htmlDecode(ControlGroupBtn);
        //$('tfoot').html(ControlGroupBtn);

       

        table = $('#checkAll').dataTable(settings);

        $('.ControlGroupBtn').attr("colspan", settings.columns.length);
    }


    setTimeout("aaa();", 4000);


});

function aaa()
{
    //--------------Su kien Xu ly nut bam delete multi rows -------------------------
    $("#ActionChoice").change(function () {

        if ($("#ActionChoice").val() == "Delete")
        {
            var ListID = $(".thisRow > td > div > span > input").map(function () { return $(this).val(); }).get().join(", ")  // Lay danh sach nhung ID duoc select
            LotusTable_RemoveSelectedRows(ListID);
            $("#ActionChoice").val('Default');

            var text = $("#ActionChoice > option:first-child").html(); //lay text defaut cua selector ActionChoice de gan hien thi 
            $(".ControlGroupBtn > div > div.selector >span").html(text);
        }
        
    });
    //--------------Ket thuc Su kien Xu ly nut bam delete multi rows -------------------------

    var checkedStatus = false;
    $(".titleIcon input:checkbox").click(function () {
       // alert("1-"+ checkedStatus + "-" + this.checked);
        checkedStatus = this.checked;

        if ($(this).closest(".titleIcon > div > span").hasClass("checked") == true) {
            $(this).closest(".titleIcon > div > span").removeClass('checked');
        }
        else {
            $(this).closest(".titleIcon > div > span").addClass('checked');
        }


        $("#checkAll tbody tr td:first-child input:checkbox").each(function () {
          //  alert("2-" + checkedStatus + "-" + this.checked);
            this.checked = checkedStatus;
            if (checkedStatus == this.checked) {
                $(this).closest('.checker > span').removeClass('checked');
                $(this).closest('table tbody tr').removeClass('thisRow');
                // $(this).closest('#checkAll tbody tr td:first-child input[type=checkbox]').removeAttr("checked");
            }
            if (this.checked) {
                // $(this).closest('#checkAll tbody tr td:first-child input[type=checkbox]').attr("checked","checked");
                $(this).closest('.checker > span').addClass('checked');
                $(this).closest('table tbody tr').addClass('thisRow');

            }
        });


    });

    $('#checkAll tbody tr td:first-child input[type=checkbox]').change(function () {
        $(this).closest('tr').toggleClass("thisRow", this.checked);
    });

    $('#checkAll tbody tr td:first-child .checker > span').bind("click", function () {


        if ($(this).closest('#checkAll tbody tr td:first-child .checker > span').hasClass("checked") == false) {
            $(this).closest('#checkAll tbody tr td:first-child .checker > span').addClass('checked');
            $(this).closest('#checkAll tbody tr').addClass('thisRow');

        }
        else {
            $(this).closest('#checkAll tbody tr td:first-child .checker > span').removeClass('checked');
            $(this).closest('#checkAll tbody tr').removeClass('thisRow');

        }


    });
}

