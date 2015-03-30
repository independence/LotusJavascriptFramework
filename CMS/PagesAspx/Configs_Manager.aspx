<%@ Page Title="" Language="C#" MasterPageFile="~/WebDefault.Master" AutoEventWireup="True"
    CodeBehind="Configs_Manager.aspx.cs" Inherits="CMS.Configs_Manager" %>


<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="../JS/ForEachPage/Process_Configs.js" type="text/javascript"></script>
    <link href="/JS/Common/Flexigrid-table/css/flexigrid.pack.css" rel="stylesheet" type="text/css" />
    <%--<script src="/JS/Common/Flexigrid-table/js/flexigrid.pack.js" type="text/javascript"></script>--%>
    <script src="/JS/Common/Flexigrid-table/js/flexigrid.js" type="text/javascript"></script>

</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <input type="hidden" id="txtLANG_DATA" runat="server" clientidmode="Static" />
    <table class="flexgripConfigs" style="display: none">
    </table>
    <script type="text/javascript">
        // $(document).ready(function () {


        $(".flexgripConfigs").flexigrid({
            url: '/Action/ProcessBackendAction.ashx?ActionObject=Configs&action=CMS-Sel_Page_ForFlexigrid',
            dataType: 'json',
            method: 'GET', //data sending method
            resizable: true, //allow table resizing

            colModel: [

				    {
				        ExtendBtn: 'UPD_ROW',
				        display: '<%=CORE.CORE_Language.GetText_Page(20)%>',
				        Onpress: "ButtonProcess_UpdRow_Configs",
				        name: 'ID',
				        width: 90,
				        sortable: true,
				        align: 'center'
				    },
                    {
                        ExtendBtn: 'DEL_ROW',
                        display: '<%=CORE.CORE_Language.GetText_Page(21)%>',
                        Onpress: "ButtonProcess_DelRow_Configs",
                        name: 'ID',
                        width: 90,
                        sortable: true,
                        align: 'center'
                    },

					{
					    display: '<%=CORE.CORE_Language.GetText_Page(22)%>',
					    name: 'ID',
					    width: 90,
					    sortable: true,
					    align: 'center'
					},
				    {
				        display: '<%=CORE.CORE_Language.GetText_Page(6)%>',
				        name: 'AccessKey',
				        width: 140,
				        sortable: true,
				        align: 'center'
				    },
                        
                    {
                        display: '<%=CORE.CORE_Language.GetText_Page(7)%>',
				        name: 'Value',
				        width: 90,
				        sortable: true,
				        align: 'center'
				    },

                    {
                        display: '<%=CORE.CORE_Language.GetText_Page(28)%>',
                        name: 'Note',
                        width: 90,
                        sortable: true,
                        align: 'center'
                    },
				    {
				        display: '<%=CORE.CORE_Language.GetText_Page(0)%>',
				        name: 'Status',
				        width: 90,
				        sortable: true,
				        align: 'center'
				    }

            ],

            buttons: [{
                name: 'Add',
                bclass: 'add',
                onpress: ButtonProcess_Configs
            }
                  /*  ,
                    {
                        name: 'Edit',
                        bclass: 'edit',
                        onpress: ButtonProcess_Configs
                    }
                    ,
                    {
                        name: 'Delete',
                        bclass: 'delete',
                        onpress: ButtonProcess_Configs
                    }*/
                    ,
                    {
                        separator: true
                    }
            ],
            searchitems: [

            		{
            		    display: 'AccessKey',
            		    name: 'AccessKey',
            		    isdefault: true
            		},

            		{
            		    display: 'Value',
            		    name: 'Value',
            		    isdefault: true
            		},


            		{
            		    display: 'Status',
            		    name: 'Status',
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
            title: '<%=CORE.CORE_Language.GetText_Page(24)%>',
            useRp: true,
            rp: 15,
            showTableToggleBtn: true,
            width: 1000,
            height: 500,
            colMove: true

        });
        function ButtonProcess_UpdRow_Configs(IDRow) {
            //this function in Process_Contents.js
            OpenDialog_Upd_Configs(IDRow);
        }
        function ButtonProcess_DelRow_Configs(IDRow) {
            //this function in Process_Configs.js
            var conf = confirm('<%=CORE.CORE_Language.GetText_Page(27)%>');
            if (conf) {
                Del_Configs(IDRow);
            }
        }

        function ButtonProcess_Configs(com, grid) {
            if (com == 'Add') {
                OpenDialog_Ins_Configs();
            }
        }
        //   });
    </script>
</asp:Content>

