(function () {
  'use strict';

  var slides = Array.prototype.slice.call(document.querySelectorAll('.slide'));
  var progressBar = document.getElementById('progressBar');
  var counter = document.getElementById('counter');
  var deck = document.getElementById('deck');

  var totalSlides = slides.length;
  var currentIndex = 0;
  var isLocked = false;
  var lockDuration = 340;

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

    var progressPercent = totalSlides > 1
      ? (currentIndex / (totalSlides - 1)) * 100
      : 100;

    progressBar.style.width = progressPercent + '%';
    counter.textContent = padNumber(currentIndex + 1) + ' / ' + padNumber(totalSlides);
  }

  function goToSlide(targetIndex) {
    if (isLocked) return;
    if (targetIndex < 0 || targetIndex >= totalSlides) return;
    if (targetIndex === currentIndex) return;

    isLocked = true;
    currentIndex = targetIndex;
    renderSlides();

    window.setTimeout(function () {
      isLocked = false;
    }, lockDuration);
  }

  function showNextSlide() {
    goToSlide(currentIndex + 1);
  }

  function showPreviousSlide() {
    goToSlide(currentIndex - 1);
  }

  renderSlides();
})();
