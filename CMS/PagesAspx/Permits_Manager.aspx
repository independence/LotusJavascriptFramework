<%@ Page Title="" Language="C#" MasterPageFile="~/WebDefault.Master" AutoEventWireup="True"
    CodeBehind="Permits_Manager.aspx.cs" Inherits="CMS.Permits_Manager" %>


<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="/JS/ForEachPage/Process_Permits.js" type="text/javascript"></script>
    <link href="/JS/Common/Flexigrid-table/css/flexigrid.pack.css" rel="stylesheet" type="text/css" />
    <%--<script src="/JS/Common/Flexigrid-table/js/flexigrid.pack.js" type="text/javascript"></script>--%>
    <script src="/JS/Common/Flexigrid-table/js/flexigrid.js" type="text/javascript"></script>

</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <input type="hidden" id="txtLANG_DATA" runat="server" clientidmode="Static" />
    <table class="flexgripPermits" style="display: none">
    </table>
    <script type="text/javascript">
        // $(document).ready(function () {


        $(".flexgripPermits").flexigrid({
            url: '/Action/ProcessBackendAction.ashx?ActionObject=Permits&action=Sel_Page_ForFlexigrid',
            dataType: 'json',
            method: 'GET', //data sending method
            resizable: true, //allow table resizing

            colModel: [

				    {
				        ExtendBtn: 'UPD_ROW',
				        display: '<%=CORE.CORE_Language.GetText_Page(16)%>',
                        Onpress: "ButtonProcess_UpdRow_Permits",
                        name: 'ID',
				        width: 90,
				        sortable: true,
				        align: 'center'
				    },
                    {
                    	ExtendBtn: 'DEL_ROW',
                    	display: '<%=CORE.CORE_Language.GetText_Page(17)%>',
                    	Onpress: "ButtonProcess_DelRow_Permits",
                    	name: 'ID',
                    	width: 90,
                    	sortable: true,
                    	align: 'center'
                    },

                    {
                        display: '<%=CORE.CORE_Language.GetText_Page(18)%>',
                        name: 'ID',
                        width: 90,
                        sortable: true,
                        align: 'center'
                    },
					
				    {
				        display: '<%=CORE.CORE_Language.GetText_Page(0)%>',
				        name: 'Name',
				        width: 90,
				        sortable: true,
				        align: 'center'
				    },
					
				    {
				        display: '<%=CORE.CORE_Language.GetText_Page(1)%>',
				        name: 'IsAdmin',
				        width: 90,
				        sortable: true,
				        align: 'center'
				    },
					
				    {
				        display: '<%=CORE.CORE_Language.GetText_Page(4)%>',
				        name: 'IsContent',
				        width: 90,
				        sortable: true,
				        align: 'center'
				    },
					
				    {
				        display: '<%=CORE.CORE_Language.GetText_Page(5)%>',
				        name: 'IsPartner',
				        width: 90,
				        sortable: true,
				        align: 'center'
				    },
					
                    {
                        display: '<%=CORE.CORE_Language.GetText_Page(6)%>',
                        name: 'Type',
                        width: 90,
                        sortable: true,
                        align: 'center'
                    },

                    {
                        display: '<%=CORE.CORE_Language.GetText_Page(12)%>',
                        name: 'Status',
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
                onpress: ButtonProcess_Permits
            }
                  /*  ,
                    {
                        name: 'Edit',
                        bclass: 'edit',
                        onpress: ButtonProcess_Permits
                    }
                    ,
                    {
                        name: 'Delete',
                        bclass: 'delete',
                        onpress: ButtonProcess_Permits
                    }*/
                    ,
                    {
                        separator: true
                    }
                ],
            searchitems: [
				    {
				        display: 'ID',
				        name: 'ID'
				    },

            		{
					    display: 'Name',
					    name: 'Name',
					    isdefault: true
					},
				
            		{
					    display: 'IsAdmin',
					    name: 'IsAdmin',
					    isdefault: true
					},
				
            		{
					    display: 'IsContent',
					    name: 'IsContent',
					    isdefault: true
					},
				
            		{
					    display: 'IsPartner',
					    name: 'IsPartner',
					    isdefault: true
					},
				
                     {
                         display: 'Type',
                         name: 'Type',
                         isdefault: true
                     },

                    {
                        display: 'Status',
                        name: 'Status',
                        isdefault: true
                    }
				],

            sortname: "@KeyField@",
            sortorder: "asc",
            usepager: true,
            title: '<%=CORE.CORE_Language.GetText_Page(20)%>',
            useRp: true,
            rp: 15,
            showTableToggleBtn: true,
            width: 1000,
            height: 400,
            colMove: true

        });
        function ButtonProcess_UpdRow_Permits(IDRow) {
          //this function in Process_Permits.js
            OpenDialog_Upd_Permits(IDRow);          
        }
        function ButtonProcess_DelRow_Permits(IDRow) {
            //this function in Process_Permits.js
            var conf = confirm('<%=CORE.CORE_Language.GetText_Page(23)%>');
            if (conf) {
                Del_Permits(IDRow);
            }
        }

        function ButtonProcess_Permits(com, grid) {
            OpenDialog_Ins_Permits();
        }

    </script>
</asp:Content>
