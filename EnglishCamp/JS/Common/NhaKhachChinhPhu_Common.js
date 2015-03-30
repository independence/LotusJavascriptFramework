
function DecodeTextTinyMCE(string) {
  
    string = string.replace('&gt;', '>');
    string = string.replace('&lt;', '<');
    return string;

}
// Chu y 1: Ma hoa va submit cua TinyMCE

function Change_TextareaToTinyMCE_OnPopup(idselecter) {

    tinymce.init({
        selector: idselecter,
        theme: "modern",
        entity_encoding: "raw", // Cuc ki quan trong. Neu k co cai nay, TinyMCE se k submit dc cac ki tu unicode (cac ki tu se bi ma hoa)
        encoding: 'xml',
        //valid_children : "+body[style],-body[div],p[strong|a|#text]",
        paste_auto_cleanup_on_paste: false,
        paste_remove_styles: false,
        paste_remove_styles_if_webkit: false,
        paste_strip_class_attributes: false,

        plugins: [
            "advlist autolink lists link image charmap print preview hr anchor pagebreak",
            "searchreplace wordcount  visualchars code fullscreen",
            "insertdatetime media nonbreaking save table contextmenu directionality",
        /*"emoticons template paste moxiemanager"*/
        ],
        toolbar1: "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image",
        toolbar2: "print preview media | forecolor backcolor emoticons"

    });

}

function SaveTinyMCEBeforeSubmit() {
    tinyMCE.triggerSave();
}
function SaveTinyMCEBeforeSubmit(element) {
    tinymce.get(element).save();
}


function RemoveTinyMCE() {
    if (typeof tinyMCE != 'undefined') {
       $('div[id *= "mce"]').remove();
    }

}