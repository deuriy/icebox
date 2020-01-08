// Swiper slider
var swiperTrainers = new Swiper ('.Swiper-trainers', {
  loop: true,
  allowTouchMove: false,
  effect: 'fade',

  breakpoints: {
    1023: {
      allowTouchMove: true
    }
  },

  fadeEffect: {
    crossFade: true
  },

  navigation: {
    nextEl: '.Trainer_swiperNext, .Trainer_swiperArrow-next',
    prevEl: '.Trainer_swiperArrow-prev',
  }
});