

function LoadCategoryLevel2_Contents(div, title) {
    var html = "";
    html = html + "<div class='title' >{0}</div>".format(title);
    html = html + "<ul>";
        html = html + " {#foreach $T.CategoryLevel1_Group as Level1} <li ><a href='/Contents.aspx?Action=LoadPostByCodeCategoryLevel1&CodeCategoryLevel1={$T.Level1.Code}'>{$T.Level1.CategoryNameLevel1}</a></li> {#/for}";
    html = html + "</ul>";



    jQuery.ajax({
        url: "/Action/ProcessFrontendAction.ashx?ActionObject=CategoryLevel1&action=WEB-Sel_all_ByCodeCategoryLevel2&CategoryLevel2=Contents",
        type: "POST",
        dataType: "json",
        data: "",
        success: function (data, dataStatus) {

            $(div).setTemplate(html);
            $(div).processTemplate(data);
            html = $(div).html();
            html = Encoder.htmlDecode(html);
            $(div).html(html);

        },
        timeout: 30000,
        error: function (request, error) {
        }
    });
}
//====================================================================================

//====================================================================================
function LoadContentsLastes(div) {
    var html = "{#foreach $T.Contents_Group as aContents}";
    html = html + "<li class='clearfix'>";

 
        html = html + "<h2 class='title-new' ><a href='/ContentsDetail.aspx?ID={$T.aContents.ID}'>{$T.aContents.Title}</a></h2>";

    html = html + "     <div class='date' >{$T.aContents.DateCreated}</div>";
    //html = html + "     <a href='#' class='numcomment'>18 Comments</a>";
    html = html + "    </div>";
    html = html + "    <div class='Contents-infor'>";
    html = html + "    <div class='imgs' >";
    html = html + "    <img src='" + sys_CommonType.PathImageThumb_Contents + "{$T.aContents.Image}' width='200' height='117' alt='' /></div>";

    html = html + "    <div class='infor-more' > {$T.aContents.Intro}";

    html = html + "      <a href='/ContentsDetail.aspx?ID={$T.aContents.ID}' class='view-more' >Read more</a>";
    html = html + "    </div>";
    html = html + "    </div>";
    html = html + "    </li>";

    html = html + "{#/for}";


    jQuery.ajax({
        url: "/Action/ProcessFrontendAction.ashx?ActionObject=Contents&action=WEB-SelectListContents_ByCodeCategoryLevel1_001&Type=NormalContents&TitleLenght=" + TitleLenght + "&IntroLenght=" + IntroLenght,
        type: "POST",
        dataType: "json",
        data: "",
        success: function (data, dataStatus) {
            $(div).setTemplate(html);
            $(div).processTemplate(data);
            html = $(div).html();
            html = Encoder.htmlDecode(html);
            $(div).html(html);
            Paging('.paging', 'ListNewLastest');
        },
        timeout: 30000,
        error: function (request, error) {
        }
    });

    

}

//----------------------------------------------------------------
function LoadDetailPageByURL(div, IDContents) {
    var html = "";
    html = html + "<li class='clearfix'>";

    html = html + "<h2 class='title-new'><a href='/ContentsDetail.aspx?ID={$T.Contents.ID}'>{$T.Contents.Title}</a></h2>";
    html = html + "     <div class='date' style='float:right'><b>{$T.Contents.DateCreated}</b></div>";
    //html = html + "     <a href='#' class='numcomment'>18 Comments</a>";
    html = html + "    </div>";
    html = html + "    <div class='Contents-infor'>";

    html = html + "    <table><tr><td style='width:400px;height:234'><img src='" + sys_CommonType.PathDefaultUploadThumb + "{$T.Contents.Image}' width='400' height='234' alt='' /></td>";

    html = html + "    <td><div class='infor-Detail-more'>{$T.Contents.Intro}</td></tr>";
        html = html + "    <tr><td colspan='2'><br/> </td></tr>";
        html = html + "    <tr><td colspan='2'>{$T.Contents.Info}</td></tr></table>";

    html = html + "   <br/> <br/><br/><br/>";
    html = html + "    </div>";

    html = html + "    </div>";
    html = html + "    </li>";

    html = html + "";


    jQuery.ajax({
        url: "/Action/ProcessFrontendAction.ashx?ActionObject=Contents&action=WEB-Sel_Contents_ByCode&IDContents=" + IDContents,
        type: "POST",
        dataType: "json",
        data: "",
        success: function (data, dataStatus) {
            $(div).setTemplate(html);
            $(div).processTemplate(data);
            html = $(div).html();
            html = Encoder.htmlDecode(html);
            $(div).html(html);
        },
        timeout: 30000,
        error: function (request, error) {
        }
    });
}
//====================================================================================
function LoadRecentPosts(div) {
    var html = "{#foreach $T.Contents_Group as aContents}";

        html = html + "<li><a href='/ContentsDetail.aspx?ID={$T.aContents.ID}'>{$T.aContents.Title}</a></li>";

    html = html + "{#/for}";


    jQuery.ajax({
        url: "/Action/ProcessFrontendAction.ashx?ActionObject=Contents&action=WEB-SelectListContents_ByCodeCategoryLevel1_001&Type=NormalContents&TitleLenght=" + TitleLenght + "&IntroLenght=" + IntroLenght,
        type: "POST",
        dataType: "json",
        data: "",
        success: function (data, dataStatus) {
            $(div).setTemplate(html);
            $(div).processTemplate(data);
        },
        timeout: 30000,
        error: function (request, error) {
        }
    });
}
//====================================================================================
function LoadSpecialContents(div, Title) {
    var html = "<h3>{0}</h3><ul id='ContentsList'>".format(Title);
    html = html + "{#foreach $T.Contents_Group as aContents}";

        html = html + "<li><a href='/ContentsDetail.aspx?ID={$T.aContents.ID}'>{$T.aContents.Title}</a></li>";
        html = html + "{#/for}";
        html = html + "</ul>";

        jQuery.ajax({
            url: "/Action/ProcessFrontendAction.ashx?ActionObject=Contents&action=WEB-SelectListContents_ByCodeCategoryLevel1_001&Type=SpecialContents",
            //3: Thong tin nha khach
            type: "POST",
            dataType: "json",
            data: "",
            success: function (data, dataStatus) {
                $(div).setTemplate(html);
                $(div).processTemplate(data);
                html = $(div).html();
                html = Encoder.htmlDecode(html);
                $(div).html(html);
            },
            timeout: 30000,
            error: function (request, error) {
            }
        });

    }



function LoadPostContentsByCategory1(div, CodeCategoryLevel1) {
    var html = "{#foreach $T.Contents_Group as aContents}";
    html = html + "<li class='clearfix'>";

        html = html + "<h2 class='title-new' ><a href='/ContentsDetail.aspx?ID={$T.aContents.ID}'>{$T.aContents.Title}</a></h2>";

    html = html + "     <div class='date' >{$T.aContents.DateCreated}</div>";
    //html = html + "     <a href='#' class='numcomment'>18 Comments</a>";
    html = html + "    </div>";
    html = html + "    <div class='Contents-infor'>";
    html = html + "    <div class='imgs' >";
    html = html + "    <img src='" + sys_CommonType.PathImageThumb_Contents + "{$T.aContents.Image}' width='200' height='117' alt='' /></div>";

        html = html + "    <div class='infor-more' > {$T.aContents.Intro}";
    html = html + "      <a href='/ContentsDetail.aspx?ID={$T.aContents.ID}' class='view-more' > Xem tiếp</a>";
    html = html + "    </div>";
    html = html + "    </div>";
    html = html + "    </li>";

    html = html + "{#/for}";


    jQuery.ajax({
        url: "/Action/ProcessFrontendAction.ashx?ActionObject=Contents&action=WEB-Sel_all_ByCodeCategoryLevel1&CodeCategoryLevel1=" + CodeCategoryLevel1,
        //3: Thong tin nha khach
        type: "POST",
        dataType: "json",
        data: "",
        success: function (data, dataStatus) {
            $(div).setTemplate(html);
            $(div).processTemplate(data);
            html = $(div).html();
            html = Encoder.htmlDecode(html);
            $(div).html(html);
        },
        timeout: 30000,
        error: function (request, error) {
        }
    });
}

