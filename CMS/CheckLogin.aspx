<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="CheckLogin.aspx.cs" Inherits="CMS.CheckLogin" %>
<html lang="en">
  <head>
		<meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"> 
		<meta name="viewport" content="width=device-width, initial-scale=1.0"> 
        <title>www.NhaKhachChinhPhu.com.vn</title>
        <meta name="description" content="Custom Login Form Styling with CSS3" />
        <meta name="keywords" content="css3, login, form, custom, input, submit, button, html5, placeholder" />
        <meta name="author" content="Codrops" />
        <link rel="shortcut icon" href="../favicon.ico"> 
        <link href="CSS/CSSBackEnd/css/style.css" rel="stylesheet" />
		<script src="CSS/CSSBackEnd/js/modernizr.custom.63321.js"></script>
		<!--[if lte IE 7]><style>.main{display:none;} .support-note .note-ie{display:block;}</style><![endif]-->
		<style>
			@import url(http://fonts.googleapis.com/css?family=Ubuntu:400,700);
			body {
				background: #563c55 url(CSS/CSSBackEnd/images/blurred.jpg) no-repeat center top;
				-webkit-background-size: cover;
				-moz-background-size: cover;
				background-size: cover;
			}
			.container > header h1,
			.container > header h2 {
				color: #fff;
				text-shadow: 0 1px 1px rgba(0,0,0,0.7);
			}
		</style>
			
				<div style="height:200px"></div>
                <form  class="form-3"   id="frmMain" method="post"  runat="server" enctype="multipart/form-data" action="CheckLogin.aspx">
				    <div style="width:275px" >
				        <label for="login">Username</label>
				        <input type="text" name="txt_username" id="txt_username" />
				   </div>
                    <div style="width:275px" >
				        <label for="password">Password</label>
				        <input type="password" name="txt_password" id="txt_password" />
				    </div>
                    <div style="width:275px" >
                        <input type="checkbox" name="txt_remember" id="txt_remember" />
				        <label for="remember">Remember me</label>
				        <input type="submit" name="submit" value="Sign in" onclick="" />
				    </div>
                    
                         
				</form>​
		
			
        </div>
    </body>
</html>