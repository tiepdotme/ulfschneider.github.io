function banner() {
	$('.banner.full').css('height', bannerHeight());
	$('.banner').backstretch('resize');
}

function adjustFullHeight() {

	var docHeight = $(document).height();
	if (docHeight >= fullHeight() + headerHeight()) {
		$('.full-height').css("min-height", fullHeight() );
	} else {
		$('.full-height').css("min-height", bannerHeight());
	}
}


function headerHeight() {
	return $('#siteHeader').height();
}

function bannerHeight() {
	return  fullHeight() - headerHeight();
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



function navigation() {
	var scrollTop = $(document).scrollTop();	
	var doc = $(document).height();	
	var height = $(window).height();

	 
	if (internalReferrer() == false)	{
		$('#goBack').hide(0);
	} else {
		$('#goBack').show(0);
	}
	
	if (scrollTop >= height	- 100 || (scrollTop > 100 && scrollTop + height >= doc - 100)) {
		$('#goTop').show(0);
	}	else {
		$('#goTop').hide(0);
	}
	if (scrollTop > 100) {
		$('#goDown').hide(0);
	} else {
		$('#goDown').show(0);
	}
	
}

function sizing() {
	banner();  
	adjustFullHeight();
	wider(); 
	navigation();
	
}

function internalReferrer() {
	var referrer = $(document).attr('referrer');
	var host = $(location).attr('hostname');
	var protocol = $(location).attr('protocol');

	if (referrer.indexOf(protocol + '//' + host) === 0) {
		return true;
	} else {
		return false;
	}
}

function goBack() {
	var referrer = $(document).attr('referrer');
	window.location = referrer;
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


$(window).on('orientationchange', function(event) { sizing();});
$(window).on('load', function(event) {  sizing(); });
$(window).resize(function(e) {
	window.resizeEvt;
   $(window).resize(function()
   {
       clearTimeout(window.resizeEvt);
       window.resizeEvt = setTimeout(function() {  sizing();
       }, 250);
   });
});
$(document).scroll(function() {navigation();});
