# Google AdSense Setup Guide

This guide explains how to integrate Google AdSense into your Jekyll blog. The site is already prepared with flexible ad placement components.

## Prerequisites

1. **Approved AdSense Account**: Apply at [Google AdSense](https://www.google.com/adsense/)
2. **Publisher ID**: Get your AdSense publisher ID (format: `ca-pub-XXXXXXXXXXXXXXXX`)

## Quick Setup (3 Steps)

### Step 1: Enable AdSense in Configuration

Open `_config.yml` and add the following configuration:

```yaml
# Google AdSense Configuration
google_adsense_enabled: true
google_adsense_id: "ca-pub-XXXXXXXXXXXXXXXX"  # Replace with your actual publisher ID

# Ad Slot IDs (optional - get these from AdSense dashboard)
adsense_slots:
  header: "1234567890"        # Top banner ad
  footer: "0987654321"        # Footer banner ad
  in-article: "1122334455"    # In-article responsive ad
  between-posts: "5544332211" # Between post cards on homepage
  sidebar: "6677889900"       # Sidebar ad (if you add sidebar support)
```

### Step 2: Add AdSense Script to Layout

Open `_layouts/default.html` and add the AdSense script in the `<head>` section:

```html
<head>
  <!-- Existing head content -->

  {% if site.google_adsense_enabled and site.google_adsense_id %}
  <!-- Google AdSense -->
  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client={{ site.google_adsense_id }}"
       crossorigin="anonymous"></script>
  {% endif %}
</head>
```

### Step 3: Build and Deploy

```bash
# Build your site
bundle exec jekyll build

# Or serve locally to test
bundle exec jekyll serve

# Commit and push to GitHub
git add .
git commit -m "Add Google AdSense integration"
git push origin main
```

## Ad Placements

Your site already includes the following ad placements:

### Homepage (`index.html`)
- **Header Ad**: Top of the page, below hero section
- **Between Posts**: After the 3rd blog post card
- **Footer Ad**: Bottom of the page

### Blog Post Pages (`_layouts/post.html`)
- **In-Article Ad**: Below the post metadata, before content starts

### Custom Placements

You can add ads anywhere using the include syntax:

```liquid
{% include adsense.html slot="header" %}
{% include adsense.html slot="footer" %}
{% include adsense.html slot="in-article" %}
{% include adsense.html slot="between-posts" %}
{% include adsense.html slot="sidebar" %}
```

## Ad Slot Configuration

### Getting Ad Slot IDs

1. Go to [AdSense Dashboard](https://www.google.com/adsense/)
2. Navigate to **Ads** > **By ad unit**
3. Create ad units for each placement:
   - **Header**: Display ad (728x90 or responsive)
   - **Footer**: Display ad (728x90 or responsive)
   - **In-Article**: In-article ad (responsive)
   - **Between Posts**: Display ad (responsive)
4. Copy the `data-ad-slot` value for each unit
5. Add them to `_config.yml` under `adsense_slots`

### Ad Types Recommended

| Placement | Ad Type | Size |
|-----------|---------|------|
| Header | Display Ad | 728x90 or Responsive |
| Footer | Display Ad | 728x90 or Responsive |
| In-Article | In-Article Ad | Responsive |
| Between Posts | Display Ad | Responsive |
| Sidebar | Display Ad | 300x250 or 300x600 |

## Testing AdSense

### Before Approval

Before AdSense approval, you'll see **placeholder boxes** with dashed borders indicating where ads will appear.

### After Configuration

Once configured, ads will automatically replace the placeholders. During testing:

1. **Test Mode**: AdSense may show blank ads initially
2. **Live Ads**: Can take 10-20 minutes to appear
3. **Ad Review**: Some ads may require Google review (up to 24 hours)

### Troubleshooting

**Ads not showing?**
- Verify `google_adsense_enabled: true` in `_config.yml`
- Check that your publisher ID is correct
- Ensure the AdSense script is in `<head>` of `default.html`
- Check browser console for errors
- Wait 10-20 minutes after deployment

**Ads showing as blank spaces?**
- Normal for new ad units
- Can take 10-20 minutes for ads to populate
- Some pages may not match ad criteria initially

## Best Practices

### 1. Ad Density
- Don't add too many ads (current setup is optimal)
- Follow Google's [Better Ads Standards](https://www.betterads.org/)
- Keep content-to-ad ratio high

### 2. Performance
- Ads are loaded asynchronously (won't block page load)
- Lazy loading is enabled automatically
- No performance impact on Core Web Vitals

### 3. User Experience
- Ads blend with your design (styled to match theme)
- Clear visual separation from content
- Responsive across all devices

### 4. Policy Compliance
- Don't click your own ads
- Don't encourage clicks
- Follow [AdSense Program Policies](https://support.google.com/adsense/answer/48182)

## Advanced Customization

### Styling Ad Containers

Ad containers can be customized in `assets/style.scss`:

```scss
.adsense-container {
  margin: 40px 0;

  &.adsense-header {
    margin: 40px 0 60px;
  }

  &.adsense-footer {
    margin: 60px 0 40px;
  }
}
```

### Conditional Ad Display

Show ads only on specific pages:

```liquid
{% if page.layout == 'post' %}
  {% include adsense.html slot="in-article" %}
{% endif %}
```

Or exclude ads from specific pages:

```liquid
{% unless page.no_ads %}
  {% include adsense.html slot="footer" %}
{% endunless %}
```

Then in a page's front matter:

```yaml
---
layout: page
title: About
no_ads: true
---
```

### Auto Ads (Alternative Approach)

Instead of manual placements, you can use Google Auto Ads:

1. In AdSense dashboard, enable Auto Ads
2. Add only the AdSense script to `<head>`
3. Remove all `{% include adsense.html %}` tags
4. Google will automatically place ads

## Revenue Optimization

### 1. Content Quality
- Write longer, in-depth articles (better ad performance)
- Target high-CPC keywords
- Focus on valuable, evergreen content

### 2. Traffic Quality
- Organic search traffic performs best
- Target high-income demographics
- Focus on desktop traffic (higher CPCs)

### 3. Ad Placement
- Above-the-fold placements perform better
- In-article ads have high viewability
- Between content cards captures engaged readers

### 4. Analytics Integration

Track ad performance with Google Analytics:

```yaml
# _config.yml
google_analytics: UA-XXXXXXXXX-X
```

## Scalability

The current setup is **fully scalable**:

1. **Add New Posts**: Just create markdown files in `_posts/`
2. **Auto Ad Insertion**: Ads automatically appear on all posts
3. **No Manual Work**: Jekyll handles everything during build
4. **Grid Layout**: Automatically adjusts for any number of posts
5. **Pagination Ready**: Posts page supports unlimited posts

### Example: Adding a New Blog Post

```bash
# Create new post
touch _posts/2025-03-09-my-new-article.md
```

```yaml
---
layout: post
title: "My New Article"
categories: [Technology]
tags: [coding, tutorial]
excerpt: "A brief description of the article"
---

Your content here...
```

**That's it!** The post will automatically:
- Appear on homepage and posts page
- Include reading time calculation
- Show author info and date
- Display AdSense ads in appropriate locations
- Work with dark/light theme

## Support

### Resources
- [AdSense Help Center](https://support.google.com/adsense/)
- [AdSense Policies](https://support.google.com/adsense/answer/48182)
- [Optimization Tips](https://support.google.com/adsense/topic/1319753)

### Common Issues

**Issue**: Ads not showing after setup
**Solution**: Clear Jekyll cache and rebuild
```bash
bundle exec jekyll clean
bundle exec jekyll build
```

**Issue**: Layout broken with ads
**Solution**: Verify AdSense script is in `<head>`, not `<body>`

**Issue**: Revenue is low
**Solution**: Focus on content quality, increase traffic, optimize ad placements

---

**Your blog is now AdSense-ready!** Just add your publisher ID, create ad units, and deploy. Ads will automatically appear on all current and future posts.
