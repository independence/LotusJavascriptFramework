function LoadCssmenu(id) {
    var html = "";
    html = html + "<ul>";
    html = html + "   <li id='divActive' class='active'><a href=''>Giới Thiệu</a>";
    html = html + "       <ul>";
    html = html + "           <li><a href='Detail.aspx?Code=63561668753'>Lịch sử hình thành</a></li>";
    html = html + "          <li><a href='Detail.aspx?Code=63561844016'>Giáo viên tại English Camp</a></li>";
    html = html + "           <li><a href='Detail.aspx?Code=63561327196'>Tuyển dụng</a></li>";
    html = html + "        </ul>";
    html = html + "   </li>";
    html = html + "    <li><a href='Detail.aspx?Code=63561600729'>Lịch Khai Giảng</a></li>";
    html = html + "    <li class='active'><a href=''>Khóa Học</a>";
    html = html + "        <ul>";
    html = html + "           <li><a href='Detail.aspx?Code=63561264224'>Tiếng anh cơ bản</a></li>";
    html = html + "           <li><a href='Detail.aspx?Code=63561668244'>Toeic</a></li>";
    html = html + "            <li><a href='Detail.aspx?Code=63561431271'>Tiếng anh giao tiếp</a></li>";
    html = html + "            <li><a href='Detail.aspx?Code=63561265587'>lelts</a></li>";
    html = html + "        </ul>";
    html = html + "    </li>";
    html = html + "   <li><a href='ListPost.aspx?Code=63541537130'>Cảm Nhận Học Viên</a></li>";
    html = html + "   <li><a href=''>Hội Thảo Và Thi Thử</a>";
    html = html + "       <ul>";
    html = html + "           <li><a href=''>Hội Thảo</a></li>";
    html = html + "           <li><a href='ExamTest.aspx'>Thi Thử</a></li>";
    html = html + "        </ul>";
    html = html + "    </li>";
    html = html + "    <li><a href=''>Góc EC</a>";
    html = html + "        <ul>";
    html = html + "            <li><a href='ListPost.aspx?Code=63541566992'>Góc học tập</a></li>";
    html = html + "            <li><a href='ListPost.aspx?Code=63541567133'>Hoạt động EC</a></li>";
    html = html + "            <li><a href='ListPost.aspx?Code=63541566994'>Bản tin tiếng anh</a></li>";
    html = html + "        </ul>";
    html = html + "    </li>";


    html = html + "    <li><a href='ListPost.aspx?Code=63541534966'>Kết nối EC</a>";
   
    html = html + "    </li>";

    html = html + "</ul>";
    $(id).html(html);
}


function LoadMenuHeader(div) {
    var html = "";
    html = html + "	<div class='container'>	";
    html = html + "	    <div id='divTopNav' class='topNav fl'>	";
    html = html + "	        <ul>	";
    html = html + "	            <li id='menu-item-2869' class='menu-item menu-item-type-post_type menu-item-object-page menu-item-2869'><a href='Connected.aspx'>Liên hệ</a></li>	";
    html = html + "	            <li id='menu-item-2870' class='menu-item menu-item-type-post_type menu-item-object-page menu-item-2870'><a href='ListPost.aspx?Code=63541566992'>Tài Liệu EC</a></li>	";
    html = html + "	            <li id='menu-item-2871' class='menu-item menu-item-type-post_type menu-item-object-page menu-item-2871'><a href='Detail.aspx?Code=63541536550'>Tuyển dụng</a></li>	";
    html = html + "	            <li id='menu-item-10055' class='menu-item menu-item-type-post_type menu-item-object-page menu-item-10055'><a href='ListPost.aspx?Code=63541566994'>Tin Tức</a></li>	";
    html = html + "	        </ul>	";
    html = html + "	    </div>	";
    html = html + "		";
    html = html + "	    <div class='fr'>	";
    html = html + "	        <ul class='topSoc fl'>	";
    html = html + "	            <li id='menu-item-6628' class='menu-item menu-item-type-post_type menu-item-object-page menu-item-6628'><a href='Detail.aspx?Code=63562101147'>CLB English Camp</a></li>	";
    html = html + "	            <li id='menu-item-9319' class='menu-item menu-item-type-custom menu-item-object-custom menu-item-9319'><a href='Detail.aspx?Code=63562101608'>Học Bổng English Camp</a></li>	";
    html = html + "	            <li id='menu-item-3357' class='facebook menu-item menu-item-type-custom menu-item-object-custom menu-item-3357'><a href='https://www.facebook.com/englishcamp' onclick='javascript:_gaq.push(['_trackEvent','outbound-menu','http://www.facebook.com']);'>Facebook EC</a></li>	";
    html = html + "	        </ul>	";
    html = html + "		";
    html = html + "		";
    html = html + "	        <form method='get' id='searchform' action='index.html'>	";
    html = html + "	            <input type='text' class='field' name='s' id='expand' />	";
    html = html + "	        </form>	";
    html = html + "		";
    html = html + "	        <a class='language fl lang-en' title='English' href='http://beta.timevn.com/en'></a>	";
    html = html + "		";
    html = html + "	        <ul class='lang-switcher'>	";
    html = html + "	            <li class='lang-item lang-item-20 lang-item-vi current-lang'><a hreflang='vi' href='index.html'>Tiếng Việt</a></li>	";
    html = html + "	            <li class='lang-item lang-item-15 lang-item-en'><a hreflang='en' href='../en/index.html'>English</a></li>	";
    html = html + "	        </ul>	";
    html = html + "	    </div>	";
    html = html + "	</div>	";

    $(div).html(html);
    var data = ConfigsBO.Sel_ByAccessKey('EN_CAT1_MENUHEADER1');
    $(div).setTemplate(html);
    $(div).processTemplate();
}
