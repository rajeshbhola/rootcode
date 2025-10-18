/**
 * Mobile Menu Toggle
 * Handles the hamburger menu functionality for mobile devices
 */

(function() {
  'use strict';

  // Create overlay element
  const overlay = document.createElement('div');
  overlay.className = 'menu-overlay';
  document.body.appendChild(overlay);

  // Get elements
  const hamburger = document.querySelector('.hamburger-menu');
  const nav = document.querySelector('.main-nav');

  if (!hamburger || !nav) return;

  // Toggle menu function
  function toggleMenu() {
    const isActive = hamburger.classList.toggle('active');
    nav.classList.toggle('active');
    overlay.classList.toggle('active');

    // Update aria-expanded for accessibility
    hamburger.setAttribute('aria-expanded', isActive);

    // Prevent body scroll when menu is open
    if (isActive) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  // Close menu function
  function closeMenu() {
    hamburger.classList.remove('active');
    nav.classList.remove('active');
    overlay.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  // Event listeners
  hamburger.addEventListener('click', toggleMenu);
  overlay.addEventListener('click', closeMenu);

  // Close menu when clicking on a nav link
  const navLinks = nav.querySelectorAll('a');
  navLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close menu on ESC key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && hamburger.classList.contains('active')) {
      closeMenu();
    }
  });

  // Close menu on window resize to desktop
  let resizeTimer;
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
      if (window.innerWidth > 640 && hamburger.classList.contains('active')) {
        closeMenu();
      }
    }, 250);
  });
})();
