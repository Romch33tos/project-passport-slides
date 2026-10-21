(function () {
  'use strict';

  var slides = Array.prototype.slice.call(document.querySelectorAll('.slide'));
  var counter = document.getElementById('counter');

  var totalSlides = slides.length;
  var currentIndex = 0;

  function padNumber(number) {
    return number < 10 ? '0' + number : '' + number;
  }

  function renderSlides() {
    slides.forEach(function (slide, slideIndex) {
      slide.classList.remove('active', 'prev');
      if (slideIndex === currentIndex) {
        slide.classList.add('active');
      } else if (slideIndex < currentIndex) {
        slide.classList.add('prev');
      }
    });

    counter.textContent = padNumber(currentIndex + 1) + ' / ' + padNumber(totalSlides);
  }

  renderSlides();
})();
