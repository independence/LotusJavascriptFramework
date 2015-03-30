<%@ Page Title="" Language="C#" MasterPageFile="~/WebDefault.Master" AutoEventWireup="True"
    CodeBehind="Files_Manager.aspx.cs" Inherits="CMS.Files_Manager" %>


<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="/JS/ForEachPage/Process_Files.js" type="text/javascript"></script>
    <link href="/JS/Common/Flexigrid-table/css/flexigrid.pack.css" rel="stylesheet" type="text/css" />
    <%--<script src="/JS/Common/Flexigrid-table/js/flexigrid.pack.js" type="text/javascript"></script>--%>
    <script src="/JS/Common/Flexigrid-table/js/flexigrid.js" type="text/javascript"></script>

</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <input type="hidden" id="txtLANG_DATA" runat="server" clientidmode="Static" />
    <table class="admintable" width="50%">
        <tr>
            <td class="key">
                <%=CORE.CORE_Language.GetText_Page(30)%>
            </td>
            <td class="paramlist_key">
                <div id="Div_FocusAlbum">
                </div>
            </td>
        </tr>
    </table>
    <br/><br/>
    <table class="flexgripFiles" style="display: none">
    </table>
    <script type="text/javascript">
        FillAlbumsDataToDropdowList_ForLoadImage("#Div_FocusAlbum", "[Show All]");


        $(".flexgripFiles").flexigrid({
            url: '/Action/ProcessBackendAction.ashx?ActionObject=Files&action=CMS-Sel_Page_ForFlexigrid',
            dataType: 'json',
            method: 'GET', //data sending method
            resizable: true, //allow table resizing

            colModel: [

				    {
				        ExtendBtn: 'UPD_ROW',
				        display: '<%=CORE.CORE_Language.GetText_Page(28)%>',
                        Onpress: "ButtonProcess_UpdRow_Files",
                        name: 'ID',
				        width: 90,
				        sortable: true,
				        align: 'center'
				    },
                    {
                    	ExtendBtn: 'DEL_ROW',
                    	display: '<%=CORE.CORE_Language.GetText_Page(29)%>',
                    	Onpress: "ButtonProcess_DelRow_Files",
                    	name: 'ID',
                    	width: 90,
                    	sortable: true,
                    	align: 'center'
                    },
					{
					    ExtendBtn: 'IMG_ROW',
					    display: '<%=CORE.CORE_Language.GetText_Page(11)%>',
					    Onpress: "ButtonProcess_UpdRow_Files",
					    name: 'Image',
					    widthImg: 60,
					    heightImg: 60,
					    path: "/Uploads/thumb_",

					    width: 90,
					    sortable: true,
					    align: 'center'
					},
					
				    {
				        display: '<%=CORE.CORE_Language.GetText_Page(9)%>',
				        name: 'Width',
				        width: 90,
				        sortable: true,
				        align: 'center'
				    },
					
				    {
				        display: '<%=CORE.CORE_Language.GetText_Page(10)%>',
				        name: 'Height',
				        width: 90,
				        sortable: true,
				        align: 'center'
				    },
				    {
				        display: '<%=CORE.CORE_Language.GetText_Page(1)%>',
				        name: 'UploadDate',
				        width: 90,
				        sortable: true,
				        align: 'center'
				    },
					
				    {
				        display: '<%=CORE.CORE_Language.GetText_Page(2)%>',
				        name: 'CreateByIDUser',
				        width: 90,
				        sortable: true,
				        align: 'center'
				    },
					{
					    display: '<%=CORE.CORE_Language.GetText_Page(27)%>',
					    name: 'Info',
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
					
				    {
				        display: '<%=CORE.CORE_Language.GetText_Page(3)%>',
				        name: 'Type',
				        width: 90,
				        sortable: true,
				        align: 'center'
				    },
					
				    {
				        display: '<%=CORE.CORE_Language.GetText_Page(23)%>',
				        name: 'Disable',
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
					    display: '<%=CORE.CORE_Language.GetText_Page(31)%>',
				        name: 'ID',
				        width: 90,
				        sortable: true,
				        align: 'center'
				    }

				],

            buttons: [
            {
                name: 'Add File',
                bclass: 'add',
                onpress: ButtonProcess_File
            }
                  /*  ,
                    {
                        name: 'Edit',
                        bclass: 'edit',
                        onpress: ButtonProcess_Files
                    }
                    ,
                    {
                        name: 'Delete',
                        bclass: 'delete',
                        onpress: ButtonProcess_Files
                    }*/
                    ,
                    {
                        separator: true
                    }
                ],
            searchitems: [
			    
            		{
					    display: 'AlbumID',
					    name: 'AlbumID',
					    isdefault: true
					},
				
            		{
					    display: 'Image',
					    name: 'Image',
					    isdefault: true
					},
				
            		{
					    display: 'InfoLang1',
					    name: 'InfoLang1',
					    isdefault: true
					},
				
            		{
					    display: 'InfoLang2',
					    name: 'InfoLang2',
					    isdefault: true
					},
				
            		{
					    display: 'InfoLang3',
					    name: 'InfoLang3',
					    isdefault: true
					},
				
            		{
					    display: 'UploadDate',
					    name: 'UploadDate',
					    isdefault: true
					},
				
            		{
					    display: 'CreateByUserID',
					    name: 'CreateByUserID',
					    isdefault: true
					},
				
            		{
					    display: 'Status',
					    name: 'Status',
					    isdefault: true
					},
				
            		{
					    display: 'Type',
					    name: 'Type',
					    isdefault: true
					},
				
            		{
					    display: 'Disable',
					    name: 'Disable',
					    isdefault: true
					},
				
            		{
					    display: 'Width',
					    name: 'Width',
					    isdefault: true
					},
				
            		{
					    display: 'Height',
					    name: 'Height',
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
            title: '<%=CORE.CORE_Language.GetText_Page(32)%>',
            useRp: true,
            rp: 15,
            showTableToggleBtn: true,
            width: 1000,
            height: 200,
            colMove: true

        });
        function ButtonProcess_UpdRow_Files(IDRow) {
          //this function in Process_Files.js
            OpenDialog_Upd_Files(IDRow);          
        }
        function ButtonProcess_DelRow_Files(IDRow) {
            //this function in Process_Files.js
            var conf = confirm('<%=CORE.CORE_Language.GetText_Page(35)%>');
            if (conf) {
                Del_Files(IDRow);
            }
        }

        function ButtonProcess_Files(com, grid) {
            if (com == 'Delete') {
                var conf = confirm('Delete ' + $('.trSelected', grid).length + ' items?')
                if (conf) {
                    $.each($('.trSelected', grid),
                            function (key, value) {
                                $.get('example4.php', { Delete: value.firstChild.innerText }
                                    , function () {
                                        // when ajax returns (callback), update the grid to refresh the data
                                        $(".flexgripFiles").flexReload();
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
								
                                var aAlbumID = value.children[0].innerText;
								
                                var aImage = value.children[0].innerText;
								
                                var aInfoLang1 = value.children[0].innerText;
								
                                var aInfoLang2 = value.children[0].innerText;
								
                                var aInfoLang3 = value.children[0].innerText;
								
                                var aUploadDate = value.children[0].innerText;
								
                                var aCreateByUserID = value.children[0].innerText;
								
                                var aStatus = value.children[0].innerText;
								
                                var aType = value.children[0].innerText;
								
                                var aDisable = value.children[0].innerText;
								
                                var aWidth = value.children[0].innerText;
								
                                var aHeight = value.children[0].innerText;
								



                                // call the ajax to save the data to the session
                                $.get('example4.php',
                                    { Edit: true
									
										, ID: aID
								        
										, AlbumID: aAlbumID
								        
										, Image: aImage
								        
										, InfoLang1: aInfoLang1
								        
										, InfoLang2: aInfoLang2
								        
										, InfoLang3: aInfoLang3
								        
										, UploadDate: aUploadDate
								        
										, CreateByUserID: aCreateByUserID
								        
										, Status: aStatus
								        
										, Type: aType
								        
										, Disable: aDisable
								        
										, Width: aWidth
								        
										, Height: aHeight
								        
                                    }
                                    , function () {
                                        // when ajax returns (callback), update the grid to refresh the data
                                        $(".flexgripFiles").flexReload();
                                    });
                            });
                }
            }
            else if (com == 'Add Image') {

                OpenDialog_Ins_Files();

            }
        }

        function ButtonProcess_File()
        { OpenDialog_Ins_Files(); };
        //   });
    </script>

</asp:Content>
