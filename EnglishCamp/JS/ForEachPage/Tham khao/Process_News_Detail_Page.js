function LoadLastestContents(div) {

    var html = "{#foreach $T.Contents_Group as aContents}";

    html = html + "{#if $T.aContents$last}";
    html = html + "<li  class='last'><a href='News_Detail.aspx?Code={$T.aContents.Code}'>{$T.aContents.Title}</a></li>";
    html = html + "{#else}";
    html = html + "<li><a href='News_Detail.aspx?Code={$T.aContents.Code}'>{$T.aContents.Title}</a></li>";
    html = html + "{#/if}";

    html = html + "{#/for}";

    var data = ContentsBO.LoadContents_ByCodeCategoryLevel1_002(51, 151, -1, "Code", true)
    $(div).setTemplate(html);
    $(div).processTemplate(data);

    html = $(div).html();
    html = Encoder.htmlDecode(html);
    $(div).html(html);


}
//====================================================================================
function LoadDynamicMenu(div) {

    var html = "	<h3 class='title'><span>Contents</span></h3>		";

    html = html + "	  <ul class='list-menu'>		";
    html = html + "{#foreach $T.CategoryLevel2_Group as aCategoryLevel2}";
    html = html + "	   <li onclick='ShowSubMenu({$T.aCategoryLevel2.Code});'>		";
    html = html + "   <a>{$T.aCategoryLevel2.CategoryNameLevel2}</a>		";
    html = html + "   <ul id='SubMenu_{$T.aCategoryLevel2.Code}' style='display:none;' >		";

    html = html + "   </ul>		";
    html = html + "	   </li>		";

    html = html + "{#/for}";

    html = html + "	  </ul>		";



    var data = CategoryLevel2BO.LoadListCategoryLevel2_ByListCodeCategoryLevel2_001(55, -1, "Code", true);

    $(div).setTemplate(html);
    $(div).processTemplate(data);

    html = $(div).html();
    html = Encoder.htmlDecode(html);
    $(div).html(html);
}
//====================================================================================
function LoadStaticMenu(div) {
    var html = "";
    html = html + "<h3 class='title'><span>{$P.Lang[9].Text}</span></h3>	";
    html = html + "   <ul class='list-menu'>	";
    html = html + "       <li id='NGK-Infor'>	";
    html = html + "           <a>{$P.Lang[33].Text}</a>	";
    html = html + "           <ul>	";

    html = html + "             {#foreach $T.Contents_Group as aContents}";
    html = html + "               <li><a href='Information_Detail.aspx?CodeContents={$T.aContents.Code}'>{$T.aContents.Title}</a></li>	";
    html = html + "             {#/for}";
    html = html + "           </ul>	";
    html = html + "       </li>	";
    html = html + "       <li id='NGKVIETNAM-Infor' >	";


    html = html + "       </li>	";
    html = html + "   </ul>	";

    var data = ContentsBO.LoadContents_ByCodeCategoryLevel1_004(51, 51, -1, "Code", true);

    $(div).setTemplate(html);
    $(div).setParam('Lang', sys_Lang);
    $(div).processTemplate(data);


    var html = "";
    html = html + "           <a>{$P.Lang[41].Text}</a>	";
    html = html + "           <ul>	";
    html = html + "               <li><a href='Information.aspx?CodeCategory1={$T.Contents_Group[0].CodeCategoryLevel1}'>{$P.Lang[42].Text}</a></li>	";
    html = html + "               <li><a href='AboutUs.aspx'>{$P.Lang[43].Text}</a></li>	";
    html = html + "           </ul>	";

    var data = ContentsBO.LoadContents_ByCodeCategoryLevel1_005(51, 51, -1, "Code", true);

    $('#NGKVIETNAM-Infor').setTemplate(html);
    $('#NGKVIETNAM-Infor').setParam('Lang', sys_Lang);
    $('#NGKVIETNAM-Infor').processTemplate(data);

}
//====================================================================================

function LoadProductSlider(div) {
    var html = "<ul class='cat-list clearfix'>";
    html = html + "{#foreach $T.CategoryLevel1_Group as aCategoryLevel1}";

    html = html + "{#if $T.aCategoryLevel1$first}";
    html = html + "     <li class='first' onclick=\" window.location.href='product.aspx?CodeCategoryLevel1={$T.aCategoryLevel1.Code}'\">";
    html = html + "{#else}";
    html = html + "    <li  onclick=\" window.location.href='product.aspx?CodeCategoryLevel1={$T.aCategoryLevel1.Code}'\">";
    html = html + "{#/if}";

    html = html + "        <div class='img'>";
    html = html + "            <a href='product.aspx?CodeCategoryLevel1={$T.aCategoryLevel1.Code}'>";
    html = html + "                <img class='hide' src='" + sys_CommonType.PathDefaultUploadThumb + "{$T.aCategoryLevel1.Image}'  alt='' />";
    html = html + "                <img  src='" + sys_CommonType.PathDefaultUploadThumb + "{$T.aCategoryLevel1.Image1}'  alt='' />";
    html = html + "            </a>";
    html = html + "        </div>";
    html = html + "        <div class='cat-info'>";
    html = html + "            <h2 class='cat-name'><a>{$T.aCategoryLevel1.CategoryNameLevel1}</a></h2>";
    html = html + "            <div class='short-des'>";
    html = html + "   {$T.aCategoryLevel1.Intro}";
    html = html + "            </div>";
    html = html + "            <a class='readmore'>See more</a>";
    html = html + "        </div>";
    html = html + "    </li>";

    html = html + "{#/for}";
    html = html + "</ul>";

    var data = CategoryLevel1BO.LoadCategoryLevel1_ByCodeCategoryLevel2_001(151, -1, "Code", true);

    $(div).setTemplate(html);
    $(div).processTemplate(data);

    html = $(div).html();
    html = Encoder.htmlDecode(html);
    $(div).html(html);

    Paging('#paging', div, 2);

}
//====================================================================================
function LoadImageSlider(div) {

    var html = "            <ul id='slide1' class='slides'>	";
    html = html + "  {#foreach $T.Contents_Group as aCategoryLevel1}";
    html = html + "                <li> <img src='" + sys_CommonType.PathDefaultUploadThumb + "{$T.aCategoryLevel1.Image}' alt='' /></li>	";
    html = html + "  {#/for}";
    html = html + "            </ul>	";

    var data = ContentsBO.LoadContents_ByCodeCategoryLevel1_003(1, 1, -1, "Code", true);
    $(div).setTemplate(html);
    $(div).processTemplate(data);

}

function LoadInformationDetail(div,CodeContents)
{
    var html = "	<div class='information-detail clearfix'>";
    html = html + "   <div>";
    html = html + "     <div>";
    html = html + "    <div class='img-detail left'>";
    html = html + "        <img src='" + sys_CommonType.PathImageThumb_Contents + "{$T.Contents_Group.Image}' width='337' height='164' alt='' />";
    html = html + "    </div>";
    html = html + "     </div>";
    html = html + "     <div>";
    html = html + "    <h1>{$T.Contents_Group.Title}</h1>";
    html = html + "    <div class='item-cat'>";
    html = html + "        This infomation in <a href='#'>Category 1</a>";
    html = html + "    </div>";
    html = html + "    <div class='short-des'>";
    html = html + "        {$T.Contents_Group.Intro}";
    html = html + "    </div>";
    html = html + "    <div class='item-action'>";
    html = html + "        <div class='left'>";
    html = html + "            <a class='print' href='#'>print</a>";
    html = html + "            <span>{$T.Contents_Group.ViewCount} Views</span>";
    html = html + "        </div>";
    html = html + "    <div class='right'>{$T.Contents_Group.DateCreated}</div>";
    html = html + "</div>";
    html = html + "  </div>";


    html = html + "  </div>";
    html = html + "  <div class='left'>";
    html = html + "  {$T.Contents_Group.Info}";
    html = html + " </div>";
    html = html + "	</div>";
    html = html + "	<!-- end information-detail-->";
    html = html + "	<div class='item-action t-cen clearfix'>";
    html = html + "<div class='right'>{$T.Contents_Group.DateCreated}</div>";
    html = html + "<a class='print' href='#'>print</a>";
    html = html + "<span>{$T.Contents_Group.ViewCount} Views</span>";
    html = html + "	</div>";

    

    var data = ContentsBO.LoadContents_ByCode(CodeContents, 80, 420);
    
    jQuery(div).setTemplate(html);
    jQuery(div).processTemplate(data);

    html = jQuery(div).html();
    html = Encoder.htmlDecode(html);
    jQuery(div).html(html);

    ContentsBO.UpdateCountView(CodeContents);
}