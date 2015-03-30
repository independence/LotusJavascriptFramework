<%@ Page Title="" Language="C#" MasterPageFile="~/WebDefault.Master" AutoEventWireup="True"
    CodeBehind="PermitUserMappings_Manager.aspx.cs" Inherits="CMS.PermitUserMappings_Manager" %>


<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="/JS/ForEachPage/Process_PermitUserMappings.js" type="text/javascript"></script>
    <link href="/JS/Common/Flexigrid-table/css/flexigrid.pack.css" rel="stylesheet" type="text/css" />
    <%--<script src="/JS/Common/Flexigrid-table/js/flexigrid.pack.js" type="text/javascript"></script>--%>
    <script src="/JS/Common/Flexigrid-table/js/flexigrid.js" type="text/javascript"></script>

</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <input type="hidden" id="txtLANG_DATA" runat="server" clientidmode="Static" />
    <table class="flexgripPermitUserMappings" style="display: none">
    </table>
    <script type="text/javascript">
        // $(document).ready(function () {


        $(".flexgripPermitUserMappings").flexigrid({
            url: '/Action/ProcessBackendAction.ashx?ActionObject=PermitUserMappings&action=Sel_Page_ForFlexigrid',
            dataType: 'json',
            method: 'GET', //data sending method
            resizable: true, //allow table resizing

            colModel: [

				    {
				        ExtendBtn: 'UPD_ROW',
				        display: '<%=CORE.CORE_Language.GetText_Page(21)%>',
                        Onpress: "ButtonProcess_UpdRow_PermitUserMappings",
                        name: 'ID',
				        width: 90,
				        sortable: true,
				        align: 'center'
				    },
                    {
                    	ExtendBtn: 'DEL_ROW',
                    	display: '<%=CORE.CORE_Language.GetText_Page(22)%>',
                    	Onpress: "ButtonProcess_DelRow_PermitUserMappings",
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
				        name: 'IDUser',
				        width: 90,
				        sortable: true,
				        align: 'center'
				    },
					
				    {
				        display: '<%=CORE.CORE_Language.GetText_Page(2)%>',
				        name: 'IsView',
				        width: 90,
				        sortable: true,
				        align: 'center'
				    },
					
				    {
				        display: '<%=CORE.CORE_Language.GetText_Page(5)%>',
				        name: 'IsInsert',
				        width: 90,
				        sortable: true,
				        align: 'center'
				    },
					
				    {
				        display: '<%=CORE.CORE_Language.GetText_Page(6)%>',
				        name: 'IsUpdate',
				        width: 90,
				        sortable: true,
				        align: 'center'
				    },
					
				    {
				        display: '<%=CORE.CORE_Language.GetText_Page(7)%>',
				        name: 'IsDelete',
				        width: 90,
				        sortable: true,
				        align: 'center'
				    },
					
				    {
				        display: '<%=CORE.CORE_Language.GetText_Page(8)%>',
				        name: 'IsSpecial',
				        width: 90,
				        sortable: true,
				        align: 'center'
				    },
					
				    {
				        display: '<%=CORE.CORE_Language.GetText_Page(9)%>',
				        name: 'Description',
				        width: 90,
				        sortable: true,
				        align: 'center'
				    },
					
				    {
				        display: '<%=CORE.CORE_Language.GetText_Page(10)%>',
				        name: 'Logs',
				        width: 90,
				        sortable: true,
				        align: 'center'
				    },
					
                    {
                        display: '<%=CORE.CORE_Language.GetText_Page(11)%>',
                        name: 'Type',
                        width: 90,
                        sortable: true,
                        align: 'center'
                    },

                    {
                        display: '<%=CORE.CORE_Language.GetText_Page(17)%>',
                        name: 'Status',
                        width: 90,
                        sortable: true,
                        align: 'center'
                    },
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
					{
					    display: '<%=CORE.CORE_Language.GetText_Page(23)%>',
				        name: 'ID',
				        width: 90,
				        sortable: true,
				        align: 'center'
				    }

				],

            buttons: [{
                name: 'Add',
                bclass: 'add',
                onpress: ButtonProcess_PermitUserMappings
            }
                  /*  ,
                    {
                        name: 'Edit',
                        bclass: 'edit',
                        onpress: ButtonProcess_PermitUserMappings
                    }
                    ,
                    {
                        name: 'Delete',
                        bclass: 'delete',
                        onpress: ButtonProcess_PermitUserMappings
                    }*/
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
					    display: 'IDUser',
					    name: 'IDUser',
					    isdefault: true
					},
				
            		{
					    display: 'IsView',
					    name: 'IsView',
					    isdefault: true
					},
				
            		{
					    display: 'IsInsert',
					    name: 'IsInsert',
					    isdefault: true
					},
				
            		{
					    display: 'IsUpdate',
					    name: 'IsUpdate',
					    isdefault: true
					},
				
            		{
					    display: 'IsDelete',
					    name: 'IsDelete',
					    isdefault: true
					},
				
            		{
					    display: 'IsSpecial',
					    name: 'IsSpecial',
					    isdefault: true
					},
				
            		{
					    display: 'Description',
					    name: 'Description',
					    isdefault: true
					},
				
            		{
					    display: 'Logs',
					    name: 'Logs',
					    isdefault: true
					},
				    
                    {
                        display: 'Type',
                        name: 'Type',
                        isdefault: true
                    },

                    {
                        display: 'ActiveStatus',
                        name: 'ActiveStatus',
                        isdefault: true
                    },

				    {
				        display: 'IDPermitUserMappings',
				        name: 'ID'
				    }

				],

            sortname: "@KeyField@",
            sortorder: "asc",
            usepager: true,
            title: '<%=CORE.CORE_Language.GetText_Page(25)%>',
            useRp: true,
            rp: 15,
            showTableToggleBtn: true,
            width: 1000,
            height: 400,
            colMove: true

        });
        function ButtonProcess_UpdRow_PermitUserMappings(IDRow) {
          //this function in Process_PermitUserMappings.js
            OpenDialog_Upd_PermitUserMappings(IDRow);          
        }
        function ButtonProcess_DelRow_PermitUserMappings(IDRow) {
            //this function in Process_PermitUserMappings.js
            var conf = confirm('<%=CORE.CORE_Language.GetText_Page(28)%>');
            if (conf) {
                Del_PermitUserMappings(IDRow);
            }
        }

        function ButtonProcess_PermitUserMappings(com, grid) {
            if (com == 'Delete') {
                var conf = confirm('Delete ' + $('.trSelected', grid).length + ' items?')
                if (conf) {
                    $.each($('.trSelected', grid),
                            function (key, value) {
                                $.get('example4.php', { Delete: value.firstChild.innerText }
                                    , function () {
                                        // when ajax returns (callback), update the grid to refresh the data
                                        $(".flexgripPermitUserMappings").flexReload();
                                    });
                            });
                }
            }
            else if (com == 'Edit') {
                var conf = confirm('Edit ' + $('.trSelected', grid).length + ' items?')
                if (conf) {
                    $.each($('.trSelected', grid),
                            function (key, value) {
                                // collect the data
							
                                var aID = value.children[0].innerText;
								
                                var aIDPermit = value.children[0].innerText;
								
                                var aIDUser = value.children[0].innerText;
								
                                var aIsView = value.children[0].innerText;
								
                                var aIsInsert = value.children[0].innerText;
								
                                var aIsUpdate = value.children[0].innerText;
								
                                var aIsDelete = value.children[0].innerText;
								
                                var aIsSpecial = value.children[0].innerText;
								
                                var aDescription = value.children[0].innerText;
								
                                var aLogs = value.children[0].innerText;
								
                                var aTypePUM = value.children[0].innerText;

                                var aActiveStatusPUM = value.children[0].innerText;


                                // call the ajax to save the data to the session
                                $.get('example4.php',
                                    { Edit: true
									
										, ID: aID
								        
										, IDPermit: aIDPermit
								        
										, IDUser: aIDUser
								        
										, IsView: aIsView
								        
										, IsInsert: aIsInsert
								        
										, IsUpdate: aIsUpdate
								        
										, IsDelete: aIsDelete
								        
										, IsSpecial: aIsSpecial
								        
										, Description: aDescription
								        
										, Logs: aLogs
								        
                                        , Type: aTypePUM

								        , ActiveStatus: aActiveStatusPUM
                                    }
                                    , function () {
                                        // when ajax returns (callback), update the grid to refresh the data
                                        $(".flexgripPermitUserMappings").flexReload();
                                    });
                            });
                }
            }
            else if (com == 'Add') {

                OpenDialog_Ins_PermitUserMappings();

            }
        }
        //   });
    </script>
</asp:Content>
