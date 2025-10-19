// Theme Toggle Script
(function() {
  'use strict';

  const THEME_KEY = 'rootcode-theme';
  const DARK_THEME = 'dark';
  const LIGHT_THEME = 'light';

  // Get theme from localStorage or system preference
  function getInitialTheme() {
    const savedTheme = localStorage.getItem(THEME_KEY);
    if (savedTheme) {
      return savedTheme;
    }

    // Check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      return LIGHT_THEME;
    }

    // Default to dark mode
    return DARK_THEME;
  }

  // Apply theme to document
  function applyTheme(theme) {
    if (theme === DARK_THEME) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  }

  // Save theme to localStorage
  function saveTheme(theme) {
    localStorage.setItem(THEME_KEY, theme);
  }

  // Toggle between light and dark theme
  function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? LIGHT_THEME : DARK_THEME;

    applyTheme(newTheme);
    saveTheme(newTheme);

    // Add transition class for smooth theme switching
    document.documentElement.classList.add('theme-transition');
    setTimeout(() => {
      document.documentElement.classList.remove('theme-transition');
    }, 300);
  }

  // Initialize theme on page load
  function initTheme() {
    const theme = getInitialTheme();
    applyTheme(theme);

    // Add click event to all theme toggle buttons
    const themeToggles = document.querySelectorAll('.theme-toggle-desktop, .theme-toggle-mobile');
    themeToggles.forEach(toggle => {
      toggle.addEventListener('click', toggleTheme);
    });
  }

  // Listen for system theme changes
  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      // Only auto-switch if user hasn't manually set a preference
      if (!localStorage.getItem(THEME_KEY)) {
        applyTheme(e.matches ? DARK_THEME : LIGHT_THEME);
      }
    });
  }

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTheme);
  } else {
    initTheme();
  }

  // Apply theme immediately to prevent flash
  const theme = getInitialTheme();
  applyTheme(theme);
})();
