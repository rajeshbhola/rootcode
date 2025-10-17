---
layout: page
title: Search
permalink: /search/
---

# Search

<div class="search-container">
  <input type="text" id="search-input" placeholder="Search blog posts..." />
  <div id="search-results"></div>
</div>

<script src="{{ site.baseurl }}/assets/simple-jekyll-search.min.js"></script>

<script>
SimpleJekyllSearch({
  searchInput: document.getElementById('search-input'),
  resultsContainer: document.getElementById('search-results'),
  json: '{{ site.baseurl }}/search.json',
  searchResultTemplate: '<div class="search-result"><h3><a href="{url}">{title}</a></h3><p>{excerpt}</p><p class="search-meta">{date} · {categories}</p></div>',
  noResultsText: '<p>No results found</p>',
  limit: 10,
  fuzzy: false
})
</script>

<style>
.search-container {
  margin: 2em 0;
}

#search-input {
  width: 100%;
  padding: 12px 20px;
  font-size: 16px;
  border: 2px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
  margin-bottom: 20px;
}

#search-input:focus {
  outline: none;
  border-color: #4183C4;
}

#search-results {
  margin-top: 20px;
}

.search-result {
  padding: 20px 0;
  border-bottom: 1px solid #eee;
}

.search-result:last-child {
  border-bottom: none;
}

.search-result h3 {
  margin: 0 0 10px 0;
}

.search-result h3 a {
  color: #333;
  text-decoration: none;
}

.search-result h3 a:hover {
  color: #4183C4;
}

.search-result p {
  color: #666;
  margin: 5px 0;
}

.search-meta {
  font-size: 14px;
  color: #999;
}
</style>

---

**Note**: The search functionality requires the Simple Jekyll Search plugin. If you haven't set it up yet, follow these steps:

1. Download [simple-jekyll-search.min.js](https://github.com/christian-fei/Simple-Jekyll-Search/blob/master/dest/simple-jekyll-search.min.js)
2. Save it to `assets/simple-jekyll-search.min.js`
3. Create `search.json` in the root directory (see Getting Started guide)

The search will work across all your blog post titles, content, and categories.
