$(window).load(function() {
    $('#slider').nivoSlider({
    	pauseTime: 50000,
    	controlNav: false
    });
});


$(document).ready(function(){
	// Get number of Course List item
	var liCount = $('.sub_courses > ul > li').size();
	$('.sub_courses').addClass('sub_courses_' + liCount);
	
	// Gallery carousel
	$('#carousel_young_learner').jcarousel({
		scroll: 1,
		wrap: 'last',
    });	
	
	$('#carousel_student').jcarousel({
		scroll: 1,
		wrap: 'last',
    });	
	
	$('#carousel_working_people').jcarousel({
		scroll: 1,
		wrap: 'last',
    });
	
	$('#carousel_eca').jcarousel({
		scroll: 1,
		wrap: 'last',
    });
	
	$('#carousel_news').jcarousel({
		scroll: 1,
		wrap: 'last',
    });
	
	// accreditedBy carousel
	$('.accreditedBy').jcarousel({
		auto: 4,
		scroll: 1,
		animation: 2000,
		wrap: 'circular',
		buttonNextHTML: null,
		buttonPrevHTML: null,
    });
	
	// Header carousel
	$('.partner-header > ul').jcarousel({
		auto: 4,
		scroll: 1,
		animation: 2000,
		wrap: 'circular',
		buttonNextHTML: null,
		buttonPrevHTML: null,
    });
	
	// Homepage carousel
	$('#carousel_home').jcarousel({
		auto: 5,
		animation: 1000,
		scroll: 1,
		wrap: 'circular'
    });
	
	// The Linker carousel
	$('#carousel_bsa').jcarousel({
		auto: 4,
		animation: 1000,
		scroll: 4,
		wrap: 'last'
    });
	
	// Good Student Carousel
	$('#good_student_carousel').jcarousel({
		auto: 4,
		animation: 1000,
		scroll: 1,
		wrap: 'circular'
    });
	
	// News & Event featured top
	$('.li_for_post').hover(function() {
		var itemNumber = $(this).attr('for');
		$('.big_photo').not('.' + itemNumber).fadeOut('fast');
		$('.' + itemNumber).fadeIn('fast');
		
		$('.li_for_post').removeClass('li_active').not(this).css('background', 'none');
		$(this).addClass('li_active');
	});
	
	// Right Tab navigation
	$('.tab_navigation > li').click(function() {
		var contentTab = $(this).attr('class');
		$('.content_tab#' + contentTab).show();
		$('.content_tab').not('#' + contentTab).hide();
		$(this).addClass('selected');
		$('.tab_navigation > li').not(this).removeClass('selected');
	});
	
	// Course circle
	$('.top_course_link_ul > li').mouseover( function() {
		var src = $(this).attr('class');
		$('.top_course_circle').css('background-image', 'url(/wp-content/themes/languagelink/images/' + src + '.jpg)');
	});

	$('#contact_form').validate({
		rules: {
			contact_name: {required: true},
			contact_email: {required: true, email: true},
			contact_school: {required: true},	
			contact_area: {required: true}
		},
		messages: {
			contact_name: {required: "Vui lòng nhập họ tên"},
			contact_email: {required: "Vui lòng nhập email", email: "Nhập đúng định dạng email"},	
			contact_school: {required: "Vui lòng nhập nội dung"},	
			contact_area: {required: "Vui lòng nhập nội dung"}
		}
	});	


	if( $('body').hasClass('tax-test') ) {	
		/* Test intro form */
		$('#test_intro_form').validate({
			rules: {
				test_name: {required: true},
				test_email: {required: true, email: true},				
				test_phone: {required: true, number: true}
			},
			messages: {
				test_name: {required: "Vui lòng nhập họ tên"},		
				test_email: {required: "Vui lòng nhập email", email: "Nhập đúng định dạng email"},						
				test_phone: {required: "Vui lòng nhập số điện thoại", number: "Số điện thoại phải là số 0-9"}	
			}
		});


		/* Next/prev testing quesion */
		$('.next_quesion').click(function() {
			$('.test_quesion').hide();
			$(this).parent().next().show();

			var quesionNum = $(this).parent().next().attr('for');
			$('.test_current').text(quesionNum);
		});


		/* testing countdown */
		if( $("#testing").length ) {
			var count = 1800; 										// 1800 seconds = 30 minutes
			var counter = setInterval(function(){timer()},1000);	// 1000 will  run it every 1 second

			function timer() {
			    count = count - 1;
			    if (count == -1) {
			        clearInterval(counter);
			        alert('Thời gian làm bài test của bạn đã hết');
			        $('#submit_test').trigger('click');
			        return;
			    }

			    var seconds = count % 60;
			    var minutes = Math.floor(count / 60);
			    minutes %= 60;

			    $('.test_count_time').text(minutes + ' phút ' + seconds + ' giây');
			}
		}
	}
});