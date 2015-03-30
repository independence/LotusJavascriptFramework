<%@ Page Title="" Language="C#" MasterPageFile="~/WebDefault.Master" AutoEventWireup="True"
    CodeBehind="CategoryLevel1_Manager.aspx.cs" Inherits="CMS.CategoryLevel1_Manager" %>


<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="/JS/ForEachPage/Process_CategoryLevel1.js" type="text/javascript"></script>
    <link href="/JS/Common/Flexigrid-table/css/flexigrid.pack.css" rel="stylesheet" type="text/css" />
    <%--<script src="/JS/Common/Flexigrid-table/js/flexigrid.pack.js" type="text/javascript"></script>--%>
    <script src="/JS/Common/Flexigrid-table/js/flexigrid.js" type="text/javascript"></script>

</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <input type="hidden" id="txtLANG_DATA" runat="server" clientidmode="Static" />
    <table class="flexgripCategoryLevel1" style="display: none">
    </table>
    <script type="text/javascript">

        $(".flexgripCategoryLevel1").flexigrid({
            url: '/Action/ProcessBackendAction.ashx?ActionObject=CategoryLevel1&action=CMS-Sel_Page_ForFlexigrid',
            dataType: 'json',
            method: 'GET', //data sending method
            resizable: true, //allow table resizing

            colModel: [

				    {
				        ExtendBtn: 'UPD_ROW',
				        display: '<%=CORE.CORE_Language.GetText_Page(18)%>',
				        Onpress: "ButtonProcess_UpdRow_CategoryLevel1",
				        name: 'ID',
				        width: 70,
				        sortable: true,
				        align: 'center'
				    },
                    {
                        ExtendBtn: 'DEL_ROW',
                        display: '<%=CORE.CORE_Language.GetText_Page(19)%>',
                    	Onpress: "ButtonProcess_DelRow_CategoryLevel1",
                    	name: 'ID',
                    	width: 70,
                    	sortable: true,
                    	align: 'center'
                    },
                    {
                        ExtendBtn: 'DIS_ROW',
                        display: '<%=CORE.CORE_Language.GetText_Page(21)%>',
                        Onpress: "ButtonProcess_DisRow_CategoryLevel1",
                        name: 'ID',
                        width: 70,
                        sortable: true,
                        align: 'center'
                    },
                    {
                        display: '<%=CORE.CORE_Language.GetText_Page(20)%>',
                        name: 'ID',
                        width: 50,
                        sortable: true,
                        align: 'center'
                    },
					 {
					     display: '<%=CORE.CORE_Language.GetText_Page(27)%>',
					     name: 'Code',
					     width: 90,
					     sortable: true,
					     align: 'center'
					 },
                    {
                        ExtendBtn: 'IMG_ROW',
                        display: 'Ảnh',
                        Onpress: "ButtonProcess_UpdRow_Contents",
                        name: 'Image',
                        widthImg: 60,
                        heightImg: 60,
                        path: "/Uploads/thumb_",

                        width: 70,
                        sortable: true,
                        align: 'center'
                    },
				    {
				        display: '<%=CORE.CORE_Language.GetText_Page(17)%>',
				        name: 'CategoryNameLevel1',
				        width: 200,
				        sortable: true,
				        align: 'center'
				    },

				    {
				        display: '<%=CORE.CORE_Language.GetText_Page(7)%>',
				        name: 'Status',
				        width: 90,
				        sortable: true,
				        align: 'center'
				    },

				    {
				        display: '<%=CORE.CORE_Language.GetText_Page(13)%>',
				        name: 'Disable',
				        width: 90,
				        sortable: true,
				        align: 'center'
				    },

				    {
				        display: '<%=CORE.CORE_Language.GetText_Page(0)%>',
				        name: 'CodeCategoryLevel2',
				        width: 90,
				        sortable: true,
				        align: 'center'
				    }
					,

				    {
				        display: '<%=CORE.CORE_Language.GetText_Page(28)%>',
				        name: 'ViewCount',
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
                onpress: ButtonProcess_CategoryLevel1
            }
                  /*  ,
                    {
                        name: 'Edit',
                        bclass: 'edit',
                        onpress: ButtonProcess_CategoryLevel1
                    }
                    ,
                    {
                        name: 'Delete',
                        bclass: 'delete',
                        onpress: ButtonProcess_CategoryLevel1
                    }*/
                    ,
                    {
                        separator: true
                    }
            ],
            searchitems: [

            		{
            		    display: 'CategoryNameLevel1',
            		    name: 'CategoryNameLevel1',
            		    isdefault: true
            		},

            		{
            		    display: 'Code',
            		    name: 'Code',
            		    isdefault: true
            		},

            		{
            		    display: 'IDLang',
            		    name: 'IDLang',
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
            		    display: 'IDCategoryLevel2',
            		    name: 'IDCategoryLevel2',
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
            title: '<%=CORE.CORE_Language.GetText_Page(22)%>',
            useRp: true,
            rp: 15,
            showTableToggleBtn: true,
            width: 1000,
            height: 200,
            colMove: true

        });
        function ButtonProcess_UpdRow_CategoryLevel1(Code) {
            //this function in Process_CategoryLevel1.js
            OpenDialog_Upd_CategoryLevel1(Code);
        }
        function ButtonProcess_DelRow_CategoryLevel1(Code) {
            //this function in Process_CategoryLevel1.js
            var conf = confirm('<%=CORE.CORE_Language.GetText_Page(25)%>');
            if (conf) {
                Del_CategoryLevel1(Code);
            }
        }
        function ButtonProcess_DisRow_CategoryLevel1(Code) {
            //this function in Process_CategoryLevel1.js
            var conf = confirm('<%=CORE.CORE_Language.GetText_Page(26)%>');
            if (conf) {
                Dis_CategoryLevel1(Code);
            }
        }
        function ButtonProcess_CategoryLevel1() {
            OpenDialog_Ins_CategoryLevel1();
        }
        //   });
    </script>
</asp:Content>
