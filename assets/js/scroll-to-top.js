// Scroll to Top Button Functionality
(function() {
  'use strict';

  // Wait for DOM to load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initScrollToTop);
  } else {
    initScrollToTop();
  }

  function initScrollToTop() {
    // Create scroll to top button
    const scrollButton = document.createElement('button');
    scrollButton.className = 'scroll-to-top';
    scrollButton.setAttribute('aria-label', 'Scroll to top');
    scrollButton.innerHTML = '↑';
    scrollButton.style.display = 'none';

    // Append to body
    document.body.appendChild(scrollButton);

    // Show/hide button based on scroll position
    let scrollTimeout;
    window.addEventListener('scroll', function() {
      clearTimeout(scrollTimeout);

      scrollTimeout = setTimeout(function() {
        if (window.pageYOffset > 300) {
          scrollButton.style.display = 'flex';
          // Trigger fade-in animation
          setTimeout(function() {
            scrollButton.classList.add('visible');
          }, 10);
        } else {
          scrollButton.classList.remove('visible');
          // Wait for fade-out animation before hiding
          setTimeout(function() {
            if (!scrollButton.classList.contains('visible')) {
              scrollButton.style.display = 'none';
            }
          }, 300);
        }
      }, 100); // Debounce scroll event
    });

    // Scroll to top when clicked
    scrollButton.addEventListener('click', function() {
      scrollToTop();
    });

    // Keyboard accessibility
    scrollButton.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        scrollToTop();
      }
    });
  }

  function scrollToTop() {
    // Smooth scroll to top
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });

    // Fallback for browsers that don't support smooth scroll
    if (window.pageYOffset > 0) {
      var scrollStep = -window.pageYOffset / 20;
      var scrollInterval = setInterval(function() {
        if (window.pageYOffset !== 0) {
          window.scrollBy(0, scrollStep);
        } else {
          clearInterval(scrollInterval);
        }
      }, 15);
    }
  }
})();
