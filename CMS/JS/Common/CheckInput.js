

//===================================================
// Textbox chi nhap so 
//===================================================
function InputMoney(IDTextbox) {
    var ValueBeforeType;
    $(IDTextbox).keydown(function () {
        $(IDTextbox).val(numeral($(IDTextbox).val()).format('0,0'));
    });
};
function InputMoney_Multi(preIDTextbox, NumLang) {

   preIDTextbox = preIDTextbox.replace(".", "#");
   preIDTextbox = "#" + preIDTextbox;
   preIDTextbox = preIDTextbox.replace("##", "#");

   for(var i=1 ; i<= NumLang ; i++)
    {
        var ValueBeforeType;
        var ID = preIDTextbox + i;
        InputMoney(ID);
    }

};
//===================================================
// Textbox chi nhap so 
//===================================================
function InputNumber(ClassTextbox, ClassPositionMess, NumLang) {
    ClassTextbox = ClassTextbox.replace(".", "#");

    for (i = 1; i <= NumLang; i++) {
        var IDTextbox = ClassTextbox + "_Lang" + i ;
        var IDPositionMess = ClassPositionMess + "_Lang" + i ;

        InputNumber(IDTextbox, IDPositionMess);
    }
  

};
//===================================================
// Textbox chi nhap so 
//===================================================
function InputNumber(IDTextbox ,IDPositionMess) {
    var ValueBeforeType;
    $(IDPositionMess).css("color", "red");

    $(IDTextbox).keydown(function () {
        if (isNaN($(IDTextbox).val()) == false) {
            ValueBeforeType = $(IDTextbox).val();
        }
    });

    $(IDTextbox).keyup(function () {
        ValueAfterType = $(IDTextbox).val();

        if (isNaN(ValueAfterType) == true) {

            $(IDPositionMess).html("Chỉ nhập số").show().fadeOut("slow"); ;
            $(IDTextbox).val(ValueBeforeType);
        }

    });
};
//===================================================
// Control k được bỏ trống
//===================================================
function CheckNullBeforeSubmit(IDControl, Mess) {

    if ($(IDControl).val() == "") {
        showMessageBox(Mess);
        return true;
    }
    else {
        return false;
    }
};
//===================================================
// Check password
//===================================================
function CheckPassword(HTMLinputPassword, HTMLinputRePassword, PositionShowAlert, AlertIfWrong) {
    if ($(HTMLinputPassword).val() != $(HTMLinputRePassword).val()) {
        $(PositionShowAlert).html("<div>" + AlertIfWrong + "</div>");

        $(HTMLinputPassword).css({ "background-color": "yellow" });
        $(HTMLinputRePassword).css({ "background-color": "yellow" });
        return false;
    }
    else {
        $(PositionShowAlert).html("");
        $(HTMLinputPassword).css({ "background-color": "" });
        $(HTMLinputRePassword).css({ "background-color": "" });
        return true;
    }
}
//===================================================
// Check kí tự an toàn
//===================================================
function validateInPutLetter(strValue) {
    var objRegExp = /^[a-z\u00C0-\u00ff]+$/;
    return objRegExp.test(strValue);
}