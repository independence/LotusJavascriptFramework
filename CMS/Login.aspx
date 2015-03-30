<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Login.aspx.cs" Inherits="CMS.Login" %>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
    <title>LOTUS</title>

    <%--================================================================================================================--%>
    <link href='http://fonts.googleapis.com/css?family=Roboto+Condensed:400,300,300italic,400italic,700,700italic&subset=latin,vietnamese' rel='stylesheet' type='text/css' />


    <script src="/JS/FRAMEWORK/Include.JS.Base.js" type="text/javascript"></script>
    <script src="/JS/FRAMEWORK/Include.JS.Framework.js" type="text/javascript"></script>
    <script src="/JS/FRAMEWORK/Include.JS.Library.js" type="text/javascript"></script>
    <script src="/JS/FRAMEWORK/Include.JS.Extend.js" type="text/javascript"></script>

    <script src="/JS/ForEachPage/Process_Login.js" type="text/javascript"></script>

    <link href="css/styles.css" rel="stylesheet" type="text/css" />
    
    <!--[if IE]> <link href="css/ie.css" rel="stylesheet" type="text/css"> <![endif]-->

    <%--==============================================================--%>



    <script type="text/javascript">
     
        jQuery(document).ready(function () {
            //$('input[placeholder], textarea[placeholder]').placeholder();
            setTimeout("Init_Dialog_Login();", 1000);

            
        });
    </script>
</head>

<body>

    <!-- Top line begins -->
    <div id="top">
        <div class="wrapper">
            <a href="#" title="" class="logo">
                <img src="images/logo.png" alt="" /></a>

            <!-- Right top nav -->
            <div class="topNav">
                <ul class="userNav">
                    <li><a href="#" title="" class="screen"></a></li>
                    <li><a href="#" title="" class="settings"></a></li>
                    <li><a href="#" title="" class="logout"></a></li>
                </ul>
            </div>
            <div class="clear"></div>
        </div>
    </div>
    <!-- Top line ends -->


    <!-- Login wrapper begins -->
    <div class="loginWrapper">



        <!-- New user form -->
    <form action="login.aspx" id="recover" method="post" runat="server" enctype="multipart/form-data" >
        <div class="loginPic">
            <a href="#" title=""><img src="images/userLogin2.png" alt="" /></a>
            <div class="loginActions">
                <div><a href="#" title="" class="logback flip"></a></div>
                <div><a href="#" title="Forgot password?" class="logright"></a></div>
            </div>
        </div>
            
     <input type="text" name="txtUsername" id="txtUsername"  placeholder="Your username" class="loginUsername" />
   
     
        <input type="password" name="txtPassword" id="txtPassword" placeholder ="Password" class="loginPassword" />
        
        <div class="logControl">
            <div class="memory"><input type="checkbox" checked="checked" class="check" id="remember2" /><label for="remember2">Remember me</label></div>
            <input type="submit" name="submit" value="Login" class="buttonM bBlue" />
        </div>
    </form>
        
        <!-- Current user form -->
        <form action="index.html" id="login" method="post">
            <div class="loginPic">
                <a href="#" title="">
                    <img src="images/userLogin.png" alt="" /></a>
                <span>Eugene Kopyov</span>
                <div class="loginActions">
                    <div><a href="#" title="Change user" class="logleft flip"></a></div>
                    <div><a href="#" title="Forgot password?" class="logright"></a></div>
                </div>
            </div>

            <input type="text" name="login" placeholder="Confirm your email" class="loginEmail" />
            <input type="password"  name="password" placeholder="Password" class="loginPassword" />

            <div class="logControl">
                <div class="memory">
                    <input type="checkbox" checked="checked" class="check" id="remember1" /><label for="remember1">Remember me</label></div>
                <input type="submit" name="submit" value="Login" class="buttonM bBlue" />
                <div class="clear"></div>
            </div>
        </form>
    </div>
    <!-- Login wrapper ends -->

</body>
</html>
