<%@ Page Title="" Language="C#" MasterPageFile="~/WebDefault.Master" AutoEventWireup="True"
    CodeBehind="ExtendProperties_Manager.aspx.cs" Inherits="CMS.ExtendProperties_Manager" %>


<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="/JS/Common/Flexigrid-table/css/flexigrid.pack.css" rel="stylesheet" type="text/css" />
    <%--<script src="/JS/Common/Flexigrid-table/js/flexigrid.pack.js" type="text/javascript"></script>--%>
    <script src="/JS/Common/Flexigrid-table/js/flexigrid.js" type="text/javascript"></script>

</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <input type="hidden" id="txtLANG_DATA" runat="server" clientidmode="Static" />
    <table class="flexgripExtendProperties" style="display: none">
    </table>
    <script type="text/javascript">
        // $(document).ready(function () {


        $(".flexgripExtendProperties").flexigrid({
            url: '/Action/ProcessBackendAction.ashx?ActionObject=ExtendProperties&action=Sel_Page_ForFlexigrid',
            dataType: 'json',
            method: 'GET', //data sending method
            resizable: true, //allow table resizing

            colModel: [

				    {
				        ExtendBtn: 'UPD_ROW',
                        display: 'Sửa',
                        Onpress: "ButtonProcess_UpdRow_ExtendProperties",
                        name: 'ID',
				        width: 90,
				        sortable: true,
				        align: 'center'
				    },
                    {
                    	ExtendBtn: 'DEL_ROW',
                    	display: 'Xóa',
                    	Onpress: "ButtonProcess_DelRow_ExtendProperties",
                    	name: 'ID',
                    	width: 90,
                    	sortable: true,
                    	align: 'center'
                    },

					
				    {
				        display: 'Name',
				        name: 'Name',
				        width: 90,
				        sortable: true,
				        align: 'center'
				    },
					
				    {
				        display: 'Value',
				        name: 'Value',
				        width: 90,
				        sortable: true,
				        align: 'center'
				    },
					
				    {
				        display: 'ValueType',
				        name: 'ValueType',
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
				        display: 'Code',
				        name: 'Code',
				        width: 90,
				        sortable: true,
				        align: 'center'
				    },
					
				    {
				        display: 'IDObject',
				        name: 'IDObject',
				        width: 90,
				        sortable: true,
				        align: 'center'
				    },
					
				    {
				        display: 'ObjectType',
				        name: 'ObjectType',
				        width: 90,
				        sortable: true,
				        align: 'center'
				    },
					
				    {
				        display: 'IDLang',
				        name: 'IDLang',
				        width: 90,
				        sortable: true,
				        align: 'center'
				    },
					
				    {
				        display: 'Type',
				        name: 'Type',
				        width: 90,
				        sortable: true,
				        align: 'center'
				    },
					
				    {
				        display: 'Group',
				        name: 'Group',
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
                onpress: ButtonProcess_ExtendProperties
            }
                  /*  ,
                    {
                        name: 'Edit',
                        bclass: 'edit',
                        onpress: ButtonProcess_ExtendProperties
                    }
                    ,
                    {
                        name: 'Delete',
                        bclass: 'delete',
                        onpress: ButtonProcess_ExtendProperties
                    }*/
                    ,
                    {
                        separator: true
                    }
                ],
            searchitems: [
			    
            		{
					    display: 'Name',
					    name: 'Name',
					    isdefault: true
					},
				
            		{
					    display: 'Value',
					    name: 'Value',
					    isdefault: true
					},
				
            		{
					    display: 'ValueType',
					    name: 'ValueType',
					    isdefault: true
					},
				
            		{
					    display: 'Image',
					    name: 'Image',
					    isdefault: true
					},
				
            		{
					    display: 'Code',
					    name: 'Code',
					    isdefault: true
					},
				
            		{
					    display: 'IDObject',
					    name: 'IDObject',
					    isdefault: true
					},
				
            		{
					    display: 'ObjectType',
					    name: 'ObjectType',
					    isdefault: true
					},
				
            		{
					    display: 'IDLang',
					    name: 'IDLang',
					    isdefault: true
					},
				
            		{
					    display: 'Type',
					    name: 'Type',
					    isdefault: true
					},
				
            		{
					    display: 'Group',
					    name: 'Group',
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
            title: 'ExtendProperties',
            useRp: true,
            rp: 15,
            showTableToggleBtn: true,
            width: 1000,
            height: 200,
            colMove: true

        });
        function ButtonProcess_UpdRow_ExtendProperties(IDRow) {
          //this function in Process_ExtendProperties.js
            OpenDialog_Upd_ExtendProperties(IDRow);          
        }
        function ButtonProcess_DelRow_ExtendProperties(IDRow) {
            //this function in Process_ExtendProperties.js
            var conf = confirm('Bạn có chắc muốn xóa dòng này ?') ;
            if (conf) {
                Del_ExtendProperties(IDRow);
            }
        }

        function ButtonProcess_ExtendProperties(com, grid) {
            if (com == 'Delete') {
                var conf = confirm('Delete ' + $('.trSelected', grid).length + ' items?')
                if (conf) {
                    $.each($('.trSelected', grid),
                            function (key, value) {
                                $.get('example4.php', { Delete: value.firstChild.innerText }
                                    , function () {
                                        // when ajax returns (callback), update the grid to refresh the data
                                        $(".flexgripExtendProperties").flexReload();
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
								
                                var aName = value.children[0].innerText;
								
                                var aValue = value.children[0].innerText;
								
                                var aValueType = value.children[0].innerText;
								
                                var aImage = value.children[0].innerText;
								
                                var aCode = value.children[0].innerText;
								
                                var aIDObject = value.children[0].innerText;
								
                                var aObjectType = value.children[0].innerText;
								
                                var aIDLang = value.children[0].innerText;
								
                                var aType = value.children[0].innerText;
								
                                var aGroup = value.children[0].innerText;
								
                                var aStatus = value.children[0].innerText;
								



                                // call the ajax to save the data to the session
                                $.get('example4.php',
                                    { Edit: true
									
										, ID: aID
								        
										, Name: aName
								        
										, Value: aValue
								        
										, ValueType: aValueType
								        
										, Image: aImage
								        
										, Code: aCode
								        
										, IDObject: aIDObject
								        
										, ObjectType: aObjectType
								        
										, IDLang: aIDLang
								        
										, Type: aType
								        
										, Group: aGroup
								        
										, Status: aStatus
								        
                                    }
                                    , function () {
                                        // when ajax returns (callback), update the grid to refresh the data
                                        $(".flexgripExtendProperties").flexReload();
                                    });
                            });
                }
            }
            else if (com == 'Add') {

                OpenDialog_Ins_ExtendProperties();

            }
        }
        //   });
    </script>
</asp:Content>
