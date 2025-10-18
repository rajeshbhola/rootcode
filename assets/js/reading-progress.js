/**
 * Reading Progress Bar
 * Shows reading progress at the top of blog posts
 */

(function() {
  'use strict';

  // Get the progress bar element
  const progressBar = document.querySelector('.reading-progress-bar');

  // Only run on pages with progress bar
  if (!progressBar) return;

  /**
   * Calculate and update reading progress
   */
  function updateProgressBar() {
    // Get document dimensions
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Calculate scroll percentage
    const scrollableHeight = documentHeight - windowHeight;
    const scrollPercentage = (scrollTop / scrollableHeight) * 100;

    // Ensure percentage is between 0 and 100
    const clampedPercentage = Math.min(Math.max(scrollPercentage, 0), 100);

    // Update progress bar width
    progressBar.style.width = clampedPercentage + '%';
  }

  /**
   * Throttle function to limit how often updateProgressBar runs
   * Improves performance during scroll
   */
  function throttle(func, delay) {
    let timeoutId;
    let lastRan;

    return function() {
      const context = this;
      const args = arguments;

      if (!lastRan) {
        func.apply(context, args);
        lastRan = Date.now();
      } else {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(function() {
          if ((Date.now() - lastRan) >= delay) {
            func.apply(context, args);
            lastRan = Date.now();
          }
        }, delay - (Date.now() - lastRan));
      }
    };
  }

  // Create throttled version of updateProgressBar
  const throttledUpdate = throttle(updateProgressBar, 10);

  // Update on scroll
  window.addEventListener('scroll', throttledUpdate, { passive: true });

  // Update on resize (in case document height changes)
  window.addEventListener('resize', throttledUpdate, { passive: true });

  // Initial update
  updateProgressBar();

  // Update after images load (they can change document height)
  window.addEventListener('load', updateProgressBar);
})();
