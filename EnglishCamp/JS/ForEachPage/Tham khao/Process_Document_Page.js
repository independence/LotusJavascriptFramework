


function LoadData(div)
{
    


    //------------------
    var html = "";
    html = html + "<div id='gaass215' class='ga-ass'>";
    html = html + "	<div class='preload' style='opacity: 0; visibility: hidden;'><div></div></div>";
    html = html + "	<div class='ga-main-wapper'>";
  
    html = html + "{#foreach $T.AlbumInfo as aAlbumInfo}";
    html = html + "		<div class='ga-main-item'>";
    html = html + "			<div class='ga-description dis-item'>";
    html = html + "				<ul>";

    html = html + "    {#foreach $T.aAlbumInfo.ListFiles as aFiles}";
    html = html + "					<li>";
    html = html + "						<a class='doc-download' href='" + sys_CommonType.PathDefaultUpload + "{$T.aFiles.Image}'  >dowload</a>";
    html = html + "						<span class='cate'>{$T.aFiles.AlbumsName}</span>";
    html = html + "						<div class='name'>{$T.aFiles.Title}</div>";
    html = html + "						<span class='phone'>{$T.aFiles.UploadDate}</span>";
    html = html + "						<div class='address'>{$T.aFiles.Intro}</div>";
    html = html + "					</li>";
    html = html + "     {#/for}";
    
    html = html + "				</ul>";
    html = html + "				<div class='control'>";
    html = html + "					<a class='mCSB_buttonUp' href=''></a>";
    html = html + "					<a class='mCSB_buttonDown' href='#'></a>";
    html = html + "				</div>";
    html = html + "			</div>";
    html = html + "		</div>";
    html = html + "{#/for}";


    html = html + "	</div><!-- end col-main -->";


    html = html + "	<div class='ga-buttons-control'>";
    html = html + "		<a href='#' class='ga-previous sl-pre' onclick='return false;'>Previous</a>";
    html = html + "		<a href='#' class='ga-next sl-next' onclick='return false;'>Next</a>";
    html = html + "	</div>";
    html = html + "	<div class='ga-navigator-outer doc-list'>";
    html = html + "		<ul class='ga-navigator'>";

    html = html + "{#foreach $T.AlbumInfo as aAlbumInfo}";
    html = html + "			<li>";
    html = html + "				<div class='box-document'>";
    html = html + "					<span class='cat-document'>DOCUMENT</span>";
    html = html + "					<span class='name'>[{$T.aAlbumInfo.Albums.ViewCount}] {$T.aAlbumInfo.Albums.Title} </span>";
    html = html + "					<span>{$T.aAlbumInfo.Albums.CreateDate}</span>";
    html = html + "				</div>";
    html = html + "			</li>";
    html = html + "{#/for}";

    html = html + "		</ul>";
    html = html + "	</div>";
    html = html + "</div>";

    var data = AlbumsBO.SelectListAlbums_ByListCodeAlbums_001(1, 55, 55, 10, "ID", true);
    jQuery(div).setTemplate(html);
    jQuery(div).processTemplate(data);

    html = jQuery(div).html();
    html = Encoder.htmlDecode(html);
    jQuery(div).html(html);


}
//====================================================================================
function LoadDynamicMenu(div) {

    var html = "	<h3 class='title'><span>Contents</span></h3>		";

    html = html + "	  <ul class='list-menu'>		";
    html = html + "{#foreach $T.CategoryLevel2_Group as aCategoryLevel2}";
    html = html + "	   <li onclick='ShowSubMenu({$T.aCategoryLevel2.Code});'>		";
    html = html + "	       <a>{$T.aCategoryLevel2.CategoryNameLevel2}</a>		";
    html = html + "	       <ul id='SubMenu_{$T.aCategoryLevel2.Code}' style='display:none;' >		";

    html = html + "	       </ul>		";
    html = html + "	   </li>		";

    html = html + "{#/for}";

    html = html + "	  </ul>		";



    var data = CategoryLevel2BO.LoadListCategoryLevel2_ByListCodeCategoryLevel2_001(55, -1, "Code", true);

    jQuery(div).setTemplate(html);
    jQuery(div).processTemplate(data);

    html = jQuery(div).html();
    html = Encoder.htmlDecode(html);
    jQuery(div).html(html);
}
//====================================================================================
function LoadStaticMenu(div) {
    var html = "";
    html = html + "	    <h3 class='title'><span>{$P.Lang[9].Text}</span></h3>	";
    html = html + "	                        <ul class='list-menu'>	";
    html = html + "	                            <li id='NGK-Infor'>	";
    html = html + "	                                <a>{$P.Lang[33].Text}</a>	";
    html = html + "	                                <ul>	";

    html = html + "                              {#foreach $T.Contents_Group as aContents}";
    html = html + "	                                    <li><a href='information_detail.aspx?CodeContents={$T.aContents.Code}'>{$T.aContents.Title}</a></li>	";
    html = html + "                              {#/for}";
    html = html + "	                                </ul>	";
    html = html + "	                            </li>	";
    html = html + "	                            <li id='NGKVIETNAM-Infor' >	";


    html = html + "	                            </li>	";
    html = html + "	                        </ul>	";

    var data = ContentsBO.LoadContents_ByCodeCategoryLevel1_004(51, 51, -1, "Code", true);

    jQuery(div).setTemplate(html);
    jQuery(div).setParam('Lang', sys_Lang);
    jQuery(div).processTemplate(data);


    var html = "";
    html = html + "	                                <a>{$P.Lang[41].Text}</a>	";
    html = html + "	                                <ul>	";
    html = html + "	                                    <li><a href='Information.aspx?CodeCategory1={$T.Contents_Group[0].CodeCategoryLevel1}'>{$P.Lang[42].Text}</a></li>	";
    html = html + "	                                    <li><a href='AboutUs.aspx'>{$P.Lang[43].Text}</a></li>	";
    html = html + "	                                </ul>	";

    var data = ContentsBO.LoadContents_ByCodeCategoryLevel1_005(51, 51, -1, "Code", true);

    jQuery('#NGKVIETNAM-Infor').setTemplate(html);
    jQuery('#NGKVIETNAM-Infor').setParam('Lang', sys_Lang);
    jQuery('#NGKVIETNAM-Infor').processTemplate(data);

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
    html = html + "                    {$T.aCategoryLevel1.Intro}";
    html = html + "            </div>";
    html = html + "            <a class='readmore'>See more</a>";
    html = html + "        </div>";
    html = html + "    </li>";

    html = html + "{#/for}";
    html = html + "</ul>";

    var data = CategoryLevel1BO.LoadCategoryLevel1_ByCodeCategoryLevel2_001(151, -1, "Code", true);

    jQuery(div).setTemplate(html);
    jQuery(div).processTemplate(data);

    html = jQuery(div).html();
    html = Encoder.htmlDecode(html);
    jQuery(div).html(html);



}
//====================================================================================
function LoadImageSlider(div) {

    var html = "	                <ul id='slide1' class='slides'>	";
    html = html + "                   {#foreach $T.Contents_Group as aCategoryLevel1}";
    html = html + "	                    <li> <img src='" + sys_CommonType.PathDefaultUpload + "{$T.aCategoryLevel1.Image}' alt='' /></li>	";
    html = html + "                   {#/for}";
    html = html + "	                </ul>	";

    var data = ContentsBO.LoadContents_ByCodeCategoryLevel1_003(1, 1, -1, "Code", true);
    jQuery(div).setTemplate(html);
    jQuery(div).processTemplate(data);

}
//====================================================================================
function LoadMainContent(div) {

    var html = "";
    html = html + "<div class='title'><span>{$T.Contents_Group[0].CategoryNameLevel1}</span></div>";
    html = html + "  <div class='item-blog'>";
    html = html + "{#foreach $T.Contents_Group as aContents}";
    html = html + "<div class='item'>";
    html = html + "             <div class='img-item'>";
    html = html + "                        <a href='#'>";
    html = html + "                               <img src= '" + sys_CommonType.PathDefaultUploadThumb + "{$T.aContents.Image}' width='337px' height='164px' alt='' /></a>";
    html = html + "              </div>";
    html = html + "              <div class='item-infor'>";
    html = html + "                        <h2><a href='Information_Detail.aspx?CodeContents={$T.aContents.Code}'>{$T.aContents.Title}</a></h2>";
    html = html + "                        <div class='item-cat'>";
    html = html + "                             <a href='#'>{$T.aContents.CategoryNameLevel1}</a>";
    html = html + "                        </div>";
    html = html + "                        <div class='short-des'>";
    html = html + "                              {$T.aContents.Intro}  ";
    html = html + "                        </div>";

    html = html + "                        <div class='item-action'>";
    html = html + "                                 <a class='print' href='#'>print</a>";
    html = html + "                                   <span>{$T.aContents.ViewCount} view</span>";
    html = html + "                        </div>";
    html = html + "             </div>";
    html = html + "</div>";


    html = html + "{#/for}";
    html = html + "</div>";
    var CodeCategory1 = GetURLParameter('CodeCategoryLevel1');
 
    if (isEmpty(CodeCategory1)) {

        var data = ContentsBO.LoadContents_ByCodeCategoryLevel1_001(51, 51, -1, "Code", true);

    }
    else {

        var data = ContentsBO.LoadContents_ByCodeCategoryLevel1(CodeCategory1,51, 51, -1, "Code", true);
    }
    jQuery(div).setTemplate(html);
    jQuery(div).processTemplate(data);

    html = jQuery(div).html();
    html = Encoder.htmlDecode(html);
    jQuery(div).html(html);
    Paging('#paging', div, 6);
}
//====================================================================================

function ShowSubMenu(CodeCategoryLevel2)
{

    if (jQuery("#SubMenu_" + CodeCategoryLevel2).is(":hidden")) {
       
        var html = "";
        html = html + "{#foreach $T.CategoryLevel1_Group as aCategoryLevel1}";
        html = html + "	           <li><a href='#'>{$T.aCategoryLevel1.CategoryNameLevel1}</a></li>		";
        html = html + "{#/for}";

        var data = CategoryLevel1BO.LoadListCategoryLevel1_ByCodeCategoryLevel2(CodeCategoryLevel2);

        jQuery("#SubMenu_" + CodeCategoryLevel2).setTemplate(html);
        jQuery("#SubMenu_" + CodeCategoryLevel2).processTemplate(data);

        html = jQuery("#SubMenu_" + CodeCategoryLevel2).html();
        html = Encoder.htmlDecode(html);

        jQuery("#SubMenu_" + CodeCategoryLevel2).html(html);


        jQuery("#SubMenu_" + CodeCategoryLevel2).slideDown("slow");

}

    else {
        jQuery("#SubMenu_" + CodeCategoryLevel2).slideUp();
    }
}