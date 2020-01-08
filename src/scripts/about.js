// breakpoint where swiper will be destroyed
// and switches to a dual-column layout
const breakpoint = window.matchMedia( '(min-width: 1024px)' );

// keep track of swiper instances to destroy later
let swiperPageAbout;

const breakpointChecker = function() {
  // if larger viewport and multi-row layout needed
  if ( breakpoint.matches === true ) {
    // clean up old instances and inline styles when available
    if ( swiperPageAbout !== undefined ) swiperPageAbout.destroy( true, true );
    // or/and do nothing
    return;
  // else if a small viewport and single column layout needed
  } else if ( breakpoint.matches === false ) {
    // fire small viewport version of swiper
    return enableSwiper();
  }
};

const enableSwiper = function() {
  swiperPageAbout = new Swiper ('.Swiper-pageAbout', {
    loop: true,
    grabCursor: true,
    spaceBetween: 20,

    navigation: {
      nextEl: '.About_swiperArrow-next',
      prevEl: '.About_swiperArrow-prev',
    },

    pagination: {
      el: '.Swiper-pageAbout .Swiper_pagination',
      clickable: true,
      bulletClass: 'Swiper_paginationItem',
      bulletActiveClass: 'Swiper_paginationItem-active',
    }
  });
};

// keep an eye on viewport size changes
breakpoint.addListener(breakpointChecker);

// kickstart
breakpointChecker();

$('.About_moreLink').on('click', function(event) {
  event.preventDefault();
  $('.Swiper-pageAbout').addClass('Swiper-pageAboutExpanded');
  $(this).hide();
});