<%@ Page Title="" Language="C#" MasterPageFile="~/WebDefault.Master" AutoEventWireup="True"
    CodeBehind="CategoryLevel2_Manager.aspx.cs" Inherits="CMS.CategoryLevel2_Manager" %>


<asp:Content ID="Content3" ContentPlaceHolderID="head" runat="server">
    <script src="/JS/ForEachPage/Process_CategoryLevel2.js" type="text/javascript"></script>

</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    
    
    <script type="text/javascript">


        $(document).ready(function () {
            Init_LotusTable();
        });
        

        function Init_LotusTable() {
            //oTable.fnDestroy();

            table = $('#checkAll').LotusTable(
                {
                    "url": "/Action/ProcessBackendAction.ashx?ActionObject=CategoryLevel2&action=CMS-Sel_Page_ForFlexigrid",
                    "Col_Key": "ID",
                    "Col_Image": "Image",
                    "Path_Image": "/Action/ProcessImageServiceAction.ashx?W=60&H=60&Scale=crop&Img=",
                    "pageLength": 4,
                    "columns": [
                                { "data": "ID" },
                                { "data": "Image" },
                                { "data": "Code" },
                                { "data": "CategoryNameLevel2" },
                                { "data": "IDLang" },
                                { "data": "Type" },
                                { "data": "ViewCount" }
                                

                    ]
                }
                );
        }
        function LotusTable_EditRow(IDRow) {
            alert("LotusTable_EditRow : " + IDRow);
        }
        function LotusTable_AddRow(IDRow) {
            OpenDialog_Ins_CategoryLevel2();
        }
        function LotusTable_RemoveRow(IDRow) {

            var conf = confirm('Bạn có chắc muốn xóa record này không ?');
            if (conf) {
                //Del_Albums(IDRow);
                //alert("LotusTable_RemoveRow : " + IDRow);
                Del_CategoryLevel2(ID);
            }

        }

        function LotusTable_RemoveSelectedRows(ListIDRow) {

            var conf = confirm('Bạn có chắc muốn xóa những record này không ?');
            if (conf) {
                //Del_Albums(IDRow);
                alert("LotusTable_RemoveSelectedRows : " + ListIDRow);
                Del_CategoryLevel2(ID);
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
                <a class="tOptions act btnAdd"  title="Thêm mới" ><img src="/Images/icons/options" alt="" /></a>
                <!--###########################################################################################-->
     


                  <table cellpadding="0" cellspacing="0" border="0" id="checkAll" class="tDefault checkAll tMedia">
                    <!-- ================================================================= -->
                    <thead>
                        <tr>
                            <th><span class="sorting" style="display: block;"></span></th>
                            <th><span class="sorting" style="display: block;"></span></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            
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
