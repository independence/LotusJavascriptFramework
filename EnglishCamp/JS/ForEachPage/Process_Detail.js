function LoadInformationDetail(div, Value) {

    var html = "<div class='title'><span> {$T.data[0].CategoryNameLevel1} </span></div>";
    html = html + "<div id='content_detail'>";
  


    html = html + "<div  class='detail-wrap'>";

    html = html + "	<div class='information-detail clearfix'>";
    html = html + "   <div>";

    html = html + "     <div>";
    html = html + "	        <h2>{$T.data[0].Title}</h2>";
    html = html + "	        <div class='item-cat'>";
    html = html + "	             {$T.data[0].CategoryNameLevel1}";
    html = html + "	        </div>";
    html = html + "	        <div class='short-des'>";
    html = html + "	            {$T.data[0].Intro}";

    
    html = html + "	        </div>";
    html = html + "	        <div class='item-action'>";

    html = html + "	    </div>";
    html = html + "  </div>";


    html = html + "  </div>";
    html = html + "  <div class='left'>";
    html = html + "	      {$T.data[0].Info}";
    html = html + " </div>";
    html = html + "	</div>";
    html = html + "	<!-- end information-detail-->";
    html = html + "	<div class='item-action t-cen clearfix'>";
    html = html + "	</div>";
    html = html + "	</div>";
    html = html + "	</div>";

    var data = ContentsBO.Sel_ByCode(Value, 100, 140, 10, 'Contents_Code', true);

    jQuery(div).setTemplate(html);
    jQuery(div).processTemplate(data);

    html = jQuery(div).html();
    html = Encoder.htmlDecode(html);
    jQuery(div).html(html);

}
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
                        //Sel_Ext_ByKeyCodeCategoryLevel1_ByIDLang: function (KeyCodeCategoryLevel1, TitleLenght, IntroLenght, Limit, Order, IsDesc, IDLang)
    var data = ContentsBO.Sel_Ext_ByKeyCodeCategoryLevel1_ByIDLang("EN_CAT1_MENULEFT", 100, 140, 10, 'Contents_Code', true, sys_CUR_LANG);
    $(div).setTemplate(html);
    $(div).processTemplate(data);
}

//load related_posts
function LoadRelatedPostsByCategory1(div) {
    var html = "";
    html = html + "<h2>Tin liên quan</h2>";
    html = html + "	<ul>";
    html = html + "{#foreach $T.data as aContents}";
    html = html + "	                        <li><a rel='external' href='Detail.aspx?Code={$T.aContents.Contents_Code}'>{$T.aContents.Contents_Title}</a></li>																																		";
    html = html + "{#/for}";
    html = html + "	</ul>";

    $(div).html(html);

    var data = ContentsBO.Sel_Ext_ByKeyCodeCategoryLevel1_ByIDLang("EN_CAT1_TINTUCSUKIEN", 100, 140, 10, 'Contents_Code', true, sys_CUR_LANG);

    $(div).setTemplate(html);
    $(div).processTemplate(data);
}
    //Load footer1
function LoadBlockFooter1(div)
{
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
function LoadBlockFooter2(div)
{
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

function SendMail(idForm) {

    SystemUsersBO.SendMail(idForm);
}