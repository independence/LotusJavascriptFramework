function LoadFormAlbums() {

    $("#MainContent").setTemplateURL('../../Template/Content_Albums.htm');
    $("#MainContent").setParam('Lang', sys_Lang);
    $("#MainContent").processTemplate();

    setTimeout("LoadAllAlbum('#album-scoll');", 1000);
    ChangeMenu_Scrollbar('.album-scoll', '370px');
}

function LoadAllAlbum(div) {

    var html = "{#foreach $T.AlbumInfo as itemAlbumInfo}";
   
    html = html + "<div class='rows clearfix'>";
    html = html + "    <div class='imgs-album'>";

    html = html + "             <img src='" + sys_CommonType.PathDefaultUploadThumb + "{$T.itemAlbumInfo.Album.Image}' width='298' height='150' alt='' /> ";

    html = html + "    </div>";
    html = html + "    <div class='album-des' >";
    html = html + "      <div class='description'>";
    html = html + "         <h3>{$T.itemAlbumInfo.Album.Name}</h3>";
    html = html + "         <p>{$T.itemAlbumInfo.Album.InfoAlbum}</p>";
    html = html + "         <div class='t-right'>{$T.itemAlbumInfo.Album.CreateDate}</div>";
    html = html + "      </div>";
    html = html + "     </div>";
    html = html + "</div>";

    html = html + "<ul class='thums clearfix'>";
    html = html + "    {#foreach $T.itemAlbumInfo.ListImages as aImage}";

    html = html + "         <li><a title='{$T.aImage.Info}' class='ListImage{$T.itemAlbumInfo.Album.ID}' href='" + sys_CommonType.PathImage_Albums + "{$T.aImage.Image}' onmouseover=\"ImageActive('#des-thum_{$T.itemAlbumInfo.Album.ID}_{$T.aImage$index}');\" onmouseout=\"ImageLostFocus('#des-thum_{$T.itemAlbumInfo.Album.ID}_{$T.aImage$index}');\" >";
    html = html + "             <img src='" + sys_CommonType.PathDefaultUploadThumb + "{$T.aImage.Image}' width='148' height='148' alt='' /></a>";
    html = html + "             <div class='des-thum' style='display:none' id='des-thum_{$T.itemAlbumInfo.Album.ID}_{$T.aImage$index}'><div class='thumin'>{$T.aImage.Info}</div></div>";
    html = html + "         </li>";

    html = html + "    {#/for}";

    html = html + "</ul>";


    html = html + "{#/for}";


    jQuery.ajax({
        url: "/Action/ProcessFrontendAction.ashx?ActionObject=Albums&action=WEB-Sel_all_Albums_ForAlbumPage",
        type: "POST",
        dataType: "json",
        data: "",
        success: function (data, dataStatus) {
            $(div).setTemplate(html);
            $(div).processTemplate(data);
            html = $(div).html();
            html = Encoder.htmlDecode(html);
            $(div).html(html);

           //Khoi tao slide show cho cac album
            $(data.AlbumInfo).each(function (i, AlbumInfo) {
                var div = '.ListImage' + AlbumInfo.Album.ID;
                $(div).colorbox({ rel: div, slideshow: true });
                
            });
            //=================================
        },
        timeout: 30000,
        error: function (request, error) {
        }
    });
}

function ImageOnClick(divA) {
    $(divA).colorbox({ rel: divA, slideshow: true });
}

function ImageActive(div) {

    if ($(div).is(":hidden")) {
        $(div).show("slow");
    } else {
        $(div).slideUp();
    }

}
function ImageLostFocus(div) {

    if ($(div).is(":hidden")) {
        $(div).show("slow");
    } else {
        $(div).slideUp();
    }

}