
$(function () {

    jQuery.fn.LotusTable = function (options) {
        //CreateTable();
        
        var settings = $.extend({}, { default: 0 }, options);

        var IDTable = settings.TableDiv;

        //alert("dddd" + IDTable );
        if (settings.Col_Key == null) {
            alert("Thiếu thông tin khóa chính : Col_Key");
        }
        if (settings.Col_Image != null & settings.Path_Image == null) {
            alert("Thiếu thông tin đường dẫn ảnh : Path_Image");
        }

        var settings = $.extend(settings, { default: 0 }, {

            "createdRow": function (row, data, index) {
          
                if (settings.Col_Key != null) {
                    $('td', row).eq(0).html('<div id="uniform-undefined" class="checker"><span class=""><input type="checkbox" name="checkRow" style="opacity: 0;" ID="Key' + data[settings.Col_Key] + '\" value="' + data[settings.Col_Key] + '\"  /></span></div>');
                    if (settings.Col_Image != null) {
                        if (settings.Path_Image != null) {
                            $('td', row).eq(1).html('<img src="' + settings.Path_Image + data[settings.Col_Image] + "\"/>");
                        }
                    }

                    var btnHTML = "	<a  class='tablectrl_small bDefault tipS' title='Edit' onclick='LotusTable_EditRow(" + data[settings.Col_Key] + ");'><span class='iconb' data-icon='&#xe1db;'></span></a>	";
                    btnHTML = btnHTML + "	<a  class='tablectrl_small bDefault tipS' title='Remove' onclick='LotusTable_RemoveRow(" + data[settings.Col_Key] + ");'><span class='iconb' data-icon='&#xe136;'></span></a>	";

                    $('td', row).eq(parseInt(settings.columns.length) - 1).html(btnHTML);
                    // $('td', row).eq(5).html(" <a href='#' class='tablectrl_small bDefault tipS' title='Edit'><span class='iconb' data-icon='&#xe1db;'></span></a>	 ");
                }
                
            }

        });

        settings.columns = $.merge([{ "data": settings.Col_Key }], settings.columns);
        if (settings.Col_Image != null) {
            settings.columns = $.merge([{ "data": settings.Col_Image }], settings.columns);
        }
        settings.columns = $.merge(settings.columns, [{ "data": settings.Col_Key }]);

   

        var settings = $.extend(settings, { default: 0 }, {
            "processing": true,
            "pageLength": settings.pageLength,
            "pagingType": "full_numbers",

            "ajax": {
                "url": settings.url,
                "dataType": "json"
                //"dataSrc": "data" // data|rows  Rat quan trong dat sai bao loi :aData is undefined 
            },

            "language": {
                "decimal": ",",
                "thousands": "."
            }
        });

        
        table = $("#"+IDTable).dataTable(settings);
      
        $('.ControlGroupBtn').attr("colspan", settings.columns.length);
        AddColumnButton("#" + IDTable);
 
    }
    //alert(IDTable);
  

});

function AddColumnButton(IDTable) {
    
    //--------------Su kien Xu ly nut bam delete multi rows -------------------------
    $("#ActionChoice").change(function () {

        if ($("#ActionChoice").val() == "Delete") {
            var ListID = $(".thisRow > td > div > span > input").map(function () { return $(this).val(); }).get().join(", ")  // Lay danh sach nhung ID duoc select

            LotusTable_RemoveSelectedRows(ListID);
            $("#ActionChoice").val('Default');

            var text = $("#ActionChoice > option:first-child").html(); //lay text defaut cua selector ActionChoice de gan hien thi 
            $(".ControlGroupBtn > div > div.selector >span").html(text);
        }

    });
    //----------------------------------------------------------------------------------------
    $(".widget > .shownpars >.btnAdd").click(function () {
        LotusTable_AddRow();
    });
    //--------------Ket thuc Su kien Xu ly nut bam delete multi rows -------------------------

    var checkedStatus = false;
    $(".titleIcon input:checkbox").click(function () {
        
        checkedStatus = this.checked;
       
        // thay doi status cua checkbox tong
        if ($(this).closest(".titleIcon > div > span").hasClass("checked") == true) {
            $(this).closest(".titleIcon > div > span").removeClass('checked');
        }
        else {
            $(this).closest(".titleIcon > div > span").addClass('checked');
        }

        // thay doi trang thai cac checkbox ben duoi
        $(IDTable + " tbody tr td:first-child input:checkbox").each(function () {
           
            this.checked = checkedStatus;
            if (checkedStatus == this.checked) {
                $(this).closest('.checker > span').removeClass('checked');
                $(this).closest('table tbody tr').removeClass('thisRow');
                // $(this).closest('#checkAll tbody tr td:first-child input[type=checkbox]').removeAttr("checked");
            }
            if (this.checked) {
                //$(this).closest('#checkAll tbody tr td:first-child input[type=checkbox]').attr("checked","checked");
                $(this).closest('.checker > span').addClass('checked');
                $(this).closest('table tbody tr').addClass('thisRow');

            }
        });


    });
    
    $(IDTable + ' tbody tr td:first-child input[type=checkbox]').change(function () {
        $(this).closest('tr').toggleClass("thisRow", this.checked);
    });

    $(IDTable + ' tbody tr td:first-child .checker > span').bind("click", function () {
      

        if ($(this).closest(IDTable + ' tbody tr td:first-child .checker > span').hasClass("checked") == false) {
            $(this).closest(IDTable + ' tbody tr td:first-child .checker > span').addClass('checked');
            $(this).closest(IDTable + ' tbody tr').addClass('thisRow');

        }
        else {
            $(this).closest(IDTable + ' tbody tr td:first-child .checker > span').removeClass('checked');
            $(this).closest(IDTable + ' tbody tr').removeClass('thisRow');

        }
    });
    // Dong bo giao dien
    $("select, .check, .check :checkbox, input:radio, input:file").uniform();
}

function InitLotusTable(TableId, options)
{
    var htmls="";
    htmls = htmls +"        <div class='widget'>";
    htmls = htmls +"             <div class='whead'>";
    htmls = htmls +"                 <span class='titleIcon'>";
    htmls = htmls +"                     <div id='uniform-titleCheck' class='checker'>";
    htmls = htmls +"                         <span class=''>";
    htmls = htmls +"                             <input id='titleCheck' type='checkbox' name='titleCheck' style='opacity: 0;'>";
    htmls = htmls +"                         </span>";
    htmls = htmls +"                     </div>";
    htmls = htmls +"                 </span>";
    htmls = htmls +"                <h6>Media table</h6>";
    htmls = htmls +"                <div class='clear'></div>";
    htmls = htmls +"            </div>";

    htmls = htmls +"            <ul class='tToolbar'>";
    htmls = htmls +"                    <li><a title='' href='#'><span class='icos-inbox'></span>Import table content</a></li>";
    htmls = htmls +"                    <li><a title='' href='#'><span class='icos-outbox'></span>Export table content</a></li>";
    htmls = htmls +"                    <li><a title='' href='#'><span class='icos-download'></span>Download statement</a></li>";
    htmls = htmls +"                    </ul>";

    htmls = htmls +"            <div  class='shownpars'>";
    htmls = htmls + "                <a class='tOptions act btnAdd'  title='Options' ><img src='../images/icons/options' alt='' /></a>";
    htmls = htmls +"                <!--###########################################################################################-->";
    //htmls = htmls + "                  <table cellpadding='0' cellspacing='0' border='0' id='" + TableId.replace("#", "") + "' class='tDefault checkAll tMedia'>";
    htmls = htmls + "                  <table cellpadding='0' cellspacing='0' border='0' id='" + TableId.replace("#", "") + "' class='tDefault checkAll tMedia'>";
    htmls = htmls +"                     <!-- ================================================================= -->";
    htmls = htmls + "                      <thead>";
    
    htmls = htmls + $(TableId + " tbody:first-child").html();

    htmls = htmls + "                     </thead>";
    htmls = htmls + "               <!-- ================================================================= -->";
    htmls = htmls + "              <tbody>";
    htmls = htmls + "              </tbody>";
    htmls = htmls + "              <!-- ================================================================= -->";
    htmls = htmls + "              <tfoot class='xxx'>";
    htmls = htmls + "                  <tr>";
    htmls = htmls + "                     <td class='ControlGroupBtn'>";
    htmls = htmls + "                         <div class='itemActions'>";
    htmls = htmls + "                             <label>Apply action:</label>";
    htmls = htmls + "                             <select id='ActionChoice'>";
    htmls = htmls + "                                 <option value='Default'>Select action...</option>";
    htmls = htmls + "                                  <option value='Delete'>Delete</option>";

    htmls = htmls + "                              </select>";
    htmls = htmls + "                          </div>";
    htmls = htmls + "                      </td>";

    htmls = htmls + "                 </tr>";
    htmls = htmls + "             </tfoot>";
    htmls = htmls + "              <!-- ================================================================= -->";
    htmls = htmls + "          </table>";
    htmls = htmls +"                <!--###########################################################################################-->";
    htmls = htmls +"            </div>";
    htmls = htmls +"            <div class='clear'></div> ";
    htmls = htmls + "        </div> ";

    $(TableId).replaceWith(htmls);


    options = $.extend(options, { "TableDiv": TableId.replace("#", "") });
    $(TableId).LotusTable(options);

}

function LoadProgessBar( IDRow)
{

    $("#Key" + IDRow).parent().parent().parent().parent().fadeOut();
}