---
layout: page
title: Search
permalink: /search/
---

<div class="search-container">
  <div class="search-input-wrapper">
    <input type="text" id="search-input" placeholder="Search blog posts..." />
    <button id="clear-search" class="clear-search-btn" aria-label="Clear search" style="display: none;">
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
    </button>
  </div>
  <div id="search-results"></div>
</div>

<script src="{{ site.baseurl }}/assets/simple-jekyll-search.min.js"></script>

<script>
(function() {
  'use strict';

  const searchInput = document.getElementById('search-input');
  const clearBtn = document.getElementById('clear-search');
  const resultsContainer = document.getElementById('search-results');

  // Create a hidden input for SimpleJekyllSearch to use
  const hiddenInput = document.createElement('input');
  hiddenInput.type = 'hidden';
  hiddenInput.id = 'hidden-search-input';
  document.body.appendChild(hiddenInput);

  // Initialize Simple Jekyll Search with hidden input
  const searchInstance = SimpleJekyllSearch({
    searchInput: hiddenInput,
    resultsContainer: resultsContainer,
    json: '{{ site.baseurl }}/search.json',
    searchResultTemplate: '<div class="search-result"><h3><a href="{url}">{title}</a></h3><p>{excerpt}</p><p class="search-meta">{date} · {categories}</p></div>',
    noResultsText: '<p class="no-results">No results found</p>',
    limit: 10,
    fuzzy: false
  });

  // Manual search handling
  searchInput.addEventListener('input', function(e) {
    const value = e.target.value;
    const trimmedValue = value.trim();

    // Show/hide clear button
    if (value.length > 0) {
      clearBtn.style.display = 'flex';
    } else {
      clearBtn.style.display = 'none';
    }

    // If input is only whitespace or empty, clear results
    if (trimmedValue === '') {
      resultsContainer.innerHTML = '';
      hiddenInput.value = '';
      // Trigger input event on hidden input to clear search
      hiddenInput.dispatchEvent(new Event('input'));
      return;
    }

    // Valid search - update hidden input and trigger search
    hiddenInput.value = trimmedValue;
    hiddenInput.dispatchEvent(new Event('input'));
  });

  // Clear search functionality
  clearBtn.addEventListener('click', function() {
    searchInput.value = '';
    hiddenInput.value = '';
    resultsContainer.innerHTML = '';
    clearBtn.style.display = 'none';
    searchInput.focus();
  });

  // Clear on ESC key
  searchInput.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && searchInput.value) {
      searchInput.value = '';
      hiddenInput.value = '';
      resultsContainer.innerHTML = '';
      clearBtn.style.display = 'none';
    }
  });
})();
</script>

<style>
.search-container {
  margin: 2em 0;
}

.search-input-wrapper {
  position: relative;
  margin-bottom: 20px;
}

#search-input {
  width: 100%;
  padding: 12px 48px 12px 20px;
  font-size: 16px;
  background: var(--card-bg);
  color: var(--text-primary);
  border: 2px solid var(--border-secondary);
  border-radius: 8px;
  box-sizing: border-box;
  transition: all 0.3s ease;
}

#search-input::placeholder {
  color: var(--text-tertiary);
}

#search-input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.clear-search-btn {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: transparent;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  color: var(--text-tertiary);
  transition: all 0.2s ease;
  padding: 0;
}

.clear-search-btn:hover {
  background: var(--bg-tertiary);
  color: #667eea;
  transform: translateY(-50%) scale(1.1);
}

.clear-search-btn:active {
  transform: translateY(-50%) scale(0.95);
}

.clear-search-btn svg {
  width: 18px;
  height: 18px;
}

#search-results {
  margin-top: 20px;
}

.search-result {
  padding: 20px;
  margin-bottom: 16px;
  background: var(--card-bg);
  border: 1px solid var(--border-primary);
  border-radius: 8px;
  transition: all 0.3s ease;
}

.search-result:hover {
  border-color: #667eea;
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}

.search-result:last-child {
  border-bottom: 1px solid var(--border-primary);
}

.search-result h3 {
  margin: 0 0 10px 0;
}

.search-result h3 a {
  color: var(--text-primary);
  text-decoration: none;
  transition: color 0.2s ease;
}

.search-result h3 a:hover {
  color: #667eea;
}

.search-result p {
  color: var(--text-tertiary);
  margin: 5px 0;
  line-height: 1.6;
}

.search-meta {
  font-size: 14px;
  color: var(--text-muted);
  display: flex;
  align-items: center;
  gap: 8px;
}

.no-results {
  text-align: center;
  padding: 40px 20px;
  color: var(--text-tertiary);
  font-size: 16px;
  background: var(--bg-secondary);
  border-radius: 8px;
  border: 1px dashed var(--border-secondary);
}
</style>
