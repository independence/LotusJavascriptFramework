var FocusItemIndex = 1;

function ResetListProductSlide() {
    var _gamain = $('gaass215');

    var object = new GaSlideshow(_gamain,
    {
        fxObject: {
            transition: Fx.Transitions.Quad.easeInOut,
            duration: 500
        },
        startItem: 0,
        interval: 500000,
        direction: 'vrdown',
        navItemHeight: 240,
        navItemWidth: 508,
        navItemsDisplay: 3,
        autoStart: false,
        auto: false,
        navPos: 'right'
    });
    object.registerButtonsControl('click', {
        next: _gamain.getElement('.ga-next'),
        previous: _gamain.getElement('.ga-previous')
    });
    object.start(1, _gamain.getElement('.preload'));
    //-----------------------------
}

function move(index, TotalProduct, CodeCategoryLevel1) {

    var liActiveLeft = jQuery('li[class~="active"]').offset().left;

    var liClick = ".cat-list li:nth-child(" + (parseInt(index) + 1) + ")";

    var liClickLeft = jQuery(liClick).offset().left;
   
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

                         if (count == TotalProduct)
                         {

                             jQuery('li[class~="active"]').removeClass("active");
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
                
                         jQuery('li[class~="active"]').removeClass("active");
                         jQuery('span[class="show-down"]').remove();

                         jQuery("#ProductSlider_" + index).addClass("active");
                         jQuery("#ProductSlider_" + index).append("<span class='show-down'></span>");

                         //jQuery("#ProductSlider_" + index).prop("onclick", "move(" + index + "," + TotalProduct + ");");

                     }
        });

    }
 
    LoadListProduct_ByCategoryLevel1(CodeCategoryLevel1);
}

function LoadImageSlider(div) {

    var html = "	                <ul id='slide1' class='slides'>	";
    html = html + "                   {#foreach $T.Contents_Group as aContents}";
    html = html + "	                    <li> <img src='"+ sys_CommonType.URL +"/Action/ProcessImageServiceAction.ashx?W=1440&H=583&Scale=fill&Img={$T.aContents.Image}' alt='' /></li>	";
    html = html + "                   {#/for}";
    html = html + "	                </ul>	";

    var data = ContentsBO.LoadContents_ByCodeCategoryLevel1_003(51, 51,-1,"Code",true);
    jQuery(div).setTemplate(html);
    jQuery(div).processTemplate(data);

}
function LoadProductSlider(div) {
    var CodeCategoryLevel1_FocusDefault;
    var html = "	<ul id='slide2' class='cat-list clearfix'>	";
    html = html + "{#foreach $T.CategoryLevel1_Group as aCategoryLevel1}";

    html = html + "{#if $T.aCategoryLevel1$first}";
    html = html + "     <li class='first' id='ProductSlider_{$T.aCategoryLevel1$index}' onclick='move({$T.aCategoryLevel1$index},{$T.aCategoryLevel1$total},{$T.aCategoryLevel1.Code});'>";
    
    html = html + "{#elseif $T.aCategoryLevel1$index == 1}";
    html = html + "	   <li class='active' id='ProductSlider_{$T.aCategoryLevel1$index}' onclick='move({$T.aCategoryLevel1$index},{$T.aCategoryLevel1$total},{$T.aCategoryLevel1.Code});'>";
    html = html + "	   <input type='hidden' id='CodeCategoryLevel1_FocusDefault' value='{$T.aCategoryLevel1.Code}'>";

    html = html + "{#else}";
    html = html + "    <li id='ProductSlider_{$T.aCategoryLevel1$index}' onclick='move({$T.aCategoryLevel1$index},{$T.aCategoryLevel1$total},{$T.aCategoryLevel1.Code});'>";
    html = html + "{#/if}";

    html = html + "	       <div class='img'>	";
    html = html + "	           <a>	";
    html = html + "	               <img class='hide' src='"+ sys_CommonType.URL +"/Action/ProcessImageServiceAction.ashx?W=225&H=138&Scale=crop&Img={$T.aCategoryLevel1.Image}' alt='' />	";
    html = html + "	               <img  src='"+ sys_CommonType.URL +"/Action/ProcessImageServiceAction.ashx?W=225&H=138&Scale=crop&Img={$T.aCategoryLevel1.Image1}' alt='' />	";
    html = html + "	           </a>	";
    html = html + "	       </div>	";
    html = html + "	       <div class='cat-info' >	";
    html = html + "	           <h2 class='cat-name'><a href=''>{$T.aCategoryLevel1.CategoryNameLevel1}</a></h2>	";
    html = html + "	           <div class='short-des'>	";
    html = html + "	               {$T.aCategoryLevel1.Intro}";
    html = html + "	           </div>	";
    html = html + "	           <a class='readmore' >See more</a>	";



    html = html + "{#if $T.aCategoryLevel1$first}";
    html = html + "	       </div>	";
    html = html + "	   </li>	";


    html = html + "{#elseif $T.aCategoryLevel1$index == 1}";
    html = html + "	       </div>	";
    html = html + "	       <span class='show-down'></span>	";
    html = html + "	   </li>	";

    html = html + "{#else}";
    html = html + "	       </div>	";
    html = html + "	   </li>	";
    html = html + "{#/if}";



    html = html + "{#/for}";
    html = html + "</ul>";

    var data = CategoryLevel1BO.LoadCategoryLevel1_ByCodeCategoryLevel2_001(51, -1, "Code", true);

    jQuery(div).setTemplate(html);
    jQuery(div).processTemplate(data);

    html = jQuery(div).html();
    html = Encoder.htmlDecode(html);
    jQuery(div).html(html);



    var CodeCategoryLevel1_FocusDefault;
    CodeCategoryLevel1_FocusDefault = jQuery("#CodeCategoryLevel1_FocusDefault").prop("value");
    LoadListProduct_ByCategoryLevel1(CodeCategoryLevel1_FocusDefault);
}

function LoadListProduct_ByCategoryLevel1(CodeCategoryLevel1) {

    var html =    "<ul class='ga-navigator'>";
    html = html + "{#foreach $T.Contents_Group as aContents}";
    html = html + "    <li style='width: 508px; height: 240px'>	";
    html = html + "        <div class='box-product'>	";
    html = html + "            <div class='img-item'>	";
    html = html + "                <a>	";
    html = html + "                    <img width='156px' height='156px'  src='"+ sys_CommonType.URL +"/Action/ProcessImageServiceAction.ashx?W=156&H=156&Scale=crop&Img={$T.aContents.Image}' alt='' /></a>	";
    html = html + "            </div>	";
    html = html + "            <div class='intro-pro'>	";
    html = html + "                <a class='product-name' href='#'>{$T.aContents.Title}</a>	";
    html = html + "                <div class='product-desc'>	";
    html = html + "                    {$T.aContents.Intro}";
    html = html + "                </div>	";
    html = html + "            </div>	";
    html = html + "        </div>	";
    html = html + "    </li>	";
    html = html + "{#/for}";
    html = html + "</ul>	";

    var data = ContentsBO.LoadContents_ByCodeCategoryLevel1(CodeCategoryLevel1, 27, 200, 4, "Code", true);
    
    jQuery("#ListProduct").setTemplate(html);
    jQuery("#ListProduct").processTemplate(data);

    html = jQuery("#ListProduct").html();
    html = Encoder.htmlDecode(html);
    jQuery("#ListProduct").html(html);


    var html2 = "{#foreach $T.Contents_Group as aContents}";
    html2 = html2 + "<div class='ga-main-item'>	";
    html2 = html2 + "    <div class='ga-description box-list'>	";
    html2 = html2 + "        <a class='product-name' href='#'>{$T.aContents.Title}</a>	";
    html2 = html2 + "        <div class='img-item'>	";
    html2 = html2 + "            <a href='#'>	";
    html2 = html2 + "               <img width='429px' height='213px'  src='"+ sys_CommonType.URL +"/Action/ProcessImageServiceAction.ashx?W=429&H=213&Scale=crop&Img={$T.aContents.Image1}'   alt='' /></a>	";
    html2 = html2 + "        </div>	";
    html2 = html2 + "        <div class='box-content'>	{$T.aContents.Info} </div>	";

    html2 = html2 + "    </div>	";
    html2 = html2 + "</div>	";
    html = html + "{#/for}";

    jQuery("#DetailProduct").setTemplate(html2);
    jQuery("#DetailProduct").processTemplate(data);

    html2 = jQuery("#DetailProduct").html();
    html2 = Encoder.htmlDecode(html2);
    jQuery("#DetailProduct").html(html2);

    ResetListProductSlide();
}




