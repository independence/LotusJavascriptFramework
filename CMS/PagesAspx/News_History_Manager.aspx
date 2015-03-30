<%@ Page Title="" Language="C#" MasterPageFile="~/WebDefault.Master" AutoEventWireup="True"
    CodeBehind="Contents_History_Manager.aspx.cs" Inherits="CMS.Contents_History_Manager" %>


<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="/JS/ForEachPage/Process_Contents_History.js" type="text/javascript"></script>
    <link href="/JS/Common/Flexigrid-table/css/flexigrid.pack.css" rel="stylesheet" type="text/css" />
    <%--<script src="/JS/Common/Flexigrid-table/js/flexigrid.pack.js" type="text/javascript"></script>--%>
    <script src="/JS/Common/Flexigrid-table/js/flexigrid.js" type="text/javascript"></script>

</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">

     <input type="hidden" id="txtLANG_DATA" runat="server" clientidmode="Static" />
    <table class="flexgripContents" style="display: none">
    </table>
    <script type="text/javascript">
        // $(document).ready(function () {


        $(".flexgripContents").flexigrid({
            url: '/Action/ProcessBackendAction.ashx?ActionObject=Contents&action=CMS-Sel_Page_ForFlexigrid_ByCategoryLevel1&GroupContents=History',
            dataType: 'json',
            method: 'GET', //data sending method
            resizable: true, //allow table resizing

            colModel: [

				    {
				        ExtendBtn: 'UPD_ROW',
				        display: 'Sửa',
				        Onpress: "ButtonProcess_UpdRow_Contents",
				        name: 'ID',
				        width: 90,
				        sortable: true,
				        align: 'center'
				    },
                    {
                        ExtendBtn: 'DEL_ROW',
                        display: 'Xóa',
                        Onpress: "ButtonProcess_DelRow_Contents",
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
					    ExtendBtn: 'IMG_ROW',
					    display: 'Ảnh',
					    Onpress: "ButtonProcess_UpdRow_Halls",
					    name: 'Image',
					    widthImg: 60,
					    heightImg: 60,
					    path: "/Uploads/Contents/thumb_",

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
				        display: 'Mốc',
				        name: 'Title',
				        width: 90,
				        sortable: true,
				        align: 'center'
				    },


				    {
				        display: 'Tạo bởi',
				        name: 'CreatedBy',
				        width: 90,
				        sortable: true,
				        align: 'center'
				    },

				    {
				        display: 'CodeCategoryLevel1',
				        name: 'CodeCategoryLevel1',
				        width: 90,
				        sortable: true,
				        align: 'center'
				    },

				    {
				        display: 'Người sửa',
				        name: 'UpdateBy',
				        width: 90,
				        sortable: true,
				        align: 'center'
				    },

				    {
				        display: 'Trạng thái',
				        name: 'Status',
				        width: 90,
				        sortable: true,
				        align: 'center'
				    },

				    {
				        display: 'Khóa',
				        name: 'Disable',
				        width: 90,
				        sortable: true,
				        align: 'center'
				    }

            ],

            buttons: [{
                name: 'Add',
                bclass: 'add',
                onpress: ButtonProcess_Contents
            }
            /*  ,
            {
            name: 'Edit',
            bclass: 'edit',
            onpress: ButtonProcess_Contents
            }
            ,
            {
            name: 'Delete',
            bclass: 'delete',
            onpress: ButtonProcess_Contents
            }*/
                    ,
                    {
                        separator: true
                    }
            ],
            searchitems: [

            		{
            		    display: 'Type',
            		    name: 'Type',
            		    isdefault: true
            		},

            		{
            		    display: 'Title',
            		    name: 'Title',
            		    isdefault: true
            		},


            		{
            		    display: 'Info',
            		    name: 'Info',
            		    isdefault: true
            		},


            		{
            		    display: 'Intro',
            		    name: 'Intro',
            		    isdefault: true
            		},

            		{
            		    display: 'Status',
            		    name: 'Status',
            		    isdefault: true
            		},

            		{
            		    display: 'CreatedBy',
            		    name: 'CreatedBy',
            		    isdefault: true
            		},

            		{
            		    display: 'Disable',
            		    name: 'Disable',
            		    isdefault: true
            		},

            		{
            		    display: 'Tag',
            		    name: 'Tag',
            		    isdefault: true
            		},

            		{
            		    display: 'UpdateBy',
            		    name: 'UpdateBy',
            		    isdefault: true
            		},

            		{
            		    display: 'CodeCategoryLevel1',
            		    name: 'CodeCategoryLevel1',
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
            title: 'Lịch sử',
            useRp: true,
            rp: 15,
            showTableToggleBtn: true,
            width: 1000,
            height: 500,
            colMove: true

        });
        function ButtonProcess_UpdRow_Contents(IDRow) {
            //this function in Process_Contents.js
            OpenDialog_Upd_Contents(IDRow);
        }
        function ButtonProcess_DelRow_Contents(IDRow) {
            //this function in Process_Contents.js
            var conf = confirm('Bạn có chắc muốn xóa dòng này ?');
            if (conf) {
                Del_Contents(IDRow);
            }
        }

        function ButtonProcess_Contents(com, grid) {
            if (com == 'Add') {

                OpenDialog_Ins_Contents();

            }
        }
        //   });
    </script>
</asp:Content>
