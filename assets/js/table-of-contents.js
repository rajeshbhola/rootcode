// Table of Contents Generator
(function() {
  'use strict';

  // Wait for DOM to load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTableOfContents);
  } else {
    initTableOfContents();
  }

  function initTableOfContents() {
    // Only run on post pages
    const postContent = document.querySelector('.post.detailed');
    if (!postContent) {
      return;
    }

    // Find all headings (h2 and h3)
    const headings = postContent.querySelectorAll('h2, h3');

    if (headings.length < 3) {
      // Don't show TOC if there are fewer than 3 headings
      return;
    }

    // Create TOC container
    const tocContainer = document.createElement('div');
    tocContainer.className = 'table-of-contents';
    tocContainer.innerHTML = `
      <div class="toc-header">
        <h3>Table of Contents</h3>
        <button class="toc-toggle" aria-label="Toggle table of contents" aria-expanded="true">
          <span class="toc-icon">−</span>
        </button>
      </div>
      <nav class="toc-content">
        <ul class="toc-list"></ul>
      </nav>
    `;

    // Generate TOC list
    const tocList = tocContainer.querySelector('.toc-list');
    let currentLevel = 2;
    let currentList = tocList;
    const listStack = [tocList];

    headings.forEach(function(heading, index) {
      const level = parseInt(heading.tagName.charAt(1));
      const text = heading.textContent;
      const id = heading.id || 'heading-' + index;

      // Add ID if it doesn't exist
      if (!heading.id) {
        heading.id = id;
      }

      // Handle nesting
      if (level > currentLevel) {
        // Create nested list
        const nestedList = document.createElement('ul');
        nestedList.className = 'toc-list-nested';
        const lastItem = currentList.lastElementChild;
        if (lastItem) {
          lastItem.appendChild(nestedList);
        }
        listStack.push(nestedList);
        currentList = nestedList;
      } else if (level < currentLevel) {
        // Go back up
        listStack.pop();
        currentList = listStack[listStack.length - 1];
      }

      currentLevel = level;

      // Create list item
      const li = document.createElement('li');
      li.className = 'toc-item toc-' + heading.tagName.toLowerCase();

      const link = document.createElement('a');
      link.href = '#' + id;
      link.textContent = text;
      link.className = 'toc-link';

      // Smooth scroll on click
      link.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.getElementById(id);
        if (target) {
          const offset = 80; // Offset for fixed header if any
          const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;

          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });

          // Update URL without jumping
          history.pushState(null, null, '#' + id);

          // Highlight active link
          updateActiveLink(link);
        }
      });

      li.appendChild(link);
      currentList.appendChild(li);
    });

    // Create a container for TOC and entry in sidebar layout
    const entryDiv = postContent.querySelector('.entry');

    if (entryDiv) {
      // Create post-container div
      const postContainer = document.createElement('div');
      postContainer.className = 'post-container';

      // Wrap entry in the container
      entryDiv.parentNode.insertBefore(postContainer, entryDiv);
      postContainer.appendChild(tocContainer);
      postContainer.appendChild(entryDiv);
    } else {
      // Fallback: insert after all metadata
      const authorTitle = postContent.querySelector('.author_title');
      const dateDiv = postContent.querySelector('.date');

      let insertionPoint = null;
      if (authorTitle && authorTitle.nextElementSibling) {
        const nextAuthor = authorTitle.nextElementSibling;
        if (nextAuthor && nextAuthor.classList.contains('author_title')) {
          insertionPoint = nextAuthor;
        } else {
          insertionPoint = authorTitle;
        }
      } else if (dateDiv) {
        insertionPoint = dateDiv;
      } else {
        const postTitle = postContent.querySelector('h1');
        insertionPoint = postTitle;
      }

      if (insertionPoint && insertionPoint.nextSibling) {
        insertionPoint.parentNode.insertBefore(tocContainer, insertionPoint.nextSibling);
      } else if (insertionPoint) {
        insertionPoint.parentNode.appendChild(tocContainer);
      } else {
        postContent.insertBefore(tocContainer, postContent.firstChild);
      }
    }

    // Toggle functionality
    const toggleButton = tocContainer.querySelector('.toc-toggle');
    const tocIcon = toggleButton.querySelector('.toc-icon');

    toggleButton.addEventListener('click', function() {
      const isExpanded = tocContainer.classList.toggle('collapsed');
      toggleButton.setAttribute('aria-expanded', !isExpanded);
      tocIcon.textContent = isExpanded ? '+' : '−';
    });

    // Highlight active section on scroll
    let scrollTimeout;
    window.addEventListener('scroll', function() {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(updateActiveSection, 100);
    });

    function updateActiveSection() {
      const scrollPosition = window.pageYOffset + 100;

      headings.forEach(function(heading) {
        const headingTop = heading.offsetTop;
        const link = tocContainer.querySelector('a[href="#' + heading.id + '"]');

        if (link) {
          if (scrollPosition >= headingTop) {
            updateActiveLink(link);
          }
        }
      });
    }

    function updateActiveLink(activeLink) {
      // Remove all active classes
      tocContainer.querySelectorAll('.toc-link').forEach(function(link) {
        link.classList.remove('active');
      });

      // Add active class to current link
      activeLink.classList.add('active');
    }

    // Set initial active link
    updateActiveSection();
  }
})();
