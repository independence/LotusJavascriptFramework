<%@ Page Title="" Language="C#" MasterPageFile="~/WebDefault.Master" AutoEventWireup="True"
    CodeBehind="SystemUsers_Manager.aspx.cs" Inherits="CMS.SystemUsers_Manager" %>


<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">


</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <input type="hidden" id="txtLANG_DATA" runat="server" clientidmode="Static" />
    
    <script type="text/javascript">


        $(document).ready(function () {
            Init_LotusTable();
        });


        function Init_LotusTable() {
            //oTable.fnDestroy();

            table = $('#checkAll').LotusTable(
                {
                    "url": "http://localhost:2338/Action/ProcessBackendAction.ashx?ActionObject=Contents&action=CMS-Sel_Page_ForFlexigrid_ByCategoryLevel1&CodeCategoryLevel1=63541566991&page=1&rp=15&sortname=%40KeyField%40&sortorder=asc&query=&qtype=Type",
                    "Col_Key": "ID",
                    "Col_Image": "Image",
                    "Path_Image": "http://localhost:2338/Action/ProcessImageServiceAction.ashx?W=60&H=60&Scale=crop&Img=",
                    "pageLength": 4,
                    "columns": [
                                { "data": "ID" },
                                { "data": "Image" },
                                { "data": "Code" },
                                { "data": "Title" }

                    ]
                }
                );
        }
        function LotusTable_EditRow(IDRow) {
            alert("LotusTable_EditRow : " + IDRow);
        }

        function LotusTable_RemoveRow(IDRow) {

            var conf = confirm('Bạn có chắc muốn xóa record này không ?');
            if (conf) {
                //Del_Albums(IDRow);
                alert("LotusTable_RemoveRow : " + IDRow);
            }

        }

        function LotusTable_RemoveSelectedRows(ListIDRow) {

            var conf = confirm('Bạn có chắc muốn xóa những record này không ?');
            if (conf) {
                //Del_Albums(IDRow);
                alert("LotusTable_RemoveSelectedRows : " + ListIDRow);
            }

        }

    </script>

        <!-- Table with opened toolbar -->
        <div class="widget">
            <div class="whead">
                <span class="titleIcon">
                    <div id="uniform-titleCheck" class="checker">
                        <span class="">
                            <input id="titleCheck" type="checkbox" name="titleCheck" style="opacity: 0;">
                        </span>
                    </div>
                </span>
                <h6>Media table</h6>
                <div class="clear"></div>
            </div>
            
            <ul class="tToolbar">
                    <li><a title="" href="#"><span class="icos-inbox"></span>Import table content</a></li>
                    <li><a title="" href="#"><span class="icos-outbox"></span>Export table content</a></li>
                    <li><a title="" href="#"><span class="icos-download"></span>Download statement</a></li>
                    </ul>

            <div  class="shownpars">
                <a class="tOptions act"  title="Options"><img src="../images/icons/options" alt="" /></a>
                <!--###########################################################################################-->
     


                            <table cellpadding="0" cellspacing="0" border="0" id="checkAll" class="tDefault checkAll tMedia">
                    <!-- ================================================================= -->
                    <thead>
                        <tr>
                            <th>xxx<span class="sorting" style="display: block;"></span></th>
                            <th>xxx<span class="sorting" style="display: block;"></span></th>
                            <th>xxx</th>
                            <th>xxx</th>

                            <th>Sửa</th>
                            <th>Xóa</th>
                        </tr>
                    </thead>
                    <!-- ================================================================= -->

                    <tbody>
                    </tbody>
                    <!-- ================================================================= -->
                    <tfoot class="xxx">
                        <tr>
                            <td class="ControlGroupBtn">
                                <div class="itemActions">
                                    <label>Apply action:</label>
                                    <select id="ActionChoice">
                                        <option value="Default">Select action...</option>

                                        <option value="Delete">Delete</option>

                                    </select>
                                </div>
                            </td>

                        </tr>
                    </tfoot>
                    <!-- ================================================================= -->
                </table> 
               
                <!--###########################################################################################-->
            </div>
            <div class="clear"></div> 
        </div> 
    

        <!-- Table with always visible toolbar -->


</asp:Content>
