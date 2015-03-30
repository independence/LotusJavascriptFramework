<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Connected.aspx.cs" Inherits="EnglishCamp.Connected" %>

<!DOCTYPE html>
<html lang="en-US">

<head>
    <title>Liên Hệ |  English Camp</title>
    <meta charset="UTF-8" />
    <meta name="robots" content="index, follow" />
    <meta name="keywords" content="English Camp" />

    <script> // Facebook Plugin
        (function (d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s); js.id = id;
            js.src = "../../../connect.facebook.net/en_US/all.js#xfbml=1&appId=423907384369852";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
    </script>

    <style type='text/css'>
        .tp-caption a {
            color: #ff7302;
            text-shadow: none;
            -webkit-transition: all 0.2s ease-out;
            -moz-transition: all 0.2s ease-out;
            -o-transition: all 0.2s ease-out;
            -ms-transition: all 0.2s ease-out;
        }

            .tp-caption a:hover {
                color: #ffa902;
            }
    </style>


    <script src="JS/FRAMEWORK/Include.JS.Base.js"></script>
    <script src="JS/FRAMEWORK/Include.JS.Framework.js"></script>
    <script src="JS/FRAMEWORK/Include.JS.Extend.js"></script>
    <script src="JS/FRAMEWORK/Include.JS.Library.js"></script>

    <script src="JS/FRAMEWORK/BussinessLogic/ContentsBO.js"></script>
    <script src="JS/FRAMEWORK/BussinessLogic/ConfigsBO.js"></script>

    <script src="JS/FRAMEWORK/BussinessLogic/CategoryLevel1BO.js"></script>

    <script src="JS/FRAMEWORK/BussinessLogic/CategoryLevel2BO.js"></script>
    <script src="JS/FRAMEWORK/BussinessLogic/SystemUsersBO.js"></script>
    <script src="JS/ForEachPage/Process_Connected.js"></script>
    <script src="JS/ForEachPage/Process_Menu.js"></script>
    <script src="JS/script.js"></script>


    <link href="css/menu.css" rel="stylesheet" />

    <link href="css/style2e46.css" rel="stylesheet" />

    <link href="/CSS/styles.css" rel="stylesheet" type="text/css" />

    <link href='http://fonts.googleapis.com/css?family=Roboto+Condensed&subset=latin,vietnamese' rel='stylesheet' type='text/css'>

    <link rel="EditURI" type="application/rsd+xml" title="RSD" href="../../xmlrpc0db0.php?rsd" />


    <link rel="alternate" href="index.html" hreflang="vi" />
    <link rel="alternate" href="../../en/contact/index.html" hreflang="en" />

</head>

<body class="Connected EnglishCamP">
    <!-- =================Position show form===========================-->
    <div id="ImageListBox" style="width: 600px">
    </div>
    <div id="PositionShowDialog" style="width: 500px">
    </div>
    <div id="PositionLoading" style="" title="">
    </div>
    <div id="PositionConfigs">
        <input type="hidden" id="txtNUM_LANG" name="txtNUM_LANG" />

        <input type="hidden" id="txtCURRENT_USER" name="txtCURRENT_USER" />

        <input type="hidden" id="txtCUR_LANG" name="txtCUR_LANG" />

        <input type="hidden" id="txtDEF_LANG" name="txtDEF_LANG" />

        <input type="hidden" id="txtLIST_IDLANG" name="txtLIST_IDLANG" />

        <input type="hidden" id="txtDATA_LANG_STATIC" name="txtDATA_LANG_STATIC" />

        <input type="hidden" id="txtDATA_LANG" name="txtDATA_LANG" />

    </div>
    <!-- =================Position show form===========================-->
    <div id="wrapper">
        <!---######### Menu Header #############---->
        <div id="topHeader">
        </div>
        <!---######### end Menu Header #############---->
        <div id="header">
            <div class="container">
                <a href="Home.aspx" title="EnglishCamp " class="logo fl">
                    <img src="css/images/edit-logo.png" alt="EnglishCamp"></a>
            </div>
        </div>


        <!---######### Menu Top #############---->
        <div id='cssmenu'>
        </div>
        <!---######### end Menu Top #############---->

        <div class="container">
            <div class="content_top"></div>

            <div class="content_middle">
                <div class="contents fl">
                    <div class="content_tab" id="lien-he">

                        <h2>Liên hệ trực tiếp</h2>
                        <h3>Trung tâm Anh ngữ English Camp</h3>
                        <p>Nếu Quý khách có bất kỳ câu hỏi, đề nghị hoặc nhận xét nào, xin vui lòng liên hệ với chúng tôi theo thông tin dưới đây:</p>
                        <p>Địa chỉ: số 16, ngõ 12 Trần Quý Kiên, Cầu Giấy, Hà Nội</p>
                        <p>Điện thoại: 043 7939 504</p>
                        <p>Hotline tư vấn miễn phí 24/7: 096 494 6655 &#8211; 0914 550 440</p>
                        <p>Email: englishcamp.edu@gmail.com</p>
                        <p>&nbsp;</p>
                        <h2>Liên hệ trực tuyến</h2>

                        <form id="contact_form" class="content_form" method="POST">
                            <p>
                                <label for="contact_name">Họ và tên <sup title="Thông tin bắt buộc">(*)</sup>:</label>
                                <input name="txtName" id="Text2" value="" tabindex="1" type="text">
                            </p>
                            <p>
                                <label for="contact_email">E-mail <sup title="Thông tin bắt buộc">(*)</sup>:</label>
                                <input name="txtEmail" id="Text3" value="" class="medium" tabindex="4" type="text">
                            </p>
                            <p>
                                <label for="contact_phone">Điện thoại:</label>
                                <input name="txtPhone" id="Text1" value="" class="medium" tabindex="3" type="text">
                            </p>
                            <p>
                                <label for="contact_area">Nội dung<sup title="Thông tin bắt buộc">(*)</sup>:</label>
                                <input name="txtSubject" id="txtSubject" value="[Liên hệ]" class="medium" tabindex="4" type="hidden" >
                                <textarea name="txtContent" id="Textarea1" class="textarea medium" tabindex="5" rows="10" cols="50">
                                </textarea>
                            </p>
                            <p class="form_button">
                                <input id="Button1"  value="Send" tabindex="16" onclick="SendMail('#frmSendMail');" type="button" />
                            </p>
                        </form>
                    </div>
                                               <%--======================================================================--%>

                    <ul class="single_share">
                        <li class="single-close">Chia sẻ:</li>
                        <li class="single-face"><a target="_blank" href="http://facebook.com/share.php?u=http:englishcamp.edu.vn" title="Share on Facebook">Share on Facebook</a></li>
                        <li class="single-tweet"><a target="_blank" href="http://www.twitter.com/share?url=http:englishcamp.edu.vn" title="Tweet on Twitter">Tweet on Twitter</a></li>
                        <li class="single-gplus"><a target="_blank" href="https://plus.google.com/share?url=http:englishcamp.edu.vn">Plus on Google+</a></li>
                    </ul>
                </div>
                <!---######### Menu Right #############---->
                <div class="sideBar fl">
                    <div id="divSideBar" class="sideBar fl">
                                            <ul>
                    <li class="link1">
                        <p>
                            <a href="Detail.aspx?Code=63561600729">Lịch khai giảng</a>
                        </p>
                        <span class="entypo-home"></span>
                    </li>
                    <li class="link1">
                        <p>
                            <a href="ExamTest.aspx">Đăng kí kiểm tra trình độ</a>
                        </p>
                        <span class="entypo-home"></span>
                    </li>
                    <li class="link1">
                        <p>
                            <a href="Register.aspx">Đăng kí học thử</a>
                        </p>
                        <span class="entypo-home"></span>
                    </li>
                    <li class="link1">
                        <p>
                            <a href="Connected.aspx">Đăng kí câu lạc bộ</a>
                        </p>
                        <span class="entypo-home"></span>
                    </li>
                    <li class="link1">
                        <p>
                            <a href="Detail.aspx?Code=63562101608">Học bổng English Camp</a>
                        </p>
                        <span class="entypo-home"></span>
                    </li>
                    <li class="link1">
                        <p>
                            <a href="ListPost.aspx?Code=63541566992">Tài Liệu EC</a>
                        </p>
                        <span class="entypo-home"></span>
                    </li>
                        </ul>
                    </div>
                </div>
                <!---######### end Menu Right #############---->
                <div class="widget_block">
                    <div class="textwidget">
                        <iframe src="http://www.facebook.com/plugins/likebox.php?href=http%3A%2F%2Fwww.facebook.com%2Fenglishcamp&amp;width=304&amp;height=258&amp;show_faces=true&amp;colorscheme=light&amp;stream=false&amp;border_color&amp;header=false" scrolling="no" frameborder="0" style="border: none; overflow: hidden; width: 304px; height: 258px; margin-top: 50px;" allowtransparency="true"></iframe>
                    </div>
                </div>

                <div class="widget_block">
                    <div class="textwidget">
                        <script type="text/javascript">
                            /* <![CDATA[ */
                            var google_conversion_id = 970307426;
                            var google_custom_params = window.google_tag_params;
                            var google_remarketing_only = true;
                            /* ]]> */
                        </script>

                        <noscript>
                            <div style="display: inline;">
                                <img height="1" width="1" style="border-style: none;" alt="" src="http://googleads.g.doubleclick.net/pagead/viewthroughconversion/970307426/?value=0&amp;guid=ON&amp;script=0" />
                            </div>
                        </noscript>
                    </div>
                </div>
            </div>
        </div>

        <div class="content_bottom"></div>
    </div>

    <div id="footer">
        <div class="blockFooter">
            <div class="container">
                <div id="divBlockF1" class="block fl">
                </div>
                <div id="divBlockF2" class="block fl">
                </div>
                <div id="divBlockF3" class="block fl">
                </div>
                <div id="divBlockF4" class="block fl">
                </div>
                <div id="divBlockF5" class="block fl">
                </div>
            </div>
        </div>
        <div class="foot">
            <div class="container">
                <div class="addressBlock fl">
                    <div class="city fl">
                        <div class="cityName">
                            <h3 class="fl"><a href="Connected.aspx">Địa chỉ</a></h3>
                            <a class="fl maps" href="https://www.google.com/maps/place/Tr%E1%BA%A7n+Qu%C3%BD+Ki%C3%AAn,+D%E1%BB%8Bch+V%E1%BB%8Dng,+C%E1%BA%A7u+Gi%E1%BA%A5y,+H%C3%A0+N%E1%BB%99i,+Vi%E1%BB%87t+Nam/@21.0376777,105.7918735,18z/data=!4m2!3m1!1s0x3135ab37c799f1af:0x572dc428efd35f2e" target="blank"></a>
                        </div>
                        <div class="address">
                            <ul class="fl">
                                <li>số 16, ngõ 12 Trần Quý Kiên, Cầu Giấy, Hà Nội</li>
                                <li>043 7939 504</li>
                                <li>Hotline tư vấn miễn phí 24/7: 096 494 6655 &#8211; 0914 550 440</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
        <script type="text/javascript">
            /* <![CDATA[ */
            var google_conversion_id = 970307426;
            var google_custom_params = window.google_tag_params;
            var google_remarketing_only = true;
            /* ]]> */
        </script>
        <noscript>
            <div style="display: inline;">
                <img height="1" width="1" style="border-style: none;" alt="" src="http://googleads.g.doubleclick.net/pagead/viewthroughconversion/970307426/?value=0&amp;guid=ON&amp;script=0" />
            </div>
        </noscript>
        <!--stats_footer_test-->
</body>
<script>
    $(document).ready(function () {

        Init_System_WEB();

        setTimeout('LoadBlockFooter1("#divBlockF1");', 1000);
        setTimeout('LoadBlockFooter2("#divBlockF2");', 1000);
        setTimeout('LoadBlockFooter3("#divBlockF3");', 1000);
        setTimeout('LoadBlockFooter4("#divBlockF4");', 1000);
        setTimeout('LoadBlockFooter5("#divBlockF5");', 1000);
        setTimeout('LoadCssmenu("#cssmenu");', 1000);
        setTimeout('LoadMenuHeader("#topHeader");', 1000);
    });
</script>

</html>
