<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="ucMenuAdmin.ascx.cs"
    Inherits="CMS.Modules.ucMenuAdmin" %>
<div id="module-menu">
    <ul id="menu">
        <!--<li class="node" id="mnuMusic" runat="server"><a><%=  CORE.CORE_Language.GetText_MasterPage(0)%></a>
            <ul>
                <li><a class="icon-16-cpanel" href="/PagesAspx/Services_Manager.aspx"><%=  CORE.CORE_Language.GetText_MasterPage(0)%></a></li>
            </ul>
        </li>-->
        <li class="node" id="Li2" runat="server"><a><%=  CORE.CORE_Language.GetText_MasterPage(1)%></a>
            <ul>
                <li><a class="icon-16-cpanel" href="/PagesAspx/VIPCustomers_Manager.aspx">Danh sách khách hàng VIP</a></li>
                <li><a class="icon-16-cpanel" href="/PagesAspx/VIPHalls_Manager.aspx">Danh sách hội trường VIP</a></li>
                <li><a class="icon-16-cpanel" href="/PagesAspx/BookingVIPHalls_New_Manager.aspx">Đặt hội trường</a></li>
            </ul>
        </li>
        <li class="node" id="mnuRank" runat="server"><a>Hội trường</a>
            <ul>
                <li><a class="icon-16-cpanel" href="/PagesAspx/Halls_Manager.aspx">Danh sách hội trường</a></li>
                <li><a class="icon-16-cpanel" href="/PagesAspx/BookingHalls_New_Manager.aspx">Đặt hội trường</a></li>
                <li><a class="icon-16-cpanel" href="/PagesAspx/BookingHalls_Online_Manager.aspx">Đặt hội trường Online</a></li>
            </ul>
        </li>
        <li class="node" id="mnuLayout" runat="server"><a>Phòng nghỉ</a>
            <ul>
                <li><a class="icon-16-cpanel" href="/PagesAspx/Rooms_Manager.aspx">Thông tin phòng</a></li>
                <li><a class="icon-16-cpanel" href="/PagesAspx/RoomProperties_Manager.aspx">Thuộc tính phòng</a></li>
                <li><a class="icon-16-cpanel" href="/PagesAspx/BookingRooms_New_Manager.aspx">Đặt phòng</a></li>
                <li><a class="icon-16-cpanel" href="/PagesAspx/BookingRooms_Online_Manager.aspx">Đặt phòng Online</a></li>
               
            </ul>
        </li>
         <li class="node" id="Li1" runat="server"><a>Albums</a>
            <ul>
                <li><a class="icon-16-cpanel" href="/PagesAspx/Albums_Manager.aspx">Albums</a></li>
                <li><a class="icon-16-cpanel" href="/PagesAspx/Images_Manager.aspx">Up ảnh</a></li>
            </ul>
        </li>

        <li class="node" id="mnuCommon" runat="server"><a>Khách hàng</a>
            <ul>
                <li><a class="icon-16-cpanel" href="/PagesAspx/Customers_Manager.aspx">Khách hàng</a></li>
            </ul>
        </li>
        <li class="node" id="Li3" runat="server"><a>Tin tức</a>
            <ul>
                <li><a class="icon-16-cpanel" href="/PagesAspx/Contents_Manager.aspx">Tin tức</a></li>
                <li><a class="icon-16-cpanel" href="/PagesAspx/Contents_History_Manager.aspx">Lịch sử</a></li>
                <li><a class="icon-16-cpanel" href="/PagesAspx/CategoryLevel1_Manager.aspx">Nhóm tin cấp 1</a></li>
                <li><a class="icon-16-cpanel" href="/PagesAspx/CategoryLevel2_Manager.aspx">Nhóm tin cấp 2</a></li>
            </ul>
        </li>
        <li class="node" id="mnuSystem" runat="server"><a>Hệ thống</a>
            <ul>
                <li><a class="icon-16-cpanel" href="/PagesAspx/SystemUsers_Manager.aspx">Người dùng</a></li>
                <li><a class="icon-16-cpanel" href="/PagesAspx/Permits_Manager.aspx">Phân quyền</a></li>
                <li><a class="icon-16-cpanel" href="/PagesAspx/PermitDetails_Manager.aspx">Danh sách các phân quyền</a></li>
                <li><a class="icon-16-cpanel" href="/PagesAspx/PermitUserMappings_Manager.aspx">Nhóm phân quyền người dùng</a></li>
                 <li><a class="icon-16-cpanel" href="/PagesAspx/Configs_Manager.aspx">Cấu hình</a></li>
                 <li><a class="icon-16-cpanel" href="/PagesAspx/Languages_Manager.aspx">Ngôn ngữ</a></li>
            </ul>
        </li>
    </ul>
    <div style="float: right; vertical-align: middle; padding-right: 20px; padding-top: 5px">
        <asp:Label runat="server" ID="lbCurrentUser"> </asp:Label>-
        <asp:Label runat="server" ID="lbCurrentPaygateId"> </asp:Label>
        <asp:LinkButton Text="Logout" runat="server" ID="btnLogout" OnClick="btnLogout_Click" />
    </div>
</div>
<div class="clr">
</div>
