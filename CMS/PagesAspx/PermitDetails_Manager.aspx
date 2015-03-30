<%@ Page Title="" Language="C#" MasterPageFile="~/WebDefault.Master" AutoEventWireup="True"
    CodeBehind="PermitDetails_Manager.aspx.cs" Inherits="CMS.PermitDetails_Manager" %>


<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="/JS/ForEachPage/Process_PermitDetails.js" type="text/javascript"></script>
    <link href="/JS/Common/Flexigrid-table/css/flexigrid.pack.css" rel="stylesheet" type="text/css" />
    <%--<script src="/JS/Common/Flexigrid-table/js/flexigrid.pack.js" type="text/javascript"></script>--%>
    <script src="/JS/Common/Flexigrid-table/js/flexigrid.js" type="text/javascript"></script>

</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <input type="hidden" id="txtLANG_DATA" runat="server" clientidmode="Static" />
    <table class="flexgripPermitDetails" style="display: none">
    </table>
    <script type="text/javascript">
        // $(document).ready(function () {


        $(".flexgripPermitDetails").flexigrid({
            url: '/Action/ProcessBackendAction.ashx?ActionObject=PermitDetails&action=Sel_Page_ForFlexigrid',
            dataType: 'json',
            method: 'GET', //data sending method
            resizable: true, //allow table resizing

            colModel: [

				    {
				        ExtendBtn: 'UPD_ROW',
				        display: '<%=CORE.CORE_Language.GetText_Page(13)%>',
                        Onpress: "ButtonProcess_UpdRow_PermitDetails",
                        name: 'ID',
				        width: 90,
				        sortable: true,
				        align: 'center'
				    },
                    {
                    	ExtendBtn: 'DEL_ROW',
                    	display: '<%=CORE.CORE_Language.GetText_Page(14)%>',
                    	Onpress: "ButtonProcess_DelRow_PermitDetails",
                    	name: 'ID',
                    	width: 90,
                    	sortable: true,
                    	align: 'center'
                    },

					
				    {
				        display: '<%=CORE.CORE_Language.GetText_Page(0)%>',
				        name: 'IDPermit',
				        width: 90,
				        sortable: true,
				        align: 'center'
				    },
					
				    {
				        display: '<%=CORE.CORE_Language.GetText_Page(1)%>',
				        name: 'Name',
				        width: 90,
				        sortable: true,
				        align: 'center'
				    },
					
				    {
				        display: '<%=CORE.CORE_Language.GetText_Page(2)%>',
				        name: 'PageURL',
				        width: 90,
				        sortable: true,
				        align: 'center'
				    },
					
                    {
                        display: '<%=CORE.CORE_Language.GetText_Page(3)%>',
                        name: 'Type',
                        width: 90,
                        sortable: true,
                        align: 'center'
                    },

                    {
                        display: '<%=CORE.CORE_Language.GetText_Page(9)%>',
                        name: 'Status',
                        width: 90,
                        sortable: true,
                        align: 'center'
                    },

					{
					    display: '<%=CORE.CORE_Language.GetText_Page(15)%>',
				        name: 'ID',
				        width: 90,
				        sortable: true,
				        align: 'center'
				    }

				],

            buttons: [{
                name: 'Add',
                bclass: 'add',
                onpress: ButtonProcess_PermitDetails
            }

                    ,
                    {
                        separator: true
                    }
                ],
            searchitems: [
			    
            		{
					    display: 'IDPermit',
					    name: 'IDPermit',
					    isdefault: true
					},
				
            		{
            		    display: 'Name',
            		    name: 'Name',
					    isdefault: true
					},
				
            		{
					    display: 'PageURL',
					    name: 'PageURL',
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
                    },
				

				    {
				        display: 'IDPermitDetails',
				        name: 'ID'
				    }

				],

            sortname: "@KeyField@",
            sortorder: "asc",
            usepager: true,
            title: '<%=CORE.CORE_Language.GetText_Page(17)%>',
            useRp: true,
            rp: 15,
            showTableToggleBtn: true,
            width: 1000,
            height: 400,
            colMove: true

        });
        function ButtonProcess_UpdRow_PermitDetails(IDRow) {
          //this function in Process_PermitDetails.js
            OpenDialog_Upd_PermitDetails(IDRow);          
        }
        function ButtonProcess_DelRow_PermitDetails(IDRow) {
            //this function in Process_PermitDetails.js
            var conf = confirm('<%=CORE.CORE_Language.GetText_Page(20)%>');
            if (conf) {
                Del_PermitDetails(IDRow);
            }
        }

        function ButtonProcess_PermitDetails() {
            OpenDialog_Ins_PermitDetails();
        }
        //   });
    </script>
</asp:Content>
