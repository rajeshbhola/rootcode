# RootCode

A clean and minimal Jekyll blog powered by the Reverie theme.

## Overview

RootCode is a modern, responsive Jekyll blog designed for developers and tech enthusiasts. Built with simplicity and performance in mind, it provides a distraction-free platform for sharing knowledge and ideas.

## Features

- ✨ Clean, minimal design
- 📱 Fully responsive layout
- 🎨 Syntax highlighting for code blocks
- 🔍 Built-in search functionality
- 📊 SEO optimized
- 🚀 Fast loading times
- 📝 Markdown support
- 💬 Disqus comments integration
- 📈 Google Analytics support
- 🌐 Social media integration

## Quick Start

### Prerequisites

- Ruby (version 2.5.0 or higher)
- RubyGems
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/rajeshbhola/rajeshbhola.github.io.git rootcode
cd rootcode
```

2. Install dependencies:
```bash
bundle install
```

3. Run the blog locally:
```bash
bundle exec jekyll serve
```

4. Open your browser and visit:
```
http://localhost:4000/rootcode
```

## Configuration

Edit `_config.yml` to customize your blog:

```yaml
name: RootCode
description: Your blog description
avatar: https://url-to-your-avatar.jpg

# Social links
footer-links:
  github: yourusername
  twitter: yourusername
  linkedin: yourusername

# Optional integrations
google_analytics: UA-XXXXXXXX-X
disqus: your-disqus-shortname
```

## Writing Posts

Create a new file in `_posts/` with the format:

```
YEAR-MONTH-DAY-title.md
```

Example: `2025-01-17-my-first-post.md`

Add front matter to your post:

```yaml
---
layout: post
title: My First Post
categories: [Tutorial, Jekyll]
---
```

Then write your content using Markdown.

## Project Structure

```
rootcode/
├── _config.yml          # Site configuration
├── _includes/           # Reusable components
│   ├── analytics.html
│   ├── disqus.html
│   ├── meta.html
│   └── svg-icons.html
├── _layouts/            # Page templates
│   ├── default.html
│   ├── page.html
│   └── post.html
├── _pages/              # Static pages
│   ├── about.md
│   ├── getting-started.md
│   └── search.md
├── _posts/              # Blog posts
├── _sass/               # Sass partials
│   ├── _highlights.scss
│   ├── _reset.scss
│   ├── _svg-icons.scss
│   └── _variables.scss
├── assets/              # CSS, images, JS
│   └── style.scss
├── index.html           # Homepage
├── 404.md              # 404 page
├── Gemfile             # Ruby dependencies
└── README.md           # This file
```

## Customization

### Colors and Fonts

Edit `_sass/_variables.scss`:

```scss
$blue: #4183C4;
$darkGray: #333;
$helveticaNeue: "Helvetica Neue", Helvetica, Arial, sans-serif;
```

### Navigation

Update navigation links in `_layouts/default.html`:

```html
<nav>
  <a href="{{ site.baseurl }}/">Blog</a>
  <a href="{{ site.baseurl }}/about">About</a>
  <a href="{{ site.baseurl }}/getting-started">Getting Started</a>
</nav>
```

### Social Icons

Add or remove social links in `_config.yml`:

```yaml
footer-links:
  github: username
  twitter: username
  linkedin: username
  email: your.email@example.com
```

## Deployment

### GitHub Pages

1. Push your repository to GitHub
2. Go to Settings → Pages
3. Select source: main branch
4. Your site will be live at: `https://rajeshbhola.github.io/rootcode`

### Custom Domain

Create a `CNAME` file in the root directory:

```
yourdomain.com
```

Then configure your DNS settings with your domain provider.

## Useful Commands

```bash
# Start development server
bundle exec jekyll serve

# Build site
bundle exec jekyll build

# Clean build files
bundle exec jekyll clean

# Serve with drafts
bundle exec jekyll serve --drafts

# Live reload
bundle exec jekyll serve --livereload

# Production build
JEKYLL_ENV=production bundle exec jekyll build
```

## Technologies Used

- [Jekyll](https://jekyllrb.com/) - Static site generator
- [Markdown](https://www.markdownguide.org/) - Content writing
- [Sass](https://sass-lang.com/) - CSS preprocessing
- [Liquid](https://shopify.github.io/liquid/) - Template language
- [GitHub Pages](https://pages.github.com/) - Hosting

## Contributing

Contributions are welcome! Feel free to:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/improvement`)
3. Make your changes
4. Commit your changes (`git commit -am 'Add new feature'`)
5. Push to the branch (`git push origin feature/improvement`)
6. Create a Pull Request

## Resources

- [Jekyll Documentation](https://jekyllrb.com/docs/)
- [Markdown Guide](https://www.markdownguide.org/)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Liquid Template Language](https://shopify.github.io/liquid/)

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

If you encounter any issues or have questions:

- Check the [Getting Started](/_pages/getting-started.md) guide
- Read the [Jekyll documentation](https://jekyllrb.com/docs/)
- Search [Stack Overflow](https://stackoverflow.com/questions/tagged/jekyll)

## Author

**RootCode Blog**
- GitHub: [@rajeshbhola](https://github.com/rajeshbhola)

---

Built with ❤️ using Jekyll
