function LoadFormHistory() {

    FillHistoryGuestHouse();

    setTimeout("ChangeMenu_Scrollbar('#history', '320px');ActiveTimeline();", 1000);

  
}

function ActiveTimeline() {
    $('.Stept1').tooltip({
        position: {
            my: "left top",
            at: "left bottom"
        }
    });

    $('.Stept2').tooltip({
        position: {
            my: "left top",
            at: "left bottom"
        }
    });
    $('.Stept3').tooltip({
        position: {
            my: "left top",
            at: "left bottom"
        }
    });
    $('.Stept4').tooltip({
        position: {
            my: "left top",
            at: "left bottom"
        }
    });
    $('.Stept5').tooltip({
        position: {
            my: "left top",
            at: "left bottom"
        }
    });
    $('.Stept6').tooltip({
        position: {
            my: "left top",
            at: "left bottom"
        }
    });

}

function FillHistoryGuestHouse() {
    var html = '../../Template/Content_History.htm';
    jQuery.ajax({
        url: "/Action/ProcessFrontendAction.ashx?ActionObject=News&action=WEB-Sel_History",
        type: "POST",
        dataType: "json",
        data: "",
        success: function (data, dataStatus) {


            $("#MainContent").setTemplateURL(html);


            $("#MainContent").attr('style', 'display:none');
            $("#MainContent").setParam('Lang', sys_Lang);
            $("#MainContent").setParam('PathImage', sys_CommonType.PathImage_News);
           
           
            $("#MainContent").processTemplate(data);
       
            html = $("#MainContent").html();          
            html = Encoder.htmlDecode(html);
            $("#MainContent").html(html);

            options = { percent: 50 };
            $("#MainContent").toggle('drop', options, 3000);
        },
        timeout: 30000,
        error: function (request, error) {
        }
    });
}