function LoadContacts(div) {

    var html = "<ul>";
    html = html + "{#foreach $T.Contents_Group as aContents}";
    html = html + "{#if $T.aContents$last}";
    html = html + "  <li class='last'>";
    html = html + "{#else}";
    html = html + "  <li>";
    html = html + "{#/if}";

    html = html + "<img alt=''src='"+ sys_CommonType.URL +"/Action/ProcessImageServiceAction.ashx?W=118&H=110&Scale=crop&Img={$T.aContents.Image}' width='118' height='110'/>";
    html = html + "<span class='company'>{$T.aContents.ExtendProperties2}</span>";
    html = html + "<span class='name'>{$T.aContents.Title}</span>";
    html = html + "<span class='positions'>{$T.aContents.ExtendProperties3}</span>";
    html = html + "<div class='box-bottom'>";
    html = html + "{$T.aContents.Info}";
    html = html + "</div>";
    html = html + "</li>";
    html = html + "{#/for}";
    html = html + "</ul>";

    var data = ContentsBO.LoadContents_ByCodeCategoryLevel1_008(51, 51, -1, "Code", true);
    jQuery(div).setTemplate(html);
    jQuery(div).setParam('Lang', sys_Lang);
    jQuery(div).processTemplate(data);

    html = jQuery(div).html();
    html = Encoder.htmlDecode(html);
    jQuery(div).html(html);

}