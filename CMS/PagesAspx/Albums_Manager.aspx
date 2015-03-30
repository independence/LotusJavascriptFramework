<%@ Page Title="" Language="C#" MasterPageFile="~/WebDefault.Master" AutoEventWireup="True"
    CodeBehind="Albums_Manager.aspx.cs" Inherits="CMS.Albums_Manager" %>


<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="/JS/ForEachPage/Process_Albums.js" type="text/javascript"></script>
    <link href="/JS/Common/Flexigrid-table/css/flexigrid.pack.css" rel="stylesheet" type="text/css" />
    <%--<script src="/JS/Common/Flexigrid-table/js/flexigrid.pack.js" type="text/javascript"></script>--%>
    <script src="/JS/Common/Flexigrid-table/js/flexigrid.js" type="text/javascript"></script>

</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <input type="hidden" id="txtLANG_DATA" name="txtLANG_DATA" runat="server" clientidmode="Static" />
    <table class="flexgripAlbums" style="display: none">
    </table>
    <script type="text/javascript">
        // $(document).ready(function () {


        $(".flexgripAlbums").flexigrid({
            url: '/Action/ProcessBackendAction.ashx?ActionObject=Albums&action=CMS-Sel_Page_ForFlexigrid',
            dataType: 'json',
            method: 'GET', //data sending method
            resizable: true, //allow table resizing

            colModel: [

				    {
				        ExtendBtn: 'UPD_ROW',
				        display: '<%=CORE.CORE_Language.GetText_Page(22)%>',
                        Onpress: "ButtonProcess_UpdRow_Albums",
                        name: 'ID',
				        width: 45,
				        sortable: true,
				        align: 'center'
				    },
                    {
                    	ExtendBtn: 'DEL_ROW',
                    	display: '<%=CORE.CORE_Language.GetText_Page(23)%>',
                    	Onpress: "ButtonProcess_DelRow_Albums",
                    	name: 'ID',
                    	width: 45,
                    	sortable: true,
                    	align: 'center'
                    },
                    {
                        ExtendBtn: 'DIS_ROW',
                        display: '<%=CORE.CORE_Language.GetText_Page(29)%>',
                        Onpress: "ButtonProcess_DisRow_Albums",
                        name: 'ID',
                        width: 45,
                        sortable: true,
                        align: 'center'
                    },
					{
					    display: '<%=   CORE.CORE_Language.GetText_Page(24)%>',
				        name: 'ID',
				        width: 45,
				        sortable: true,
				        align: 'center'
				    },
                    {
                        ExtendBtn: 'IMG_ROW',
                        display: '<%=   CORE.CORE_Language.GetText_Page(3)%>',
                        Onpress: "ButtonProcess_UpdRow_Albums",
                        name: 'Image',
                        widthImg: 60,
                        heightImg: 60,
                        path: "/Uploads/thumb_",

                        width: 80,
                        sortable: true,
                        align: 'center'
                    },
				    {
				        display: '<%=   CORE.CORE_Language.GetText_Page(6)%>',
				        name: 'Title',
				        width: 130,
				        sortable: true,
				        align: 'center'
				    },
					
				    {
				        display: '<%=   CORE.CORE_Language.GetText_Page(7)%>',
				        name: 'Intro',
				        width: 130,
				        sortable: true,
				        align: 'center'
				    },
                    {
                    	display: '<%=   CORE.CORE_Language.GetText_Page(24)%>',
                    	name: 'Code',
                    	width: 90,
                    	sortable: true,
                    	align: 'center'
                    },
					
				    {
				        display: '<%=   CORE.CORE_Language.GetText_Page(0)%>',
				        name: 'CreateDate',
				        width: 90,
				        sortable: true,
				        align: 'center'
				    },
					
				    {
				        display: '<%=   CORE.CORE_Language.GetText_Page(1)%>',
				        name: 'CreateByIDUser',
				        width: 90,
				        sortable: true,
				        align: 'center'
				    },
					
				    {
				        display: '<%=   CORE.CORE_Language.GetText_Page(2)%>',
				        name: 'Type',
				        width: 30,
				        sortable: true,
				        align: 'center'
				    },

				    {
				        display: '<%=   CORE.CORE_Language.GetText_Page(4)%>',
				        name: 'Status',
				        width: 70,
				        sortable: true,
				        align: 'center'
				    },

				    {
				        display: '<%=   CORE.CORE_Language.GetText_Page(5)%>',
				        name: 'Disable',
				        width: 60,
				        sortable: true,
				        align: 'center'
				    },

				    {
				        display: '<%=   CORE.CORE_Language.GetText_Page(5)%>',
				        name: 'ViewCount',
				        width: 90,
				        sortable: true,
				        align: 'center'
				    },

				    {
				        display: '<%=   CORE.CORE_Language.GetText_Page(5)%>',
				        name: 'DownloadCount',
				        width: 90,
				        sortable: true,
				        align: 'center'
				    }
					
				    /*
                    {
                        ExtendBtn: 'IMG_ROW',
                        display: 'Ảnh',
                        Onpress: "ButtonProcess_UpdRow_Halls",
                        name: 'Image',
                        widthImg: 60,
                        heightImg: 60,
                        path: "/Uploads/Halls/thumb_",

                        width: 90,
                        sortable: true,
                        align: 'center'
                    },
					*/


				],

            buttons: [{
                name: 'Add',
                bclass: 'add',
                onpress: ButtonProcess_Albums
            }
                  /*  ,
                    {
                        name: 'Edit',
                        bclass: 'edit',
                        onpress: ButtonProcess_Albums
                    }
                    ,
                    {
                        name: 'Delete',
                        bclass: 'delete',
                        onpress: ButtonProcess_Albums
                    }*/
                    ,
                    {
                        separator: true
                    }
                ],
            searchitems: [
			    
            		{
					    display: 'Tên',
					    name: 'Name',
					    isdefault: true
					},
				
				
            		{
					    display: 'Thông tin',
					    name: 'InfoAlbum',
					    isdefault: true
					},
			
				
            		{
					    display: 'Mô tả',
					    name: 'DescriptionAlbum',
					    isdefault: true
					},

            		{
					    display: 'Trạng thái',
					    name: 'Status',
					    isdefault: true
					},
				
            		{
					    display: 'Tạm khóa',
					    name: 'Disable',
					    isdefault: true
					},
				
            		{
					    display: 'CreateDate',
					    name: 'CreateDate',
					    isdefault: true
					},
				
            		{
            		    display: 'CreateByIDUser',
					    name: 'CreateByIDUser',
					    isdefault: true
					},
				
            		{
					    display: 'Kiểu album',
					    name: 'Type',
					    isdefault: true
					},
				

				    {
				        display: 'Mã',
				        name: 'ID'
				    }

				],

            sortname: "@KeyField@",
            sortorder: "asc",
            usepager: true,
            title: '<%=   CORE.CORE_Language.GetText_Page(26)%>',
            useRp: true,
            rp: 15,
            showTableToggleBtn: true,
            width: 1000,
            height: 500,
            colMove: true

        });
        function ButtonProcess_UpdRow_Albums(IDRow) {
          //this function in Process_Albums.js
            OpenDialog_Upd_Albums(IDRow);          
        }
        function ButtonProcess_DelRow_Albums(IDRow) {
            //this function in Process_Albums.js
            var conf = confirm('<%=   CORE.CORE_Language.GetText_Page(28)%>');
            if (conf) {
                Del_Albums(IDRow);
            }
        }
        function ButtonProcess_DisRow_Albums(IDRow) {
            //this function in Process_Albums.js
            var conf = confirm('<%=   CORE.CORE_Language.GetText_Page(30)%>');
            if (conf) {
                Dis_Albums(IDRow);
            }
        }

        function ButtonProcess_Albums() {
            OpenDialog_Ins_Albums();
        }
        //   });
    </script>
</asp:Content>
