

function LoadViewAllContent(divContentDetail, divListProvince, divTotalDistributors) {

    var html = "";
    html = html + "{#foreach $T.ListContents as aListContents}";
    html = html + "	<div class='ga-main-item'>";
    html = html + "			<div class='ga-description dis-item'>";
    html = html + "				<ul>";
    html = html + "                {#foreach $T.aListContents as aContents}";
    html = html + "			 		<li>";
    html = html + "						<span class='cate'>{$T.aContents.Title}</span>";
    html = html + "						<div class='name'>{$T.aContents.Intro}</div>";
    html = html + "						<span class='phone'>{$T.aContents.Info}</span>";
    html = html + "						<div class='address'>{$T.aContents.Tag}</div>";
    html = html + "					</li>";
    html = html + "                   {#/for}";
    html = html + "				</ul>";
    html = html + "			</div>";
    html = html + "		</div>";
    html = html + " {#/for}";
    CodeCategoryLevel2 = jQuery("#txtCodeCategoryLevel2").val();
    var data = CategoryLevel2BO.LoadViewAllContent_ByCodeCategoryLevel2(CodeCategoryLevel2, 15, 15, -1, "Code", true);
        jQuery(divContentDetail).setTemplate(html);
        jQuery(divContentDetail).processTemplate(data);

        html = jQuery(divContentDetail).html();
        html = Encoder.htmlDecode(html);
        jQuery(divContentDetail).html(html);

    var html = "";
    html = html + "	<ul class='ga-navigator'>";
    
    html = html + "  {#foreach $T.ListCategoryLevel1 as aCategoryLevel1}";
   // html = html + "   {#for index = 1 to $T.ListCategoryLevel1$total} {#/for}";
    html = html + "		<li>";
    html = html + "			<div class='box-product'>";
    html = html + "				<div class='name'>{$T.aCategoryLevel1.CategoryNameLevel1}</div>";
    html = html + "                   {#foreach $T.ListContents as aListContents}";
    html = html + "                   {#foreach $T.aListContents as aItem}";
    html = html + "                     {#if $T.aListContents$index == $T.aCategoryLevel1$index }";
    html = html + "                       {#if $T.aItem$index == 1}";
    html = html + "			      	          <span>{#if $T.aItem$total > 0 }{$T.aItem$total} {#else} 0 {#/if} đại lý</span>";
    html = html + "                       {#/if}";
    html = html + "                     {#/if}";
    html = html + "                     {#/for}";
    html = html + "                     {#/for}";
    html = html + "			</div>";
    html = html + "		</li>";
    html = html + "                   {#/for}";
    html = html + "	</ul>";
    jQuery(divListProvince).setTemplate(html);
    jQuery(divListProvince).processTemplate(data);


    jQuery(divTotalDistributors).setTemplate("{$T.TotalContents}");
    jQuery(divTotalDistributors).processTemplate(data);
} 
//====================


