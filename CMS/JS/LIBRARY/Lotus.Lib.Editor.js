//=====================================================
// Cach viet ham kieu Jquery
//-----------------------------------------------------
//(function ($) {
//    $.say = function (x) {
//        alert(x);
//    };

//    $.fn.makeBlue = function () {
//        return this.css("color", "blue");
//    };
//})(jQuery);
//-----------------------------------------------------
//$.say("Hello the world!");
//$(".abc").makeBlue().show();
//-----------------------------------------------------

(function ($) {

    $.fn.LotusEditor = function () {
        
        this.ckeditor();
        CKEDITOR.replace(this, {
            extraPlugins: 'tableresize'
        });
    };
})(jQuery);

