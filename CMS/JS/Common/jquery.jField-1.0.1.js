/*
*	Author: Flakron Bytyqi
*	Date: 23.03.2009
*	Version: 1.0.0
*/
$.fn.jField = function (options) {

    var defaults = {
        allowNegatives: true,
        allowDecimal: true
    };

    defaults = $.extend(defaults, options);

    $(this).keydown(function (event) {
        
        var key = (event.which) ? event.which : event.keyCode;


        if ((key >= 48 && key <= 57)
			|| (key >= 96 && key <= 105)
			|| key == 8
			|| key == 109
			|| key == 190
			|| key == 110
            || key == 87

            || (key > 272) /*Cac ki tu unicode co ma lon hon 272*/
		) {
            if (defaults.allowNegatives == false && key == 109) {
                return false;
            }
            else if
			(
					defaults.allowNegatives == true
				&& $(this).val().length > 0
				&& key == 109
			) {
                return false;
            }

            if (
					defaults.allowDecimal == false
				&& (key == 190 || key == 110)
			) {
                return false;
            }
            else if (defaults.allowDecimal == true) {
                if ($(this).val().length == 0) {
                    if ((key == 190 || key == 110)) {
                        return false;
                    }
                }
                else {
                    if ((key == 190 || key == 110)) {
                        for (var i = 0; i < $(this).val().length; i++) {
                            if ($(this).val().charAt(i) == ".") {
                                return false;
                            }
                        }
                    }
                }
            }
        }
        else if (
				key == 37
			|| key == 38
			|| key == 39
			|| key == 40
			|| key == 17
			|| key == 46
			|| key == 116
		)
        { }
        else {
            return false;
        }
    });
};