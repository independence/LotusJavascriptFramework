/*
 * Flexigrid for jQuery -  v1.1
 *
 * Copyright (c) 2008 Paulo P. Marinas (code.google.com/p/flexigrid/)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 */
//
(function ($) {
    

    $.Grip = function (p)
    {

        p = $.extend({ //apply default properties
            height: 200, //default height
            width: 'auto', //auto width
            striped: true, //apply odd even stripes
            novstripe: false,
            minwidth: 30, //min width of columns
            minheight: 80, //min height of columns
            resizable: true, //allow table resizing
            url: false, //URL if using data from AJAX
            method: 'POST', //data sending method
            dataType: 'xml', //type of data for AJAX, either xml or json
            errormsg: 'Connection Error',
            usepager: false,
            nowrap: true,
            page: 1, //current page
            total: 1, //total pages
            useRp: true, //use the results per page select box
            rp: 15, //results per page
            rpOptions: [10, 15, 20, 30, 50], //allowed per-page values
            title: false,
            idProperty: 'id',
            pagestat: 'Displaying {from} to {to} of {total} items',
            pagetext: 'Page',
            outof: 'of',
            findtext: 'Find',
            params: [], //allow optional parameters to be passed around
            procmsg: 'Processing, please wait ...',
            query: '',
            qtype: '',
            nomsg: 'No items',
            minColToggle: 1, //minimum allowed column to be hidden
            showToggleBtn: true, //show or hide column toggle popup
            hideOnSubmit: true,
            autoload: true,
            blockOpacity: 0.5,
            preProcess: false,
            addTitleToCell: false, // add a title attr to cells with truncated contents
            dblClickResize: false, //auto resize column by double clicking
            onDragCol: false,
            onToggleCol: false,
            onChangeSort: false,
            onDoubleClick: false,
            onSuccess: false,
            onError: false,
            onSubmit: false //using a custom populate function

        });

        //-----------------------------
        jQuery.ajax({
            url: p.url,
            type: "POST",
            dataType: "json",
            data: "",
            success: function (data, dataStatus) {
                shtml = "<select id='txt_CategoryLevel2_Filter' name='txt_CategoryLevel2_Filter' style='width:200px'  onchange=\"FillCategoryLevel1ToDropdowList_Filter(\'#div_Cat1_Filter\');\">";
                if (data.CategoryLevel2_Group.length >= 1) {
                    //alert(FocusCode);
                    $(data.CategoryLevel2_Group).each(function (i, item) {
                        if (item.Code == FocusCode) {

                            shtml += "<option value='{0}' selected='selected'>{1}</option>".format(item.Code, item.Code);
                        }
                        else {
                            shtml += "<option value='{0}' >{1}</option>".format(item.Code, item.CategoryNameLevel2, item.Code);
                        }
                    });

                }
                shtml += "</select>";
                //Div_ListIDRoom
                $(div).html(shtml);

            },
            timeout: 3000,
            error: function (request, error) {
            }
        });
        //-----------------------------
    }
})(jQuery);