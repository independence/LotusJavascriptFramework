<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Home.aspx.cs" Inherits="EnglishCamp.Home" %>

<html>
<head>
    <title> English Camp </title>
    <meta name="description" content="English Camp" />
    <meta charset="UTF-8" />
    <meta name="robots" content="index, follow" />
    <meta name="keywords" content="English Camp" />

    <script src="JS/FRAMEWORK/Include.JS.Base.js"></script>
    <script src="JS/FRAMEWORK/Include.JS.Framework.js"></script>
    <script src="JS/FRAMEWORK/Include.JS.Extend.js"></script>
    <script src="JS/FRAMEWORK/Include.JS.Library.js"></script>
    <script src="JS/Common/JSON.js"></script>
    <script type="text/javascript" src="/JS/Common/jquery-jtemplates.js"></script>
    <script src="JS/FRAMEWORK/BussinessLogic/ContentsBO.js"></script>
    <script src="JS/FRAMEWORK/BussinessLogic/ConfigsBO.js"></script>
    <script src="JS/FRAMEWORK/BussinessLogic/CategoryLevel1BO.js"></script>
    <script src="JS/FRAMEWORK/BussinessLogic/CategoryLevel2BO.js"></script>
    <script src="JS/ForEachPage/Process_Home.js"></script>
    <script src="JS/ForEachPage/Process_Menu.js"></script>
    <link href="css/menu.css" rel="stylesheet" />
    <link href="css/style2e46.css" rel="stylesheet" />
    <link href="/CSS/styles.css" rel="stylesheet" type="text/css" />
    <style type='text/css'></style>
    <link href='http://fonts.googleapis.com/css?family=Roboto+Condensed&subset=latin,vietnamese' rel='stylesheet' type='text/css'>
    <link rel='stylesheet' id='rs-plugin-settings-css' href='css/settings84bb.css?rev=4.6.0&amp;ver=3.9.2' type='text/css' media='all' />
    <link rel='stylesheet' id='gforms_reset_css-css' href='css/formreset97e9.css?ver=1.7.9' type='text/css' media='all' />
    <link rel='stylesheet' id='gforms_datepicker_css-css' href='css/datepicker97e9.css?ver=1.7.9' type='text/css' media='all' />
    <link rel='stylesheet' id='gforms_formsmain_css-css' href='css/formsmain97e9.css?ver=1.7.9' type='text/css' media='all' />
    <link rel='stylesheet' id='gforms_ready_class_css-css' href='css/readyclass97e9.css?ver=1.7.9' type='text/css' media='all' />
    <link rel='stylesheet' id='gforms_browsers_css-css' href='css/browsers97e9.css?ver=1.7.9' type='text/css' media='all' />
    <link rel="EditURI" type="application/rsd+xml" title="RSD" href="../xmlrpc0db0.php?rsd" />
    <link rel="wlwmanifest" type="application/wlwmanifest+xml" href="http://englishcamp.edu.vn/" />
    <link rel="alternate" href="index.html" hreflang="vi" />
    <link rel="alternate" href="../en/index.html" hreflang="en" />
   

</head>
<body class="home EnglishCamP">
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
        <div id="topHeader">
        </div>
        <div id="header">
            <div class="container">
                <a href="Home.aspx" title="English Camp " class="logo fl">
                    <img src="css/images/edit-logo.png" alt="EnglishCamp"></a>
            </div>
        </div>
        <!-----------Menu top------------->
        <div id='cssmenu'>
        </div>
        <!-----------------slider---------------------------->
        <div class="container">
            <div class="slider">
                 <div id='slider' class='nivoSlider'>
                     </div>
            </div>
        <!--------------===============================================----------------->
            <div class="contents">
            <h2>Bản tin tiếng anh</h2>
            </div>

            <!----------------slider 2------------------------->
            <div id="divCarousel" class="carousel_home">
            </div>
            <!------------------end slider2-------------------------->
            <div class="mainContent">
                <div class="contents fl">
                    <!-----------------------start latestUpdates----------------------------->
                    <div id="divlatestUpdates" class="latestUpdates">
                        <h2>Cảm Nhận Học Viên</h2>
                    </div>
                    <!-----------------------end latestUpdates----------------------------->
                    <!---------------------------------------------------->
                      <div id="Content1" class="news_page_lastest">
                      </div>
                    <!---------------------------------------------------->
                </div>
                <!-- Pop-up Begin -->
                <!-- ####################################menu right###################################################### -->
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
                            <a href='ExamTest.aspx'>Đăng kí kiểm tra trình độ</a>
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
                    <!-- ########################################################################################## -->

                    <div class="widget_block">
                    <div class="textwidget">
                        <iframe src="http://www.facebook.com/plugins/likebox.php?href=http%3A%2F%2Fwww.facebook.com%2FEnglishCampVietnam&amp;width=304&amp;height=258&amp;show_faces=true&amp;colorscheme=light&amp;stream=false&amp;border_color&amp;header=false" scrolling="no" frameborder="0" style="border: none; overflow: hidden; width: 304px; height: 258px; margin-top: 50px;" allowtransparency="true"></iframe>
                    </div>
                </div>
                </div>
            </div>
        </div>
    </div>
    <!-- #########################################Footer################################################# -->
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
         <script type="text/javascript">               $(document).ready(function () {
                  Init_System_WEB();
                  setTimeout('LoadCarouselByCategory1("#divCarousel")', 1000);                   setTimeout('LoadBlockFooter1("#divBlockF1");', 1000);                   setTimeout('LoadBlockFooter2("#divBlockF2");', 1000);                  setTimeout('LoadBlockFooter3("#divBlockF3");', 1000);                  setTimeout('LoadBlockFooter4("#divBlockF4");', 1000);                  setTimeout('LoadBlockFooter5("#divBlockF5");', 1000);                  setTimeout('LoadCssmenu("#cssmenu");', 1000);                  setTimeout('$("#carousel_home").jcarousel({ auto: 5, animation: 1000, scroll: 1, wrap: "circular" });', 1000);                  setTimeout('LoadLatestUpdatesByCategory1("#divlatestUpdates");', 1000);                  setTimeout('LoadMenuHeader("#topHeader");', 1000);

                 LoadHotNewsByCategory1('#Content1');
                 LoadBigSlider("#slider");
             });     </script>
</body>
</html>
