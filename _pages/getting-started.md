---
layout: page
title: Getting Started
permalink: /getting-started/
---

# Getting Started with RootCode

Welcome! This guide will help you set up and customize your RootCode blog.

## Prerequisites

Before you begin, make sure you have:

- [Ruby](https://www.ruby-lang.org/en/downloads/) (version 2.5.0 or higher)
- [RubyGems](https://rubygems.org/pages/download)
- [Git](https://git-scm.com/)
- A [GitHub account](https://github.com/)
- A text editor (we recommend [VS Code](https://code.visualstudio.com/))

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/rajeshbhola/rajeshbhola.github.io.git rootcode
cd rootcode
```

### 2. Install Dependencies

```bash
bundle install
```

This will install Jekyll and all required gems specified in the `Gemfile`.

### 3. Run Locally

```bash
bundle exec jekyll serve
```

Your blog will be available at `http://localhost:4000/rootcode`

For live reload during development:

```bash
bundle exec jekyll serve --livereload
```

## Configuration

### Basic Settings

Edit `_config.yml` to customize your blog:

```yaml
# Site information
name: RootCode
description: Your blog description

# Your details
avatar: https://url-to-your-avatar.jpg

# Social links
footer-links:
  github: yourusername
  twitter: yourusername
  linkedin: yourusername
  email: your.email@example.com

# Analytics (optional)
google_analytics: UA-XXXXXXXX-X

# Comments (optional)
disqus: your-disqus-shortname

# Site URL
url: https://rajeshbhola.github.io/rootcode
baseurl: /rootcode
```

**Important**: After changing `_config.yml`, restart the Jekyll server for changes to take effect.

## Writing Your First Post

### 1. Create a New Post File

Create a new file in the `_posts` directory:

```
_posts/2025-01-17-my-first-post.md
```

The filename must follow the format: `YEAR-MONTH-DAY-title.md`

### 2. Add Front Matter

Start your post with YAML front matter:

```yaml
---
layout: post
title: My First Post
categories: [Category1, Category2]
---
```

### 3. Write Your Content

Use Markdown to write your content:

```markdown
## This is a heading

This is a paragraph with **bold text** and *italic text*.

### Code Example

```python
def hello():
    print("Hello, World!")
```
```

### 4. Preview Your Post

Save the file and refresh your browser. Your post will appear on the homepage.

## Customizing Your Blog

### Change Colors and Fonts

Edit `_sass/_variables.scss`:

```scss
// Colors
$blue: #4183C4;
$darkGray: #333;
$gray: #666;
$lightGray: #eee;

// Fonts
$helvetica: Helvetica, Arial, sans-serif;
$helveticaNeue: "Helvetica Neue", Helvetica, Arial, sans-serif;
```

### Modify Layout

Edit layout files in `_layouts/`:

- `default.html`: Main template
- `post.html`: Blog post template
- `page.html`: Static page template

### Add New Pages

Create a new file in `_pages/`:

```markdown
---
layout: page
title: My New Page
permalink: /my-page/
---

Your page content here.
```

## Adding Features

### Google Analytics

1. Get your tracking ID from [Google Analytics](https://analytics.google.com/)
2. Add it to `_config.yml`:

```yaml
google_analytics: UA-XXXXXXXX-X
```

### Disqus Comments

1. Create a [Disqus](https://disqus.com/) account
2. Get your shortname
3. Add it to `_config.yml`:

```yaml
disqus: your-shortname
```

### Custom Domain

1. Create a file named `CNAME` in the root directory
2. Add your domain:

```
yourdomain.com
```

3. Configure DNS settings with your domain provider

## Deployment

### Deploy to GitHub Pages

1. Commit your changes:

```bash
git add .
git commit -m "Initial commit"
```

2. Push to GitHub:

```bash
git push origin main
```

3. Enable GitHub Pages:
   - Go to repository Settings
   - Navigate to Pages section
   - Select branch: `main`
   - Save

Your site will be live at `https://rajeshbhola.github.io/rootcode`

### Build for Production

To build static files for other hosting:

```bash
bundle exec jekyll build
```

Files will be generated in `_site/` directory.

## Troubleshooting

### Jekyll won't start

```bash
# Clear cache and rebuild
bundle exec jekyll clean
bundle exec jekyll serve
```

### Changes not showing

1. Restart Jekyll server (required for `_config.yml` changes)
2. Clear browser cache
3. Try incognito mode

### Gem installation issues

```bash
# Update bundler
gem update bundler

# Reinstall gems
bundle install
```

### Port already in use

```bash
# Use different port
bundle exec jekyll serve --port 4001
```

## Best Practices

1. **Version Control**: Commit changes regularly
2. **Backups**: Keep backups of your content
3. **Testing**: Test locally before pushing
4. **SEO**: Use descriptive titles and meta descriptions
5. **Images**: Optimize images before uploading
6. **Mobile**: Test on different screen sizes
7. **Accessibility**: Use proper heading hierarchy

## Useful Commands

```bash
# Start server
bundle exec jekyll serve

# Build site
bundle exec jekyll build

# Clean build files
bundle exec jekyll clean

# Show drafts
bundle exec jekyll serve --drafts

# Live reload
bundle exec jekyll serve --livereload

# Build for production
JEKYLL_ENV=production bundle exec jekyll build
```

## Resources

- [Jekyll Documentation](https://jekyllrb.com/docs/)
- [Markdown Guide](https://www.markdownguide.org/)
- [Liquid Templating](https://shopify.github.io/liquid/)
- [GitHub Pages Docs](https://docs.github.com/en/pages)
- [Jekyll Themes](https://jekyllthemes.io/)

## Need Help?

- Check the [Jekyll documentation](https://jekyllrb.com/docs/)
- Search [Stack Overflow](https://stackoverflow.com/questions/tagged/jekyll)
- Visit the [Jekyll Forum](https://talk.jekyllrb.com/)
- Read the [GitHub Pages docs](https://docs.github.com/en/pages)

---

Ready to start blogging? Create your first post and share your knowledge with the world! 🚀
