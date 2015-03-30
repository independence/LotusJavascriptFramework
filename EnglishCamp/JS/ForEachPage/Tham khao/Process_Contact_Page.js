

function LoadForm() {

    $("#MainContent").setTemplateURL('../../Template/Content_Contact.htm');
    $("#MainContent").setParam('Lang', sys_Lang);
    $("#MainContent").processTemplate();

}

