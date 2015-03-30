//Load menu right
function LoadMenuLeft(div) {
    var html = "";

    html = html + "	<ul id='list1'>						";
    html = html + "{#foreach $T.data as aContents}";
    //Begin li
    html = html + "	                        <li class='link1'>						";
    html = html + "	                            <p><a href='Detail.aspx?Code={$T.aContents.Contents_Code}'>{$T.aContents.Contents_Title}</a></p>						";
    html = html + "	                            <span class='entypo-home'></span>						";
    html = html + "	                        </li>						";
    //end li
    html = html + "{#/for}";
    html = html + "	                    </ul>						";

    $(div).html(html);

    var data = ContentsBO.Sel_Ext_ByKeyCodeCategoryLevel1_ByIDLang("EN_CAT1_MENULEFT", 25, 140, 10, 'Contents_Code', true, sys_CUR_LANG);

    $(div).setTemplate(html);
    $(div).processTemplate(data);
}
//Load footer1
function LoadBlockFooter1(div) {
    var html = "";

    html = html + "	<div class='block fl'>	";
    html = html + "	                    <h3>Giới thiệu</h3>	";
    html = html + "	                    <ul>	";
    html = html + "{#foreach $T.data as aContents}";
    html = html + "	                        <li id='menu-item-755' class='menu-item menu-item-type-post_type menu-item-object-page menu-item-755'><a href='Detail.aspx?Code={$T.aContents.Contents_Code}'>{$T.aContents.Contents_Title}</a></li>	";
    html = html + "{#/for}";
    html = html + "	                    </ul>	";
    html = html + "	                </div>	";

    $(div).html(html);


    var data = ContentsBO.Sel_Ext_ByKeyCodeCategoryLevel1_ByIDLang("EN_CAT1_BLOCKFOOTER1", 40, 140, 4, 'Contents_Code', true, sys_CUR_LANG);

    $(div).setTemplate(html);
    $(div).processTemplate(data);
}
//Load footer2
function LoadBlockFooter2(div) {
    var html = "";

    html = html + "	<div id='divBlockF2' class='block fl'>	";
    html = html + "	                    <h3>Khóa học Tiếng Anh</h3>	";
    html = html + "	                    <ul>	";
    html = html + "{#foreach $T.data as aContents}";
    html = html + "	                        <li id='menu-item-800' class='menu-item menu-item-type-post_type menu-item-object-page menu-item-800'><a href='Detail.aspx?Code={$T.aContents.Contents_Code}'>{$T.aContents.Contents_Title}</a></li>	";
    html = html + "{#/for}";
    html = html + "	                    </ul>	";
    html = html + "	                </div>	";

    $(div).html(html);
    var data = ContentsBO.Sel_Ext_ByKeyCodeCategoryLevel1_ByIDLang("EN_CAT1_BLOCKFOOTER2", 40, 140, 4, 'Contents_Code', true, sys_CUR_LANG);

    $(div).setTemplate(html);
    $(div).processTemplate(data);
}

//Load footer3
function LoadBlockFooter3(div) {
    var html = "";

    html = html + "	<div id='divBlockF3' class='block fl'>	";
    html = html + "	                    <h3>Góc EC</h3>	";
    html = html + "	                    <ul>	";
    html = html + "{#foreach $T.data as aContents}";
    html = html + "	                        <li id='menu-item-650' class='menu-item menu-item-type-post_type menu-item-object-page menu-item-650'><a href='Detail.aspx?Code={$T.aContents.Contents_Code}'>{$T.aContents.Contents_Title}</a></li>	";
    html = html + "{#/for}";
    html = html + "	                    </ul>	";
    html = html + "	                </div>	";

    $(div).html(html);

    var data = ContentsBO.Sel_Ext_ByKeyCodeCategoryLevel1_ByIDLang("EN_CAT1_BLOCKFOOTER3", 40, 140, 4, 'Contents_Code', true, sys_CUR_LANG);

    $(div).setTemplate(html);
    $(div).processTemplate(data);
}

//Load footer4
function LoadBlockFooter4(div) {
    var html = "";

    html = html + "	<div id='divBlockF4' class='block fl'>	";
    html = html + "	                    <h3>Kết nối EC</h3>	";
    html = html + "	                    <ul>	";
    html = html + "{#foreach $T.data as aContents}";
    html = html + "	                        <li id='menu-item-350' class='menu-item menu-item-type-post_type menu-item-object-page menu-item-350'><a href='Detail.aspx?Code={$T.aContents.Contents_Code}'>{$T.aContents.Contents_Title}</a></li>	";
    html = html + "{#/for}";
    html = html + "	                    </ul>	";
    html = html + "	                </div>	";

    $(div).html(html);

    var data = ContentsBO.Sel_Ext_ByKeyCodeCategoryLevel1_ByIDLang("EN_CAT1_BLOCKFOOTER4", 40, 140, 4, 'Contents_Code', true, sys_CUR_LANG);

    $(div).setTemplate(html);
    $(div).processTemplate(data);
}

//Load footer5
function LoadBlockFooter5(div) {
    var html = "";

    html = html + "	<div id='divBlockF5' class='block fl'>	";
    html = html + "	                    <h3>Tuyển dụng</h3>	";
    html = html + "	                    <ul>	";
    html = html + "{#foreach $T.data as aContents}";
    html = html + "	                        <li id='menu-item-940' class='menu-item menu-item-type-post_type menu-item-object-page menu-item-350'><a href='Detail.aspx?Code={$T.aContents.Contents_Code}'>{$T.aContents.Contents_Title}</a></li>	";
    html = html + "{#/for}";
    html = html + "	                    </ul>	";
    html = html + "	                </div>	";

    $(div).html(html);

    var data = ContentsBO.Sel_Ext_ByKeyCodeCategoryLevel1_ByIDLang("EN_CAT1_BLOCKFOOTER5", 40, 140, 4, 'Contents_Code', true, sys_CUR_LANG);

    $(div).setTemplate(html);
    $(div).processTemplate(data);
}
//Load news
function LoadNewsByCategory1(div, Value) {
																																											
    var html = "";
    html = html + "<h2>Tin tức mới nhất</h2>";
    html = html + "{#foreach $T.CategoryLevel1 as aContents}";
    html = html + "	                        <div class='news_events_contentItem'>";
    html = html + "	                            <div class='leftContent fl'>";
    html = html + "	                                <a href='Detail.aspx'>";
    html = html + "	                                    <img src='{sys_CommonType.URL_CMS}/Action/ProcessImageServiceAction.ashx?W=180&H=123&Scale=Crop&Img={$T.KeyCodeCategoryLevel1.Image}' />";
    html = html + "	                                </a>";
    html = html + "	                            </div>";
    html = html + "	";
    html = html + "	                            <div class='rightContent fl'>";
    html = html + "	                                <h4><a href='Detail.aspx?Code={$T.aContents.Contents_Value}'>{$T.aContents.Contents_Title}</a></h4>";
    html = html + "	                                <p>{$T.aContents.Contents_Intro}</p>";
    html = html + "	                                <p class='readMore'><a href='Detail.aspx?Code={$T.aContents.Contents_Value}'>Đọc thêm...</a></p>";
    html = html + "	                            </div>";
    html = html + "	                        </div>";
    html = html + "{#/for}";


    var data = ContentsBO.Sel_Ext_ByKeyCodeCategoryLevel1_ByIDLang("EN_CAT1_TINTUCSUKIEN", 25, 140, 10, 'Contents_Code', true, sys_CUR_LANG);

    $(div).html(html);
    $(div).setTemplate(html);
    $(div).processTemplate(data);
    html = $(div).html();
    //html = Encoder.htmlDecode(html)

}

function LoadListInformation(div, CodeCat1) {
    
    var html = "";
    html = html + "<h2>{$T.data[0].CategoryLevel1_CategoryNameLevel1}</h2>";
    html = html + "{#foreach $T.data as Item}";
    html = html + "	                        <div class='news_events_contentItem'>";
    html = html + "	                            <div class='leftContent fl'>";
    html = html + "	                                <a href='Detail.aspx?Code={$T.Item.Contents_Code}'>";
    html = html + "	                                    <img src='{sys_CommonType.URL_CMS}/Action/ProcessImageServiceAction.ashx?W=180&H=123&Scale=Crop&Img={$T.Item.Contents_Image}' />";
    html = html + "	                                </a>";
    html = html + "	                            </div>";
    html = html + "	";
    html = html + "	                            <div class='rightContent fl'>";
    html = html + "	                                <h4><a href='Detail.aspx?Code={$T.Item.Contents_Code}'>{$T.Item.Contents_Title}</a></h4>";
    html = html + "	                                <p>{$T.Item.Contents_Intro}</p>";
    html = html + "	                                <p class='readMore'><a href='Detail.aspx?Code={$T.Item.Contents_Code}'>Đọc thêm...</a></p>";
    html = html + "	                            </div>";
    html = html + "	                        </div>";
    html = html + "{#/for}";


    //(CodeCategoryLevel1, TitleLenght, IntroLenght, Limit, Order, IsDesc, IDLang
    var data = ContentsBO.Sel_Ext_ByCodeCategoryLevel1_ByIDLang(CodeCat1, 100, 140, 20, 'Contents_Code', true, sys_CUR_LANG);

    jQuery(div).setTemplate(html);
    jQuery(div).processTemplate(data);

    html = jQuery(div).html();
    html = Encoder.htmlDecode(html);
    jQuery(div).html(html);

}
