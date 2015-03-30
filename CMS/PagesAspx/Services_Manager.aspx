<%@ Page Title="" Language="C#" MasterPageFile="~/WebDefault.Master" AutoEventWireup="True"
    CodeBehind="Services_Manager.aspx.cs" Inherits="CMS.Services_Manager" %>


<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
     <script src="/JS/ForEachPage/Process_Services.js" type="text/javascript"></script>
    <link href="/JS/Common/Flexigrid-table/css/flexigrid.pack.css" rel="stylesheet" type="text/css" />
    <%--<script src="/JS/Common/Flexigrid-table/js/flexigrid.pack.js" type="text/javascript"></script>--%>
    <script src="/JS/Common/Flexigrid-table/js/flexigrid.js" type="text/javascript"></script>

</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <input type="hidden" id="txtLANG_DATA" runat="server" clientidmode="Static" />
    <table class="flexgripServices" style="display: none">
    </table>
    <script type="text/javascript">
        // $(document).ready(function () {


        $(".flexgripServices").flexigrid({
            url: '/Action/ProcessBackendAction.ashx?ActionObject=Services&action=Sel_Page_ForFlexigrid',
            dataType: 'json',
            method: 'GET', //data sending method
            resizable: true, //allow table resizing

            colModel: [

				    {
				        ExtendBtn: 'UPD_ROW',
                        display: 'Sửa',
                        Onpress: "ButtonProcess_UpdRow_Services",
                        name: 'ID',
				        width: 90,
				        sortable: true,
				        align: 'center'
				    },
                    {
                    	ExtendBtn: 'DEL_ROW',
                    	display: 'Xóa',
                    	Onpress: "ButtonProcess_DelRow_Services",
                    	name: 'ID',
                    	width: 90,
                    	sortable: true,
                    	align: 'center'
                    },

				    {
				        display: 'ID',
				        name: 'ID',
				        width: 90,
				        sortable: true,
				        align: 'center'
				    },
					{
					    display: 'Mã Dịch Vụ',
					    name: 'Code',
					    width: 90,
					    sortable: true,
					    align: 'center'

					},


                    {
                        ExtendBtn: 'IMG_ROW',
                        display: 'Ảnh',
                        Onpress: "ButtonProcess_UpdRow_Halls",
                        name: 'Image',
                        widthImg: 60,
                        heightImg: 60,
                        path: "/Uploads/Services/thumb_",

                        width: 90,
                        sortable: true,
                        align: 'center'
                    },
                    {
                        display: 'Tên Dịch Vụ',
                        name: 'ServiceNameLang1',
                        width: 90,
                        sortable: true,
                        align: 'center'
                    },

					{
					    display: 'Giá Dịch Vụ',
					    name: 'CostRefLang1',
					    width: 90,
					    sortable: true,
					    align: 'center'
					},


					{
					    display: 'Đơn Vị Tính',
					    name: 'CostUnitLang1',
					    width: 90,
					    sortable: true,
					    align: 'center'
					},

					{
					    display: 'Trạng Thái',
					    name: 'Status',
					    width: 90,
					    sortable: true,
					    align: 'center'
					},


					{
					    display: 'Kiểu Dịch Vụ',
					    name: 'ServiceType',
					    width: 90,
					    sortable: true,
					    align: 'center'
					},

					{
					    display: 'Nhóm Dịch Vụ',
					    name: 'ServiceCategory',
					    width: 90,
					    sortable: true,
					    align: 'center'
					},

					{
					    display: 'Tạm Khóa',
					    name: 'Disable',
					    width: 90,
					    sortable: true,
					    align: 'center'
					}

				],

            buttons: [{
                        name: 'Add',
                        bclass: 'add',
                        onpress: ButtonProcess_Services
                    }
                    /*
                    ,
                    {
                        name: 'Edit',
                        bclass: 'edit',
                        onpress: ButtonProcess_Services
                    }
                    ,
                    {
                        name: 'Delete',
                        bclass: 'delete',
                        onpress: ButtonProcess_Services
                    }*/
                    ,
                    {
                        separator: true
                    }
                ],
            searchitems: [
            		{
					    display: 'ID',
					    name: 'ID',
					    isdefault: true
					},
				    {
				        display: 'Code',
				        name: 'Code'
				    },

				    {
				        display: 'ServiceNameLang1',
				        name: 'ServiceNameLang1'
				    },

				    {
				        display: 'CostRefLang1',
				        name: 'CostRefLang1'
				    },

				    {
				        display: 'CostUnitLang1',
				        name: 'CostUnitLang1'
				    },

				    {
				        display: 'Status',
				        name: 'Status'
				    },

				    {
				        display: 'ServiceType',
				        name: 'ServiceType'
				    },

				    {
				        display: 'ServiceCategory',
				        name: 'ServiceCategory'
				    },

				    {
				        display: 'Disable',
				        name: 'Disable'
				    }

				],

            sortname: "ID",
            sortorder: "asc",
            usepager: true,
            title: 'Services',
            useRp: true,
            rp: 20,
            showTableToggleBtn: true,
            width: 1000,
            height: 400,
            colMove: true

        });
        function ButtonProcess_UpdRow_Services(IDRow) {
            //this function in Process_Services.js
            OpenDialog_Upd_Services(IDRow);
            //$(".flexgripServices").flexReload();
            /*
            $.ready(
             OpenDialog_Upd_Services(IDRow),
              function () {
                 
                  alert("sssssssssssss"),
                  $(".flexgripServices").flexReload()
                  });
                  */
            

          
        }
        function ButtonProcess_DelRow_Services(IDRow) {
            //this function in Process_Services.js
            var conf = confirm('Bạn có chắc muốn xóa dòng này ?') ;
            if (conf) {
                Del_Services(IDRow);
            }
        }

        function ButtonProcess_Services(com, grid) {
            if (com == 'Delete') {
                var conf = confirm('Delete ' + $('.trSelected', grid).length + ' items?')
                if (conf) {
                    $.each($('.trSelected', grid),
                            function (key, value) {
                                $.get('example4.php', { Delete: value.firstChild.innerText }
                                    , function () {
                                        // when ajax returns (callback), update the grid to refresh the data
                                        $(".flexgripServices").flexReload();
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

                                var aCode = value.children[1].innerText;

                                var aServiceNameLang1 = value.children[2].innerText;

                                var aDescriptionServiceLang1 = value.children[5].innerText;

                                var aImage = value.children[11].innerText;

                                var aCostRefLang1 = value.children[12].innerText;

                                var aCostUnitLang1 = value.children[15].innerText;

                                var aStatus = value.children[18].innerText;

                                var aServiceType = value.children[22].innerText;

                                var aServiceCategory = value.children[23].innerText;

                                var aDisable = value.children[24].innerText;



                                // call the ajax to save the data to the session
                                $.get('example4.php',
                                    { Edit: true

                                        , Code: aCode

                                        , ServiceNameLang1: aServiceNameLang1

                                        , DescriptionServiceLang1: aDescriptionServiceLang1

                                        , Image: aImage

                                        , CostRefLang1: aCostRefLang1

                                        , CostUnitLang1: aCostUnitLang1

                                        , Status: aStatus

                                        , ServiceType: aServiceType

                                        , ServiceCategory: aServiceCategory

                                        , Disable: aDisable

                                        , ID: aID
                                    }
                                    , function () {
                                        // when ajax returns (callback), update the grid to refresh the data
                                        $(".flexgripServices").flexReload();
                                    });
                            });
                }
            }
            else if (com == 'Add') {

                OpenDialog_Ins_Services();
                $(".flexgripServices").flexReload();

            }
        }
        //   });
    </script>
</asp:Content>
