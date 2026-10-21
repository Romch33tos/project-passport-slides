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

  var touchStartX = 0;
  var touchStartY = 0;
  var isTouchActive = false;

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

  document.addEventListener('keydown', function (event) {
    if (
      event.key === 'ArrowRight' ||
      event.key === ' ' ||
      event.key === 'Spacebar' ||
      event.key === 'PageDown'
    ) {
      event.preventDefault();
      showNextSlide();
    } else if (event.key === 'ArrowLeft' || event.key === 'PageUp') {
      event.preventDefault();
      showPreviousSlide();
    } else if (event.key === 'Home') {
      event.preventDefault();
      goToSlide(0);
    } else if (event.key === 'End') {
      event.preventDefault();
      goToSlide(totalSlides - 1);
    }
  });

  deck.addEventListener('mousedown', function (event) {
    if (event.target.closest('a, button, input, textarea, select')) return;

    if (event.button === 0) {
      event.preventDefault();
      if (event.shiftKey) {
        showPreviousSlide();
      } else {
        showNextSlide();
      }
    } else if (event.button === 2) {
      event.preventDefault();
      showPreviousSlide();
    }
  });

  deck.addEventListener('contextmenu', function (event) {
    event.preventDefault();
  });

  deck.addEventListener('touchstart', function (event) {
    if (event.touches.length !== 1) return;
    isTouchActive = true;
    touchStartX = event.touches[0].clientX;
    touchStartY = event.touches[0].clientY;
  }, { passive: true });

  deck.addEventListener('touchend', function (event) {
    if (!isTouchActive) return;
    isTouchActive = false;

    var touch = event.changedTouches[0];
    var deltaX = touch.clientX - touchStartX;
    var deltaY = touch.clientY - touchStartY;

    if (Math.abs(deltaX) > 50 && Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX < 0) {
        showNextSlide();
      } else {
        showPreviousSlide();
      }
    }
  }, { passive: true });

  renderSlides();
})();
