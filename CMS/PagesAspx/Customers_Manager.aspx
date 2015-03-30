<%@ Page Title="" Language="C#" MasterPageFile="~/WebDefault.Master" AutoEventWireup="True"
    CodeBehind="Customers_Manager.aspx.cs" Inherits="CMS.Customers_Manager" %>


<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="/JS/ForEachPage/Process_Customers.js" type="text/javascript"></script>
    <link href="/JS/Common/Flexigrid-table/css/flexigrid.pack.css" rel="stylesheet" type="text/css" />
    <%--<script src="/JS/Common/Flexigrid-table/js/flexigrid.pack.js" type="text/javascript"></script>--%>
    <script src="/JS/Common/Flexigrid-table/js/flexigrid.js" type="text/javascript"></script>

</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <input type="hidden" id="txtLANG_DATA" runat="server" clientidmode="Static" />
    <table class="flexgripCustomers" style="display: none">
    </table>
    <script type="text/javascript">
        // $(document).ready(function () {


        $(".flexgripCustomers").flexigrid({
            url: '/Action/ProcessBackendAction.ashx?ActionObject=Customers&action=CMS-Sel_Page_ForFlexigrid_Customers',
            dataType: 'json',
            method: 'GET', //data sending method
            resizable: true, //allow table resizing

            colModel: [

				    {
				        ExtendBtn: 'UPD_ROW',
				        display: '<%=CORE.CORE_Language.GetText_Page(17)%>',
                        Onpress: "ButtonProcess_UpdRow_Customers",
                        name: 'ID',
				        width: 90,
				        sortable: true,
				        align: 'center'
				    },
                    {
                    	ExtendBtn: 'DEL_ROW',
                    	display: '<%=CORE.CORE_Language.GetText_Page(18)%>',
                    	Onpress: "ButtonProcess_DelRow_Customers",
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
				        display: '<%=CORE.CORE_Language.GetText_Page(6)%>',
				        name: 'CMT',
				        width: 90,
				        sortable: true,
				        align: 'center'
				    },
					
				    {
				        display: '<%=CORE.CORE_Language.GetText_Page(7)%>',
				        name: 'Visa',
				        width: 90,
				        sortable: true,
				        align: 'center'
				    },
					
				    {
				        display: '<%=CORE.CORE_Language.GetText_Page(5)%>',
				        name: 'Tel',
				        width: 90,
				        sortable: true,
				        align: 'center'
				    },
				    {
				        display: '<%=CORE.CORE_Language.GetText_Page(4)%>',
				        name: 'Birthday',
				        width: 90,
				        sortable: true,
				        align: 'center'
				    },
					
				    {
				        display: '<%=CORE.CORE_Language.GetText_Page(11)%>',
				        name: 'Status',
				        width: 90,
				        sortable: true,
				        align: 'center'
				    },
					
				    {
				        display: '<%=CORE.CORE_Language.GetText_Page(1)%>',
				        name: 'Disable',
				        width: 90,
				        sortable: true,
				        align: 'center'
				    },
					
				    {
				        display: '<%=CORE.CORE_Language.GetText_Page(8)%>',
				        name: 'Note',
				        width: 90,
				        sortable: true,
				        align: 'center'
				    },
					
				    {
				        display: '<%=CORE.CORE_Language.GetText_Page(19)%>',
				        name: 'ID',
				        width: 90,
				        sortable: true,
				        align: 'center'
				    }


				],

            buttons: [{
                name: 'Add',
                bclass: 'add',
                onpress: ButtonProcess_Customers
            }
                    ,
                    {
                        name: 'Edit',
                        bclass: 'edit',
                        onpress: ButtonProcess_Customers
                    }
                    ,
                    {
                        name: 'Delete',
                        bclass: 'delete',
                        onpress: ButtonProcess_Customers
                    }
                    ,
                    {
                        separator: true
                    }
                ],
            searchitems: [
			    
            		{
					    display: 'CMT',
					    name: 'CMT',
					    isdefault: true
					},
				
            		{
					    display: 'Visa',
					    name: 'Visa',
					    isdefault: true
					},
				
            		{
					    display: 'Tel',
					    name: 'Tel',
					    isdefault: true
					},
				
            		{
					    display: 'Nationa',
					    name: 'Nationa',
					    isdefault: true
					},
				
            		{
					    display: 'Name',
					    name: 'Name',
					    isdefault: true
					},
				
            		{
					    display: 'Birthday',
					    name: 'Birthday',
					    isdefault: true
					},
				
            		{
					    display: 'Status',
					    name: 'Status',
					    isdefault: true
					},
				
            		{
					    display: 'Disable',
					    name: 'Disable',
					    isdefault: true
					},
				
            		{
					    display: 'Note',
					    name: 'Note',
					    isdefault: true
					},
				

				    {
				        display: 'ID',
				        name: 'ID'
				    }

				],

            sortname: "@KeyField@",
            sortorder: "asc",
            usepager: true,
            title: 'Customers',
            useRp: true,
            rp: 15,
            showTableToggleBtn: true,
            width: 1000,
            height: 200,
            colMove: true

        });
        function ButtonProcess_UpdRow_Customers(IDRow) {
          //this function in Process_Customers.js
            OpenDialog_Upd_Customers(IDRow);          
        }
        function ButtonProcess_DelRow_Customers(IDRow) {
            //this function in Process_Customers.js
            var conf = confirm('Bạn có chắc muốn xóa dòng này ?') ;
            if (conf) {
                Del_Customers(IDRow);
            }
        }

        function ButtonProcess_Customers() {
            OpenDialog_Ins_Customers();
           // $(".flexgripCustomers").flexReload();
        }

    </script>
</asp:Content>
