#!/usr/bin/env node
/**
 * Generate favicon files in multiple sizes from the logo.svg file.
 * Requires: npm install sharp
 */

const fs = require('fs');
const path = require('path');

// Check if sharp is installed
let sharp;
try {
    sharp = require('sharp');
} catch (err) {
    console.error('Error: sharp module not found.');
    console.error('Please install it with: npm install sharp');
    process.exit(1);
}

// Define the sizes needed
const FAVICON_SIZES = {
    'favicon-16x16.png': 16,
    'favicon-32x32.png': 32,
    'favicon-48x48.png': 48,
    'apple-touch-icon-152x152.png': 152,
    'apple-touch-icon-167x167.png': 167,
    'apple-touch-icon.png': 180,
};

async function generateFavicons() {
    const imagesDir = path.join(__dirname, 'images');
    const sourceSvg = path.join(imagesDir, 'logo.svg');

    if (!fs.existsSync(sourceSvg)) {
        console.error(`Error: Source file not found: ${sourceSvg}`);
        return;
    }

    console.log(`Generating favicons from ${sourceSvg}...`);

    // Create images directory if it doesn't exist
    if (!fs.existsSync(imagesDir)) {
        fs.mkdirSync(imagesDir, { recursive: true });
    }

    // Generate each size
    for (const [filename, size] of Object.entries(FAVICON_SIZES)) {
        const outputPath = path.join(imagesDir, filename);

        try {
            await sharp(sourceSvg)
                .resize(size, size, {
                    fit: 'contain',
                    background: { r: 0, g: 0, b: 0, alpha: 0 }
                })
                .png({ quality: 100, compressionLevel: 9 })
                .toFile(outputPath);

            const stats = fs.statSync(outputPath);
            const sizeKb = (stats.size / 1024).toFixed(2);
            console.log(`✓ Created ${filename} (${size}x${size}) - ${sizeKb} KB`);

        } catch (err) {
            console.error(`✗ Failed to create ${filename}:`, err.message);
        }
    }

    console.log('\nFavicon generation complete!');
}

generateFavicons().catch(err => {
    console.error('Error generating favicons:', err);
    process.exit(1);
});
