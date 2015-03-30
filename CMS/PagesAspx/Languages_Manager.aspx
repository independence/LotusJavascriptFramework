<%@ Page Title="" Language="C#" MasterPageFile="~/WebDefault.Master" AutoEventWireup="True"
    CodeBehind="Languages_Manager.aspx.cs" Inherits="CMS.Languages_Manager" %>


<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="/JS/Common/Flexigrid-table/css/flexigrid.pack.css" rel="stylesheet" type="text/css" />
    <%--<script src="/JS/Common/Flexigrid-table/js/flexigrid.pack.js" type="text/javascript"></script>--%>
    <script src="/JS/Common/Flexigrid-table/js/flexigrid.js" type="text/javascript"></script>
    <script src="/JS/ForEachPage/Process_Languages.js" type="text/javascript"></script>

</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
   <input type="hidden" id="txtLANG_DATA" runat="server" clientidmode="Static" />
    <table class="flexgripLanguages" style="display: none">
    </table>
    <script type="text/javascript">
        // $(document).ready(function () {


        $(".flexgripLanguages").flexigrid({
            url: '/Action/ProcessBackendAction.ashx?ActionObject=Languages&action=Sel_Page_ForFlexigrid',
            dataType: 'json',
            method: 'GET', //data sending method
            resizable: true, //allow table resizing

            colModel: [

				    {
				        ExtendBtn: 'UPD_ROW',
                        display: 'Sửa',
                        Onpress: "ButtonProcess_UpdRow_Languages",
                        name: 'ID',
				        width: 90,
				        sortable: true,
				        align: 'center'
				    },
                    {
                    	ExtendBtn: 'DEL_ROW',
                    	display: 'Xóa',
                    	Onpress: "ButtonProcess_DelRow_Languages",
                    	name: 'ID',
                    	width: 90,
                    	sortable: true,
                    	align: 'center'
                    },

					
				    {
				        display: 'NameLang',
				        name: 'NameLang',
				        width: 90,
				        sortable: true,
				        align: 'center'
				    },
					
				    {
				        display: 'Image',
				        name: 'Image',
				        width: 90,
				        sortable: true,
				        align: 'center'
				    },
					
				    {
				        display: 'Directory',
				        name: 'Directory',
				        width: 90,
				        sortable: true,
				        align: 'center'
				    },
					
				    {
				        display: 'Filename',
				        name: 'Filename',
				        width: 90,
				        sortable: true,
				        align: 'center'
				    },
					
				    {
				        display: 'Status',
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
				        display: 'ID',
				        name: 'ID',
				        width: 90,
				        sortable: true,
				        align: 'center'
				    }

				],

            buttons: [{
                name: 'Add',
                bclass: 'add',
                onpress: ButtonProcess_Languages
            }
                  /*  ,
                    {
                        name: 'Edit',
                        bclass: 'edit',
                        onpress: ButtonProcess_Languages
                    }
                    ,
                    {
                        name: 'Delete',
                        bclass: 'delete',
                        onpress: ButtonProcess_Languages
                    }*/
                    ,
                    {
                        separator: true
                    }
                ],
            searchitems: [
			    
            		{
					    display: 'NameLang',
					    name: 'NameLang',
					    isdefault: true
					},
				
            		{
					    display: 'Image',
					    name: 'Image',
					    isdefault: true
					},
				
            		{
					    display: 'Directory',
					    name: 'Directory',
					    isdefault: true
					},
				
            		{
					    display: 'Filename',
					    name: 'Filename',
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
            title: 'Languages',
            useRp: true,
            rp: 15,
            showTableToggleBtn: true,
            width: 1000,
            height: 200,
            colMove: true

        });
        function ButtonProcess_UpdRow_Languages(IDRow) {
          //this function in Process_Languages.js
            OpenDialog_Upd_Languages(IDRow);          
        }
        function ButtonProcess_DelRow_Languages(IDRow) {
            //this function in Process_Languages.js
            var conf = confirm('Bạn có chắc muốn xóa dòng này ?') ;
            if (conf) {
                Del_Languages(IDRow);
            }
        }

        function ButtonProcess_Languages(com, grid) {
            if (com == 'Delete') {
                var conf = confirm('Delete ' + $('.trSelected', grid).length + ' items?')
                if (conf) {
                    $.each($('.trSelected', grid),
                            function (key, value) {
                                $.get('example4.php', { Delete: value.firstChild.innerText }
                                    , function () {
                                        // when ajax returns (callback), update the grid to refresh the data
                                        $(".flexgripLanguages").flexReload();
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
								
                                var aNameLang = value.children[0].innerText;
								
                                var aImage = value.children[0].innerText;
								
                                var aDirectory = value.children[0].innerText;
								
                                var aFilename = value.children[0].innerText;
								
                                var aStatus = value.children[0].innerText;
								



                                // call the ajax to save the data to the session
                                $.get('example4.php',
                                    { Edit: true
									
										, ID: aID
								        
										, NameLang: aNameLang
								        
										, Image: aImage
								        
										, Directory: aDirectory
								        
										, Filename: aFilename
								        
										, Status: aStatus
								        
                                    }
                                    , function () {
                                        // when ajax returns (callback), update the grid to refresh the data
                                        $(".flexgripLanguages").flexReload();
                                    });
                            });
                }
            }
            else if (com == 'Add') {

                OpenDialog_Ins_Languages();

            }
        }
        //   });
    </script>
</asp:Content>
