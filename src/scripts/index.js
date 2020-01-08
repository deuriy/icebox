var swiperFrontpage = new Swiper ('.Swiper-frontpage', {
  loop: true,
  grabCursor: true,

  navigation: {
    nextEl: '.SwiperAll_next',
    prevEl: '.SwiperAll_prev',
  },

  pagination: {
    el: '.Swiper-frontpage .Swiper_pagination',
    clickable: true,
    bulletClass: 'Swiper_paginationItem',
    bulletActiveClass: 'Swiper_paginationItem-active',
  }
});

// breakpoint where swiper will be destroyed
// and switches to a dual-column layout
const breakpoint = window.matchMedia( '(min-width: 768px)' );

// keep track of swiper instances to destroy later
let swiperInfoBlocks;

const breakpointChecker = function() {
  // if larger viewport and multi-row layout needed
  if ( breakpoint.matches === true ) {
    // clean up old instances and inline styles when available
    $.each(swiperInfoBlocks, function(index, val) {
      if ( val !== undefined ) val.destroy( true, true );
    });
    // or/and do nothing
    return;
  // else if a small viewport and single column layout needed
  } else if ( breakpoint.matches === false ) {
    // fire small viewport version of swiper
    return enableSwipers();
  }
};

const enableSwipers = function() {
  swiperInfoBlocks = new Swiper ('.Swiper-infoBlock', {
    loop: true,
    grabCursor: true,
    spaceBetween: 20,

    navigation: {
      nextEl: '.Swiper-infoBlock .Swiper_next',
      prevEl: '.Swiper-infoBlock .Swiper_prev',
    },

    pagination: {
      el: '.Swiper-infoBlock .Swiper_pagination',
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

// Form validation
var formTrialLesson = new InteractiveForm('.Form-trialLesson');