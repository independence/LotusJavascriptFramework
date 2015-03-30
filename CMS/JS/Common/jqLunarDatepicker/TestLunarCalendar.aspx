<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="TestLunarCalendar.aspx.cs" Inherits="Website.JS.Common.TestLunarCalendar" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">

<head runat="server">
   <%-- <link rel="stylesheet" media="all" type="text/css" href="http://code.jquery.com/ui/1.10.3/themes/smoothness/jquery-ui.css" />--%>
    <link href="../../css/jquery-ui-1.10.3.custom.css" rel="stylesheet" type="text/css" />
    <script src="../Common/jquery-2.0.0.js" type="text/javascript"></script>
    <script src="../Common/jquery-migrate-1.1.1.js" type="text/javascript"></script>
    <script src="../Library/jquery-ui-1.10.3.custom.js" type="text/javascript"></script>

    <link href="StyleLunarDatepicker.css" rel="stylesheet" type="text/css" />

    <script src="jqTimepicker.js" type="text/javascript"></script>

    <script src="jqLunarDatepicker.js" type="text/javascript"></script>


    <title></title>
</head>
<body>
    <form id="form1" runat="server">
    <div>

            <script type="text/javascript" language="JavaScript">


                $(function () {
                    $("#solardate").lunardatepicker();

                    $('#time').timepicker();
                });
                
            </script>
    </div>
    </form>

    Lunar Datepicker <input type="text" id="solardate" /><br/>
     Timepicker  <input type="text" id="time" />
</body>
</html>
