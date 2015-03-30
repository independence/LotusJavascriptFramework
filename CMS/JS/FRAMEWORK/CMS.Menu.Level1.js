

function InitMenu(div_MenuLevel1, div_MenuLevel2)
{

    OpenMenuLevel1(div_MenuLevel1, div_MenuLevel2);
}

function Module_CurrentUser(div) {
    var html = "";
    html = html + "	<a title='' class='leftUserDrop'>	";
    html = html + "	   <img src='/Images/user.png' alt='' /><span><strong>3</strong></span></a><span>Eugene</span>	";
    html = html + "	<ul class='leftUser'>	";
    html = html + "	   <li><a href='#' title='' class='sProfile'>My profile</a></li>	";
    html = html + "	   <li><a href='#' title='' class='sMessages'>Messages</a></li>	";
    html = html + "	   <li><a href='#' title='' class='sSettings'>Settings</a></li>	";
    html = html + "	   <li><a href='#' title='' class='sLogout'>Logout</a></li>	";
    html = html + "	</ul>	";

    $(div).html(html);

}


function OpenMenuLevel1(divMenuLevel1, divMenuLevel2) {
 
    var html = "";
    html = html + '	            <li><a id="id1" onclick="OpenMenuLevel2_1(\'' + divMenuLevel2 + '\',\'#id1\' )" title="">	';
    html = html + '	                    <img src="/Images/icons/mainnav/dashboard.png" alt="" /><span>{sys_GetText(1,\'XXX\');}</span></a></li>	';
    html = html + '	            <li><a onclick="OpenMenuLevel2_2(\'' + divMenuLevel2 + '\')"  title="">	';
    html = html + '	                    <img src="/Images/icons/mainnav/ui.png" alt="" /><span>{sys_GetText_Static(2,\'XXX\')}</span></a>	';
    html = html + '	            </li>';
    html = html + '	            <li><a onclick="OpenMenuLevel2_3(\'' + divMenuLevel2 + '\')"  title="">	';
    html = html + '	                    <img src="/Images/icons/mainnav/forms.png" alt="" /><span>{sys_GetText_Static(3,\'XXX\')}</span></a>	';
    html = html + '	            </li>';
    html = html + '	            <li><a onclick="OpenMenuLevel2_4(\'' + divMenuLevel2 + '\')" title="">	';
    html = html + '	                    <img src="/Images/icons/mainnav/messages.png" alt="" /><span>{sys_GetText_Static(4,\'XXX\')}</span></a></li>	';
    html = html + '	            <li><a onclick="OpenMenuLevel2_5(\'' + divMenuLevel2 + '\')" title="">	';
    html = html + '	                    <img src="/Images/icons/mainnav/statistics.png" alt="" /><span>{sys_GetText_Static(5,\'XXX\')}</span></a></li>	';
    html = html + '	            <li><a onclick="OpenMenuLevel2_6(\'' + divMenuLevel2 + '\')" title="" class="active">	';
    html = html + '	                    <img src="/Images/icons/mainnav/tables.png" alt="" /><span>{sys_GetText_Static(6,\'XXX\')}</span></a>	';
    html = html + '	            </li>';
    html = html + '	            <li><a onclick="OpenMenuLevel2_7(\'' + divMenuLevel2 + '\')" title="">	';
    html = html + '	                    <img src="/Images/icons/mainnav/other.png" alt="" /><span>{sys_GetText_Static(7,\'XXX\')}</span></a>	';
    html = html + '	            </li>';
  
   
    $(divMenuLevel1).setTemplate(html);

    $(divMenuLevel1).processTemplate();

    

}

function OpenMenuLevel2_1(div,id) {


    var html = "";

    html = html + '	                    <div class="divider"><span></span></div>	';
    html = html + '	                    <div id="general">	';
    html = html + '	                        <ul class="subNav">	';
    html = html + '	                            <li><a onclick="sys_LoadPage(\'Lst_Contents.htm\');" title=""><span class="icos-frames"></span>Danh sách</a></li>	';
    html = html + '	                            <li><a onclick="sys_LoadPage(\'Ins_Contents.htm\');" title=""><span class="icos-frames"></span>{sys_GetText_Static(39,\'mặc định\')}</a></li>	';
    html = html + '	                            <li><a onclick="alert(\'xxxxx\');" title="" ><span class="icos-refresh"></span>{sys_GetText(100,\'XXX\')}</a></li>	';
    html = html + '	                            <li><a href="/PagesAspx/CategoryLevel2_Manager.aspx" title=""><span class="icos-bullseye"></span>{sys_GetText_Static(10,\'XXX\')}</a></li>	';
    html = html + '	                            <li><a href="tables_sortable.html" title=""><span class="icos-transfer"></span>{sys_GetText_Static(11,\'XXX\')}</a></li>	';
    html = html + '	                        </ul>	';
    html = html + '	                        <div class="divider"><span></span></div>	';
    html = html + '	                    </div>	';


    $(div).setTemplate(html);

    $(div).processTemplate();


    var options = { percent: 0 };
    $(div).toggle("Drop");

   // alert(sys_Current_MenuLevel_1 + "-" + sys_Current_MenuLevel_2);

}
function OpenMenuLevel2_2(div) {

    $(div).html();// xóa trắng
    var html = "";

    html = html + '	                    <div class="divider"><span></span></div>	';
    html = html + '	                    <div id="general">	';
    html = html + '	                        <ul class="subNav">	';
    html = html + '	                            <li><a href="tables.html" title=""><span class="icos-frames"></span>{sys_GetText_Static(40,\'XXX\')}</a></li>	';
    html = html + '	                            <li><a href="tables_dynamic.html" title="" class="this"><span class="icos-refresh"></span>{sys_GetText_Static(41,\'XXX\')}</a></li>	';
    html = html + '	                            <li><a href="tables_control.html" title=""><span class="icos-bullseye"></span>{sys_GetText_Master(42)}</a></li>	';
    html = html + '	                            <li><a href="tables_sortable.html" title=""><span class="icos-transfer"></span>{sys_GetText_Master(43)}</a></li>	';
    html = html + '	                        </ul>	';
    html = html + '	                        <div class="divider"><span></span></div>	';
    html = html + '	                    </div>	';

    $(div).setTemplate(html);
    $(div).processTemplate();
    var options = { percent: 0 };
    $(div).toggle("Drop");
}
function OpenMenuLevel2_3(div) {

    $(div).html();// xóa trắng
    var html = "";

    html = html + '	                    <div class="divider"><span></span></div>	';
    html = html + '	                    <div id="general">	';
    html = html + '	                        <ul class="subNav">	';
    html = html + '	                            <li><a href="tables.html" title=""><span class="icos-frames"></span>{sys_GetText_Master(12)}</a></li>	';
    html = html + '	                            <li><a href="tables_dynamic.html" title="" class="this"><span class="icos-refresh"></span>{sys_GetText_Master(13)}</a></li>	';
    html = html + '	                            <li><a href="tables_control.html" title=""><span class="icos-bullseye"></span>{sys_GetText_Master(14)}</a></li>	';
    html = html + '	                            <li><a href="tables_sortable.html" title=""><span class="icos-transfer"></span>{sys_GetText_Master(15)}</a></li>	';
    html = html + '	                        </ul>	';
    html = html + '	                        <div class="divider"><span></span></div>	';
    html = html + '	                    </div>	';

    $(div).setTemplate(html);
    $(div).processTemplate();
    var options = { percent: 0 };
    $(div).toggle("Drop");
}
function OpenMenuLevel2_4(div) {
    $(div).html();// xóa trắng
    var html = "";

    html = html + '	                    <div class="divider"><span></span></div>	';
    html = html + '	                    <div id="general">	';
    html = html + '	                        <ul class="subNav">	';
    html = html + '	                            <li><a href="tables.html" title=""><span class="icos-frames"></span>{sys_GetText_Master(16)}</a></li>	';
    html = html + '	                            <li><a href="tables_dynamic.html" title="" class="this"><span class="icos-refresh"></span>{sys_GetText_Master(17)}</a></li>	';
    html = html + '	                            <li><a href="tables_control.html" title=""><span class="icos-bullseye"></span>{sys_GetText_Master(18)}</a></li>	';
    html = html + '	                            <li><a href="tables_sortable.html" title=""><span class="icos-transfer"></span>{sys_GetText_Master(19)}</a></li>	';
    html = html + '	                        </ul>	';
    html = html + '	                        <div class="divider"><span></span></div>	';
    html = html + '	                    </div>	';

    $(div).setTemplate(html);
    $(div).processTemplate();
    var options = { percent: 0 };
    $(div).toggle("Drop");
}
function OpenMenuLevel2_5(div) {
    $(div).html();// xóa trắng
    var html = "";

    html = html + '	                    <div class="divider"><span></span></div>	';
    html = html + '	                    <div id="general">	';
    html = html + '	                        <ul class="subNav">	';
    html = html + '	                            <li><a href="tables.html" title=""><span class="icos-frames"></span>{sys_GetText_Master(20)}</a></li>	';
    html = html + '	                            <li><a href="tables_dynamic.html" title="" class="this"><span class="icos-refresh"></span>{sys_GetText_Master(21)}</a></li>	';
    html = html + '	                            <li><a href="tables_control.html" title=""><span class="icos-bullseye"></span>{sys_GetText_Master(22)}</a></li>	';
    html = html + '	                            <li><a href="tables_sortable.html" title=""><span class="icos-transfer"></span>{sys_GetText_Master(23)}</a></li>	';
    html = html + '	                        </ul>	';
    html = html + '	                        <div class="divider"><span></span></div>	';
    html = html + '	                    </div>	';

    $(div).setTemplate(html);
    $(div).processTemplate();
    var options = { percent: 0 };
    $(div).toggle("Drop");
}
function OpenMenuLevel2_6(div) {
    $(div).html();// xóa trắng
    var html = "";

    html = html + '	                    <div class="divider"><span></span></div>	';
    html = html + '	                    <div id="general">	';
    html = html + '	                        <ul class="subNav">	';
    html = html + '	                            <li><a href="tables.html" title=""><span class="icos-frames"></span>{sys_GetText_Master(24)}</a></li>	';
    html = html + '	                            <li><a href="tables_dynamic.html" title="" class="this"><span class="icos-refresh"></span>{sys_GetText_Master(25)}</a></li>	';
    html = html + '	                            <li><a href="tables_control.html" title=""><span class="icos-bullseye"></span>{sys_GetText_Master(26)}</a></li>	';
    html = html + '	                            <li><a href="tables_sortable.html" title=""><span class="icos-transfer"></span>{sys_GetText_Master(27)}</a></li>	';
    html = html + '	                        </ul>	';
    html = html + '	                        <div class="divider"><span></span></div>	';
    html = html + '	                    </div>	';

    $(div).setTemplate(html);
    $(div).processTemplate();
    var options = { percent: 0 };
    $(div).toggle("Drop");
}
function OpenMenuLevel2_7(div) {
    $(div).html();// xóa trắng
    var html = "";

    html = html + '	                    <div class="divider"><span></span></div>	';
    html = html + '	                    <div id="general">	';
    html = html + '	                        <ul class="subNav">	';
    html = html + '	                            <li><a href="tables.html" title=""><span class="icos-frames"></span>{sys_GetText_Master(28)}</a></li>	';
    html = html + '	                            <li><a href="tables_dynamic.html" title="" class="this"><span class="icos-refresh"></span>{sys_GetText_Master(29)}</a></li>	';
    html = html + '	                            <li><a href="tables_control.html" title=""><span class="icos-bullseye"></span>{sys_GetText_Master(30)}</a></li>	';
    html = html + '	                            <li><a href="tables_sortable.html" title=""><span class="icos-transfer"></span>{sys_GetText_Master(31)}</a></li>	';
    html = html + '	                        </ul>	';
    html = html + '	                        <div class="divider"><span></span></div>	';
    html = html + '	                    </div>	';

    $(div).setTemplate(html);
    $(div).processTemplate();
    var options = { percent: 0 };
    $(div).toggle("Drop");
}
function OpenMenuLevel2_8(div) {
    $(div).html();// xóa trắng
    var html = "";

    html = html + '	                    <div class="divider"><span></span></div>	';
    html = html + '	                    <div id="general">	';
    html = html + '	                        <ul class="subNav">	';
    html = html + '	                            <li><a href="tables.html" title=""><span class="icos-frames"></span>{sys_GetText_Master(32)}</a></li>	';
    html = html + '	                            <li><a href="tables_dynamic.html" title="" class="this"><span class="icos-refresh"></span>{sys_GetText_Master(33)}</a></li>	';
    html = html + '	                            <li><a href="tables_control.html" title=""><span class="icos-bullseye"></span>{sys_GetText_Master(34)}</a></li>	';
    html = html + '	                            <li><a href="tables_sortable.html" title=""><span class="icos-transfer"></span>{sys_GetText_Master(35)}</a></li>	';
    html = html + '	                        </ul>	';
    html = html + '	                        <div class="divider"><span></span></div>	';
    html = html + '	                    </div>	';

    $(div).setTemplate(html);
    $(div).processTemplate();
    var options = { percent: 0 };
    $(div).toggle("Drop");
}
function OpenMenuLevel2_9(div) {
    $(div).html();// xóa trắng
    var html = "";

    html = html + '	                    <div class="divider"><span></span></div>	';
    html = html + '	                    <div id="general">	';
    html = html + '	                        <ul class="subNav">	';
    html = html + '	                            <li><a href="tables.html" title=""><span class="icos-frames"></span>{sys_GetText_Master(36)}</a></li>	';
    html = html + '	                            <li><a href="tables_dynamic.html" title="" class="this"><span class="icos-refresh"></span>{sys_GetText_Master(37)}</a></li>	';
    html = html + '	                            <li><a href="tables_control.html" title=""><span class="icos-bullseye"></span>{sys_GetText_Master(38)}</a></li>	';
    html = html + '	                            <li><a href="tables_sortable.html" title=""><span class="icos-transfer"></span>{sys_GetText_Master(39)}</a></li>	';
    html = html + '	                        </ul>	';
    html = html + '	                        <div class="divider"><span></span></div>	';
    html = html + '	                    </div>	';

    $(div).setTemplate(html);
    $(div).processTemplate();
    var options = { percent: 0 };
    $(div).toggle("Drop");
}
