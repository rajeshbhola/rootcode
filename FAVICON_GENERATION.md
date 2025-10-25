# Favicon Generation Guide

This document explains how to generate all the required favicon files from the logo.svg.

## Required Favicon Sizes

The following favicon files are needed for optimal cross-platform support:

- `favicon.svg` - Modern browsers (already created)
- `favicon-16x16.png` - Browser tabs
- `favicon-32x32.png` - Browser tabs (Retina)
- `favicon-48x48.png` - Windows site icons
- `apple-touch-icon-152x152.png` - iPad
- `apple-touch-icon-167x167.png` - iPad Pro
- `apple-touch-icon.png` (180x180) - iPhone/iPad

## Generation Methods

### Method 1: Using Python (Recommended)

1. Install required packages:
   ```bash
   pip install cairosvg pillow
   ```

2. Run the generation script:
   ```bash
   python generate_favicons.py
   ```

### Method 2: Using Node.js

1. Install required package:
   ```bash
   npm install sharp
   ```

2. Run the generation script:
   ```bash
   node generate_favicons.js
   ```

### Method 3: Online Tools (Manual)

If you prefer not to install dependencies, you can use online tools:

1. Go to [RealFaviconGenerator](https://realfavicongenerator.net/)
2. Upload `images/logo.svg`
3. Configure settings (use background color: #667eea to #764ba2 gradient)
4. Download and extract the files to the `images/` directory

### Method 4: Using ImageMagick (Command Line)

If you have ImageMagick installed:

```bash
# Generate each size
convert images/logo.svg -resize 16x16 images/favicon-16x16.png
convert images/logo.svg -resize 32x32 images/favicon-32x32.png
convert images/logo.svg -resize 48x48 images/favicon-48x48.png
convert images/logo.svg -resize 152x152 images/apple-touch-icon-152x152.png
convert images/logo.svg -resize 167x167 images/apple-touch-icon-167x167.png
convert images/logo.svg -resize 180x180 images/apple-touch-icon.png
```

## Verification

After generation, verify that all files exist:

```bash
ls -lh images/favicon*.png images/apple-touch-icon*.png
```

Expected output should show 6 PNG files with appropriate sizes.

## Integration

The favicons are already integrated into the site template (`_layouts/default.html`). Once generated, they will be automatically used when the site is built.
