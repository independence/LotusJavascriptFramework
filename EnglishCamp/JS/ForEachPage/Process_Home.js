

// Load latestUpdates
function LoadLatestUpdatesByCategory1(div) {
    var html = "";
   
    html = html + "	<div class='LatestUpdates'>	";
    html = html + "	                <h2><a href='ListPost.aspx'>Cảm nhận học viên</a></h2>	";
    html = html + "    <ul> ";
    html = html + "{#foreach $T.data as aContents}";
    //Begin li
    html = html + "						<li class='contentItem fl '>";
    html = html + "							<div>";
    html = html + "								<a href='Detail.aspx?Code={$T.aContents.Contents_Code}'>";
    html = html + "									<img width='200' height='110' src='{sys_CommonType.URL_CMS}/Action/ProcessImageServiceAction.ashx?W=200&H=110&Scale=crop&Img={$T.aContents.Contents_Image}' class='attachment-recent-thumbnails wp-post-image' alt='english camp' />				";
    html = html + "								</a>";
    html = html + "							</div>	";

    html = html + "							<div>";
    html = html + "								<h4><a href='Detail.aspx?Code={$T.aContents.Contents_Code}'>{$T.aContents.Contents_Title}</a></h4>					";
    html = html + "								<p class='readMore'><a href='Detail.aspx?Code={$T.aContents.Contents_Code}'>Đọc thêm...</a></p>					";
    html = html + "							</div>						";
    html = html + "						</li>";
    //end li
    html = html + "{#/for}";
    html = html + "					</ul> ";
    html = html + "</div> ";

    $(div).html(html);

    var data = ContentsBO.Sel_Ext_ByKeyCodeCategoryLevel1_ByIDLang("EN_CAT1_CAMNHANHOCVIEN", 80, 140, 10, 'Contents_Code', true, sys_CUR_LANG);

    
    $(div).setTemplate(html);
    $(div).processTemplate(data);
}

// Load hotnews
function LoadHotNewsByCategory1(div) {
    var html = "";

    html = html + "<div class='hotNews'>";
    html = html + "                    <h2><a href=''>Góc học tập</a></h2>";


    html = html + "	<ul>";
    html = html + "{#foreach $T.data as aContents}";
    html = html + "	                            <li><a href='Detail.aspx?Code={$T.aContents.Contents_Code}'>{$T.aContents.Contents_Title}</a></li>		";
    html = html + "{#/for}";
    html = html + "</ul>";

    //html = html + "<a class='hotNews_more' href='ListPost.aspx?Code=63541537218'>Xem tất cả...</a>";
    html = html + "</div>";

    $(div).html(html);


    var data = ContentsBO.Sel_Ext_ByKeyCodeCategoryLevel1_ByIDLang("EN_CAT1_GOCHOCTAP", 100, 140, 10, 'Contents_Code', true, sys_CUR_LANG);

    $(div).setTemplate(html);
    $(div).processTemplate(data);
}

//Load slider2
function LoadCarouselByCategory1(div) {
    var html = "";
    //html = html + "	<div class='carousel_home'>	";
    //html = html + "	                <h2>Bảng Tin Tiếng Anh</h2>		";
    html = html + "	<ul id='carousel_home'>";
    html = html + "{#foreach $T.data as aContents}";
    html = html + "	                    <li>	";
    html = html + "	                        <a class='courses_home' href='Detail.aspx?Code={$T.aContents.Contents_Code}'>	";
    html = html + "	                            <img width='213' height='127' src='{sys_CommonType.URL_CMS}/Action/ProcessImageServiceAction.ashx?W=200&H=110&Scale=crop&Img={$T.aContents.Contents_Image}' class='attachment-recent-thumbnails wp-post-image' alt='' />	";
    html = html + "	                        </a>	";
    html = html + "	                    </li>	";
    html = html + "{#/for}";
    html = html + "	                </ul>	";
    //html = html + "</div>";

    $(div).html(html);
    var data = ContentsBO.Sel_Ext_ByKeyCodeCategoryLevel1_ByIDLang("EN_CAT1_SLIDERIMAGE", 100, 140, 10, 'Contents_Code', true, sys_CUR_LANG);

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

//Load big slider
function LoadBigSlider(div) {
    var html = "";


    html = html + "{#foreach $T.data as aContents}";
    html = html + "	                    <a href='Home.aspx'>							";
    html = html + "	                        <img width='974' height='259' src='{sys_CommonType.URL_CMS}/Action/ProcessImageServiceAction.ashx?W=974&H=259&Scale=crop&Img={$T.aContents.Contents_Image}' class='attachment-recent-thumbnails wp-post-imager' alt='' />	";
    html = html + "{#/for}";


    $(div).html(html);
    var data = ContentsBO.Sel_Ext_ByKeyCodeCategoryLevel1_ByIDLang("EN_CAT1_BIGSLIDE", 25, 140, 10, 'Contents_Code', true, sys_CUR_LANG);
    $(div).setTemplate(html);
    $(div).processTemplate(data);
}