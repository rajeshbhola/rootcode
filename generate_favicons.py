#!/usr/bin/env python3
"""
Generate favicon files in multiple sizes from the logo.svg file.
Requires: pip install cairosvg pillow
"""

import os
from pathlib import Path

try:
    import cairosvg
    from PIL import Image
    import io
except ImportError:
    print("Error: Required libraries not found.")
    print("Please install them with: pip install cairosvg pillow")
    exit(1)

# Define the sizes needed
FAVICON_SIZES = {
    'favicon-16x16.png': 16,
    'favicon-32x32.png': 32,
    'favicon-48x48.png': 48,
    'apple-touch-icon-152x152.png': 152,
    'apple-touch-icon-167x167.png': 167,
    'apple-touch-icon.png': 180,
}

def generate_favicons():
    """Generate all favicon sizes from logo.svg"""
    # Get the script directory
    script_dir = Path(__file__).parent
    images_dir = script_dir / 'images'

    # Source SVG file
    source_svg = images_dir / 'logo.svg'

    if not source_svg.exists():
        print(f"Error: Source file not found: {source_svg}")
        return

    print(f"Generating favicons from {source_svg}...")

    # Create images directory if it doesn't exist
    images_dir.mkdir(exist_ok=True)

    # Generate each size
    for filename, size in FAVICON_SIZES.items():
        output_path = images_dir / filename

        try:
            # Convert SVG to PNG at the specified size
            png_data = cairosvg.svg2png(
                url=str(source_svg),
                output_width=size,
                output_height=size
            )

            # Open with PIL and save (for optimization)
            img = Image.open(io.BytesIO(png_data))
            img.save(output_path, 'PNG', optimize=True)

            print(f"✓ Created {filename} ({size}x{size})")

        except Exception as e:
            print(f"✗ Failed to create {filename}: {e}")

    print("\nFavicon generation complete!")
    print("\nGenerated files:")
    for filename in FAVICON_SIZES.keys():
        file_path = images_dir / filename
        if file_path.exists():
            size_kb = file_path.stat().st_size / 1024
            print(f"  - {filename} ({size_kb:.2f} KB)")

if __name__ == '__main__':
    generate_favicons()
