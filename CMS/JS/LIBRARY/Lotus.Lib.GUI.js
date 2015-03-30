$.fn.LotusTabs = function () {

	$(this).find(".tab_content").hide(); //Hide all content
	$(this).find("ul.tabs li:first").addClass("activeTab").show(); //Activate first tab
	$(this).find(".tab_content:first").show(); //Show first tab content

	$("ul.tabs li").click(function () {
		$(this).parent().parent().find("ul.tabs li").removeClass("activeTab"); //Remove any "active" class
		$(this).addClass("activeTab"); //Add "active" class to selected tab
		$(this).parent().parent().find(".tab_content").hide(); //Hide all tab content
		var activeTab = $(this).find("a").attr("href"); //Find the rel attribute value to identify the active tab + content
		$(activeTab).show(); //Fade in the active content
		return false;
	});

};
