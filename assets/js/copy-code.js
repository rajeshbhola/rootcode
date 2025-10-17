// Copy Code Button Functionality
(function() {
  'use strict';

  // Wait for DOM to load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCopyButtons);
  } else {
    initCopyButtons();
  }

  function initCopyButtons() {
    // Find only the outermost code block wrappers (div.highlighter-rouge or standalone pre.highlight)
    const codeBlocks = document.querySelectorAll('div.highlighter-rouge, pre.highlight');

    codeBlocks.forEach(function(codeBlock) {
      // Skip if button already exists
      if (codeBlock.querySelector('.copy-code-button')) {
        return;
      }

      // Skip if this is inside a highlighter-rouge (to avoid nested buttons)
      if (codeBlock.classList.contains('highlight') && codeBlock.closest('div.highlighter-rouge')) {
        return;
      }

      // Create copy button
      const button = document.createElement('button');
      button.className = 'copy-code-button';
      button.type = 'button';
      button.textContent = 'Copy';
      button.setAttribute('aria-label', 'Copy code to clipboard');

      // Add click event
      button.addEventListener('click', function() {
        copyCode(codeBlock, button);
      });

      // Insert button into code block
      codeBlock.style.position = 'relative';
      codeBlock.insertBefore(button, codeBlock.firstChild);
    });
  }

  function copyCode(codeBlock, button) {
    // Find the code element
    const code = codeBlock.querySelector('pre code') ||
                 codeBlock.querySelector('code') ||
                 codeBlock.querySelector('pre');

    if (!code) {
      console.error('No code found to copy');
      return;
    }

    // Get the text content
    const textToCopy = code.textContent || code.innerText;

    // Try modern clipboard API first
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(textToCopy).then(function() {
        showCopySuccess(button);
      }).catch(function(err) {
        console.error('Failed to copy:', err);
        fallbackCopy(textToCopy, button);
      });
    } else {
      // Fallback for older browsers
      fallbackCopy(textToCopy, button);
    }
  }

  function fallbackCopy(text, button) {
    // Create temporary textarea
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.left = '-9999px';
    textarea.style.top = '-9999px';
    document.body.appendChild(textarea);

    // Select and copy
    textarea.focus();
    textarea.select();

    try {
      const successful = document.execCommand('copy');
      if (successful) {
        showCopySuccess(button);
      } else {
        console.error('Copy command failed');
      }
    } catch (err) {
      console.error('Failed to copy:', err);
    }

    // Remove temporary element
    document.body.removeChild(textarea);
  }

  function showCopySuccess(button) {
    const originalText = button.textContent;

    // Change button appearance
    button.classList.add('copied');
    button.textContent = 'Copied!';

    // Reset after 2 seconds
    setTimeout(function() {
      button.classList.remove('copied');
      button.textContent = originalText;
    }, 2000);
  }
})();
