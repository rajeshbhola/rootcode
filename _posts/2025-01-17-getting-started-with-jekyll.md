---
layout: post
title: Getting Started with Jekyll
categories: [Tutorial, Jekyll]
---

Jekyll is a simple, blog-aware, static site generator perfect for personal, project, or organization sites. Let's explore how to get started with Jekyll and make the most of your new blog.

## What is Jekyll?

Jekyll is a static site generator written in Ruby. It takes text written in your favorite markup language (Markdown, in our case) and uses layouts to create a static website. You can tweak the site's look and feel, URLs, the data displayed on the page, and more.

## Key Concepts

### 1. Posts

Posts are blog entries stored in the `_posts` directory. They must follow the naming convention:

```
YEAR-MONTH-DAY-title.md
```

Example: `2025-01-17-my-first-post.md`

### 2. Front Matter

Every post begins with YAML front matter:

```yaml
---
layout: post
title: My Post Title
categories: [Category1, Category2]
date: 2025-01-17
---
```

### 3. Layouts

Layouts are templates stored in the `_layouts` directory. They define the structure of your pages:

- `default.html`: Base layout with header, footer, and navigation
- `post.html`: Layout for blog posts
- `page.html`: Layout for static pages

### 4. Includes

Includes are reusable components stored in the `_includes` directory:

- `meta.html`: Meta tags for SEO
- `analytics.html`: Google Analytics integration
- `disqus.html`: Comments section
- `svg-icons.html`: Social media icons

### 5. Configuration

The `_config.yml` file contains site-wide configuration:

```yaml
name: RootCode
description: A Jekyll blog
url: https://rajeshbhola.github.io/rootcode
baseurl: /rootcode
```

## Directory Structure

Your Jekyll site has the following structure:

```
rootcode/
├── _config.yml          # Configuration file
├── _includes/           # Reusable components
├── _layouts/            # Page templates
├── _posts/              # Blog posts
├── _sass/               # Sass partials
├── assets/              # CSS, images, JavaScript
├── index.html           # Homepage
└── Gemfile              # Ruby dependencies
```

## Writing Posts

### Create a New Post

1. Create a new file in `_posts/`:
   ```
   _posts/2025-01-17-my-new-post.md
   ```

2. Add front matter:
   ```yaml
   ---
   layout: post
   title: My New Post
   categories: [Tutorial]
   ---
   ```

3. Write your content in Markdown

4. Save the file

### Post Variables

You can use these variables in your posts:

- `{{ "{{page.title" }}}}`: Post title
- `{{ "{{page.date" }}}}`: Post date
- `{{ "{{page.url" }}}}`: Post URL
- `{{ "{{page.categories" }}}}`: Post categories
- `{{ "{{content" }}}}`: Post content

## Building Your Site

### Local Development

To run Jekyll locally:

```bash
# Install dependencies
bundle install

# Build and serve the site
bundle exec jekyll serve

# Or with live reload
bundle exec jekyll serve --livereload
```

Your site will be available at `http://localhost:4000/rootcode`

### Production Build

To build for production:

```bash
bundle exec jekyll build
```

The built site will be in the `_site` directory.

## Customization

### Change Site Name and Description

Edit `_config.yml`:

```yaml
name: Your Site Name
description: Your site description
```

### Update Social Links

In `_config.yml`, update footer-links:

```yaml
footer-links:
  github: yourusername
  twitter: yourusername
  linkedin: yourusername
```

### Modify Styles

Edit SCSS files in `_sass/`:

- `_variables.scss`: Colors, fonts, breakpoints
- `_reset.scss`: CSS reset
- `_highlights.scss`: Code syntax highlighting

## Tips and Tricks

### 1. Use Excerpts

Add an excerpt to your post for the homepage:

```markdown
---
layout: post
title: My Post
excerpt: This is a short description...
---
```

Or use the `<!--more-->` tag:

```markdown
This will appear as the excerpt.
<!--more-->
This will only appear in the full post.
```

### 2. Draft Posts

Store drafts in `_drafts/` without dates:

```
_drafts/my-draft-post.md
```

Preview drafts with:

```bash
bundle exec jekyll serve --drafts
```

### 3. Custom URLs

Set custom URLs in front matter:

```yaml
---
permalink: /custom-url/
---
```

### 4. Add Images

Store images in `/images/` and reference them:

```markdown
![Description](/rootcode/images/photo.jpg)
```

## Next Steps

1. **Customize your site**: Update colors, fonts, and layout
2. **Write more posts**: Share your knowledge and experiences
3. **Add features**: Comments, analytics, search
4. **Deploy**: Push to GitHub Pages or another hosting service

## Resources

- [Jekyll Documentation](https://jekyllrb.com/docs/)
- [Markdown Guide](https://www.markdownguide.org/)
- [GitHub Pages](https://pages.github.com/)
- [Liquid Template Language](https://shopify.github.io/liquid/)

Happy blogging! 🚀
