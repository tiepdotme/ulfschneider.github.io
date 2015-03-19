function banner() {
	$('.full').css('height', bannerHeight());
	$('.banner').backstretch('resize');
}

function pageContent() {
	$('#pageContent').css('min-height', bannerHeight());
}

function bannerHeight() {
	var height = $(window).height();
	var headerHeight = $('.site-header').height();
	return  height - headerHeight;
}

function fullHeight() {
	return $(window).height();
}


function wide(cssClass) {
		var width = $(window).width();
		var wrapperWidth = $('.wrapper').width();
		$(cssClass).css('width', width);
		$(cssClass).css('min-width', width);
		$(cssClass).css('margin-left', -((width - wrapperWidth)/2));
}


function wider() {
	wide('.wide');	
}


var	showTopLink = false;
var showDownLink = false;

function navigation() {

	var scrollTop = $(document).scrollTop();	
	var doc = $(document).height();	
	var height = $(window).height();

	 	
	if (scrollTop >= height || (scrollTop > 50 && scrollTop + height >= doc - 100)) {
		if (showTopLink == false) {
			$('#goTop').show(0);
			showTopLink = true;
		}
		if (showDownLink == true) {
			$('#goDown').hide(0);
			showDownLink = false;
		}
	} else {
		if (showDownLink == false) {
			$('#goDown').show(0);
			showDownLink = true;
		}		
		if (showTopLink == true) {
			$('#goTop').hide(0);
			showTopLink = false;
		}
	}
}

$(function() {
	function scrollTop() {
		$('html, body').animate({scrollTop:0}, 1000);
	}
	
	function scrollDown() {
		$('html, body').animate({scrollTop:$('#pageContent').offset().top}, 1000);
	}
	
	$('#goTop').click(function() {scrollTop(); return false;});
	
	$('#goDown').click(function() {scrollDown(); return false;});
});


$(window).on('orientationchange', function(event) { banner(); pageContent(); wider(); navigation();});
$(window).on('load', function(event) { pageContent(); wider(); navigation(); });
$(window).resize(function(e) {
	window.resizeEvt;
   $(window).resize(function()
   {
       clearTimeout(window.resizeEvt);
       window.resizeEvt = setTimeout(function() { banner(); pageContent(); wider(); navigation();
       }, 250);
   });
});
$(document).scroll(function() {navigation();});
