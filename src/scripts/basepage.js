// Swiper slider
var swiperBasePage = new Swiper ('.Swiper-basePage', {
  loop: true,
  grabCursor: true,

  navigation: {
    nextEl: '.BasePage_swiperArrow-next',
    prevEl: '.BasePage_swiperArrow-prev',
  },

  pagination: {
    el: '.Swiper-basePage .Swiper_pagination',
    clickable: true,
    bulletClass: 'Swiper_paginationItem',
    bulletActiveClass: 'Swiper_paginationItem-active',
  }
});