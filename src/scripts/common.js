/*=require ./includes/blocks/*.js*/
// Menu Hamburger
$('.MenuHamburger').click(function(){
	$(this).toggleClass('MenuHamburger-open');
	$(document.body).toggleClass('overlay');
});

// Adaptive menu
var touch = $('.MenuHamburger');
var menu = $('.MenuHamburger+.MobileNavigation');

$(touch).on('click', function(e){
	e.preventDefault();
	menu.fadeToggle();
});

$(window).resize(function(){
	var wid = $(window).width();
	if (wid > 991) {
		menu.removeAttr('style');
		touch.removeClass('MenuHamburger-open');
	};
});

// Active menu item
function activeMenuItems() {
	// Get current path and find target items
	var path = window.location.pathname.split("/").pop();      
	var $targetItems = $('.MainMenu_link[href="/'+path+'"]').parent();

	// Add active class to current items
	$targetItems.each(function(index, el) {
		$(this).addClass('MainMenu_item-active');
	});
}

activeMenuItems();

window.pagePreloader = new Preloader("#pagePreloader");
window.pagePreloader.hide();

// Fixed mobile menu
const breakpointMd = window.matchMedia( '(min-width: 1024px)' );

var $header = $('.Header');

const breakpointCheckerMd = function() {
	if ( breakpointMd.matches === true ) {
		$header.removeClass('Header-fixed');
	} else if ( breakpointMd.matches === false ) {
		$header.addClass('Header-fixed');
	}
};

// keep an eye on viewport size changes
breakpointMd.addListener(breakpointCheckerMd);

// kickstart
breakpointCheckerMd();

var oldScrollY = 0;
var $fixedHeader = $('.Header-fixed');

$(window).scroll(function(event) {

	var scrolled = $(window).scrollTop();
	var dY = scrolled - oldScrollY;

	console.log(scrolled);

	if (scrolled > 20) {
		if ( dY > 0 ){
			$fixedHeader.addClass('Header-fixedTop');
		} else {
			$fixedHeader.removeClass('Header-fixedTop');
		}
	} else {
		$fixedHeader.removeClass('Header-fixedTop');
	}
	
	oldScrollY = scrolled;
});