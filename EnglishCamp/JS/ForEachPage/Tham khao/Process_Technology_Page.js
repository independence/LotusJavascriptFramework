
function ShowSubMenu(CodeCategoryLevel1) {

    if (jQuery("#SubMenu_" + CodeCategoryLevel1).is(":hidden")) {

        var html = "";
        html = html + "{#foreach $T.Contents_Group as aContents}";
        html = html + "	           <li><a href='#'>{$T.aContents.CategoryNameLevel1}</a></li>		";
        html = html + "{#/for}";

        var data = ContentsBO.LoadContents_ByCodeCategoryLevel1(CodeCategoryLevel1, 51, 340, -1, "Code", true);

        jQuery("#SubMenu_" + CodeCategoryLevel1).setTemplate(html);
        jQuery("#SubMenu_" + CodeCategoryLevel1).processTemplate(data);

        html = jQuery("#SubMenu_" + CodeCategoryLevel1).html();
        html = Encoder.htmlDecode(html);

        jQuery("#SubMenu_" + CodeCategoryLevel1).html(html);


        jQuery("#SubMenu_" + CodeCategoryLevel1).slideDown("slow");

    }

    else {
        jQuery("#SubMenu_" + CodeCategoryLevel1).slideUp();
    }
}

function LoadDocument(div, CodeContents) {
    var html = "";
    html = html + "{#if $T.file$total ==0 } ";
    html = html + "		<div class='box-gray'>";
    html = html + "			<ul class='box-inner' id='document_" + CodeContents + "'>";

    html = html + "{#foreach $T.file as aFiles}";

    html = html + "				<li class='clearfix'>";
    html = html + "					<a href='" + sys_CommonType.PathDefaultUpload + "{$T.aFiles}' class='left'>{$T.aFiles}</a>";
    html = html + "					<span class='right span-icon'>&nbsp;</span>";
    html = html + "				</li>";
    html = html + "{#/for}";

    html = html + "			</ul>";
    html = html + "	    	</div>";
    html = html + "{#/if} ";

    var data = FilesBO.LoadListFile_ByCodeContents(CodeContents,  -1, "Code", true);
    jQuery(div).setTemplate(html);
    jQuery(div).processTemplate(data);
}

function LoadArticlesSlider(div) {
    var CodeContents_FocusDefault;
    var html = "   <ul class='cat-list clearfix'>";
    html = html + "{#foreach $T.Contents_Group as aContents}";


    html = html + "{#if $T.aContents$first}";
    html = html + "		<li class='first' id='ProductSlider_{$T.aContents$index}' onclick='move({$T.aContents$index},{$T.aContents$total},{$T.aContents.Code});'>";
    html = html + "{#elseif $T.aContents$index == 1}";
    html = html + "		<li class='active' id='ProductSlider_{$T.aContents$index}' onclick='move({$T.aContents$index},{$T.aContents$total},{$T.aContents.Code});'>";
    html = html + "{#else}";
    html = html + "		<li id='ProductSlider_{$T.aContents$index}' onclick='move({$T.aContents$index},{$T.aContents$total},{$T.aContents.Code});'>";
    html = html + "{#/if}";
    
    html = html + "	   <input type='hidden' id='CodeContents_FocusDefault' value='{$T.aContents.Code}'>";
    html = html + "	   <input type='hidden' id='CodeContents_{$T.aContents.Code}' value='{$T.aContents.Code}'>";
    html = html + "	   <input type='hidden' id='Title_{$T.aContents.Code}' value='{$T.aContents.Title}'>";
    html = html + "	   <input type='hidden' id='Intro_{$T.aContents.Code}' value='{$T.aContents.Intro}'>";
    html = html + "	   <div  id='Info_{$T.aContents.Code}' style='display:none'>  {$T.aContents.Info}'> </div>";
    html = html + "	   <input type='hidden' id='Image_{$T.aContents.Code}' value='{$T.aContents.Image2}'>";
    html = html + "	   <input type='hidden' id='ViewCount_{$T.aContents.Code}' value='{$T.aContents.ViewCount}'>";
    html = html + "	   <input type='hidden' id='DateCreated_{$T.aContents.Code}' value='{$T.aContents.DateCreated}'>";


    html = html + "			<div class='img'>";
    html = html + "				<a>";
    html = html + "				    <img   src='" + sys_CommonType.PathDefaultUpload + "{$T.aContents.Image}' class='hide' alt='' />";
    html = html + "				    <img   src='" + sys_CommonType.PathDefaultUpload + "{$T.aContents.Image1}'   alt='' />";
    html = html + "				</a>";
    html = html + "			</div>";
    html = html + "			<div class='cat-info'>";
    html = html + "				<h2 class='cat-name'><a>{$T.aContents.Title}</a></h2>";
    html = html + "				<div class='short-des'>";
    html = html + "					{$T.aContents.Tag}";
    html = html + "				</div>";
    html = html + "			</div>";
    html = html + "{#if $T.aContents$index == 1}";
    html = html + "			<span class='show-down'></span>";
    
    html = html + "{#/if}";

    html = html + "		</li>";

    html = html + "{#/for}";
    html = html + "	</ul>";
   
    var data = ContentsBO.LoadContents_ByCodeCategoryLevel1_005(51, 340, -1, "Code", true);

    jQuery(div).setTemplate(html);
    jQuery(div).processTemplate(data);

    html = jQuery(div).html();
    html = Encoder.htmlDecode(html);
    jQuery(div).html(html);



    var CodeContents_FocusDefault;
    CodeContents_FocusDefault = jQuery('#CodeContents_FocusDefault').val();
    LoadArticles('#Articles', CodeContents_FocusDefault);

    //LoadListProduct_ByContents(CodeContents_FocusDefault);
}

function move(index, TotalProduct, CodeCategoryLevel1) {

    var liActiveLeft = jQuery('.cat-list  li[class~="active"]').offset().left;

   // var liClick = ".cat-list li:nth-child(" + (parseInt(index) + 1) + ")";

    //var liClickLeft = jQuery(liClick).offset().left;
    var liClickLeft = jQuery("#ProductSlider_" + index).offset().left;

    liClickLeft = liActiveLeft - liClickLeft;

    if (liClickLeft > 0) {

        var count = 1;
        jQuery('.cat-list li')
                 .animate({ "left": "+=" + liClickLeft }, {
                     duration: 1000,
                     step: function (now, fx) {

                     },
                     start: function () {
                     },
                     complete: function () {

                         if (count == TotalProduct) {

                             jQuery('.cat-list li[class~="active"]').removeClass("active");
                             jQuery('span[class="show-down"]').remove();

                             jQuery("#ProductSlider_" + index).addClass("active");
                             jQuery("#ProductSlider_" + index).append("<span class='show-down'></span>");

                             //jQuery("#ProductSlider_" + index).prop("onclick", "move(" + index + "," + TotalProduct + ");");

                         }

                         count++;

                     }

                 });

    }
    else {

        jQuery('.cat-list li')
                 .animate({ "left": "+=" + liClickLeft }, {
                     duration: 1000,
                     step: function (now, fx) {
                         //jQuery(liMove).css("left", now);
                     },
                     done: function () {

                         jQuery('.cat-list li[class~="active"]').removeClass("active");
                         jQuery('span[class="show-down"]').remove();

                         jQuery("#ProductSlider_" + index).addClass("active");
                         jQuery("#ProductSlider_" + index).append("<span class='show-down'></span>");

                         //jQuery("#ProductSlider_" + index).prop("onclick", "move(" + index + "," + TotalProduct + ");");

                     }
                 });

    }
    
    LoadArticles("#Articles", CodeContents);
}

//=========================================================================
function LoadArticles(div,CodeContents)
{

    var Title = jQuery("#Title_" + CodeContents).val();
    var Intro = jQuery("#Intro_" + CodeContents).val();
    var Content = jQuery("#Info_" + CodeContents).html();
    var Image = jQuery("#Image_" + CodeContents).val();
    var ViewCount = jQuery("#ViewCount_" + CodeContents).val();
    var DateCreated = jQuery("#DateCreated_" + CodeContents).val();



    var html = "";
    html = html + "	<div class='information-detail clearfix'>";
    html = html + "		<div class='img-detail left'><img  src='" + sys_CommonType.PathDefaultUploadThumb + Image + "' width='337px' height='164px' alt='' /></div>";
    html = html + "		<h1>" + Title + "</h1>";
    html = html + "		<div class='item-cat'>";
    html = html + "			This infomation in <a href='#'>Category 1</a>";
    html = html + "		</div>";
    html = html + "		<div class='short-des'>" + Intro;
    html = html + "		</div>";
    html = html + "		<div class='item-action'>";
    html = html + "			<div class='left'>";
    html = html + "				<a class='print' href='#'>print</a>";
    html = html + "				<span>" + ViewCount + " view</span>";
    html = html + "			</div>";
    html = html + "			<div class='right'>" + DateCreated + "</div>";
    html = html + "		</div>";
    
    html = html + "	  	<div  id='document_" + CodeContents + "'>";

    html = html + "		</div>";


    html = html + "		<br/>";
    html = html + "		" + Content;
    html = html + "	</div><!-- end information-detail-->";
    html = html + "	<div class='item-action t-cen clearfix'>";
    html = html + "		<div class='right'>" + DateCreated + "</div>";
    html = html + "		<a class='print' href='#'>print</a>";
    html = html + "		<span>" + ViewCount + " view</span>";
    html = html + "	</div>";

   // jQuery(div).processTemplate(data);

    html = Encoder.htmlDecode(html);
    jQuery(div).html(html);
    
    var divDocument = "#document_" + CodeContents;
    LoadDocument(divDocument, CodeContents);

}
function LoadImageSlider(div) {

    var html = "	                <ul id='slide1' class='slides'>	";
    html = html + "                   {#foreach $T.Contents_Group as aContents}";
    html = html + "	                    <li> <img src='" + sys_CommonType.PathDefaultUpload + "{$T.aContents.Image}' alt='' /></li>	";
    html = html + "                   {#/for}";
    html = html + "	                </ul>	";

    var data = ContentsBO.LoadContents_ByCodeCategoryLevel1_006(1, 1, -1, "Code", true);
    jQuery(div).setTemplate(html);
    jQuery(div).processTemplate(data);

}
//=========================================================================
function LoadLastestContents(div) {

    var html = "{#foreach $T.Contents_Group as aContents}";

    html = html + "{#if $T.aContents$last}";
    html = html + "<li  class='last'><a href='Information_detail.aspx?CodeContents={$T.aContents.Code}'>{$T.aContents.Title}</a></li>";
    html = html + "{#else}";
    html = html + "<li><a href='Information_detail.aspx?CodeContents={$T.aContents.Code}'>{$T.aContents.Title}</a></li>";
    html = html + "{#/if}";

    html = html + "{#/for}";

    var data = ContentsBO.LoadContents_ByCodeCategoryLevel1_001(51, 151, -1, "Code", true)
    jQuery(div).setTemplate(html);
    jQuery(div).processTemplate(data);

    html = jQuery(div).html();
    html = Encoder.htmlDecode(html);
    jQuery(div).html(html);


}
//====================================================================================
function LoadDynamicMenu(div) {

    var html = "	<h3 class='title'><span>Tin tức</span></h3>		";

    html = html + "	  <ul class='list-menu'>		";
    html = html + "{#foreach $T.CategoryLevel1_Group as aCategoryLevel1}";
    html = html + "	   <li onclick='ShowSubMenu({$T.aCategoryLevel1.Code});'>		";
    html = html + "	       <a>{$T.aCategoryLevel1.CategoryNameLevel1}</a>		";
    html = html + "	       <ul id='SubMenu_{$T.aCategoryLevel1.Code}' style='display:none;' >		";

    html = html + "	       </ul>		";
    html = html + "	   </li>		";

    html = html + "{#/for}";

    html = html + "	  </ul>		";



    var data = CategoryLevel1BO.LoadCategoryLevel1_ByCodeCategoryLevel2_001(55, -1, "Code", true);

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
    html = html + "	                                    <li><a href='Information_detail.aspx?CodeContents={$T.aContents.Code}'>{$T.aContents.Title}</a></li>	";
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
    html = html + "                              {#foreach $T.CategoryLevel1_Group as aCategoryLevel1}";

    html = html + "	                                    <li><a href='Information.aspx?CodeCategoryLevel1={$T.aCategoryLevel1.Code}'>{$T.aCategoryLevel1.CategoryNameLevel1}</a></li>	";
    html = html + "                              {#/for}";
    html = html + "	                                    <li><a href='AboutUs.aspx'>{$P.Lang[43].Text}</a></li>	";
    html = html + "	                                </ul>	";

    var data = CategoryLevel1BO.LoadCategoryLevel1_ByCodeCategoryLevel2_002(51, 51, -1, "Code", true);

    jQuery('#NGKVIETNAM-Infor').setTemplate(html);
    jQuery('#NGKVIETNAM-Infor').setParam('Lang', sys_Lang);
    jQuery('#NGKVIETNAM-Infor').processTemplate(data);

}
//====================================================================================