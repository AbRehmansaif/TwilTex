"""
TwilTex Image Optimization Script
Resizes and recompresses hero images and logo to dramatically reduce page weight.
Run once: python optimize_images.py
"""
import os
from pathlib import Path

try:
    from PIL import Image
except ImportError:
    print("Pillow not installed. Run: pip install Pillow")
    exit(1)

BASE = Path("static/images/mainimages")

# (filename, max_width, max_height, webp_quality)
HERO_IMAGES = [
    ("img1.webp", 900, 900, 82),
    ("img2.webp", 900, 900, 82),
    ("img3.webp", 900, 900, 82),
    ("img01.webp", 900, 900, 82),
]

LOGO = ("logo.png", "logo.webp", 222, 184, 90)   # 2× of 111×92 display size


def optimize_hero(filename, max_w, max_h, quality):
    src = BASE / filename
    if not src.exists():
        print(f"  SKIP (not found): {src}")
        return

    original_size = src.stat().st_size
    img = Image.open(src)

    # Convert RGBA → RGB for WebP compatibility
    if img.mode in ("RGBA", "P"):
        img = img.convert("RGB")

    # Resize only if larger than target
    w, h = img.size
    if w > max_w or h > max_h:
        img.thumbnail((max_w, max_h), Image.LANCZOS)
        print(f"  Resized {filename}: {w}x{h} -> {img.size[0]}x{img.size[1]}")

    # Save back as optimised WebP
    img.save(src, "WEBP", quality=quality, method=6)
    new_size = src.stat().st_size
    saved = (original_size - new_size) / 1024
    pct = (1 - new_size / original_size) * 100
    print(f"  OK {filename}: {original_size/1024:.0f} KB -> {new_size/1024:.0f} KB  (saved {saved:.0f} KB / {pct:.0f}%)")


def optimize_logo():
    src_name, dst_name, max_w, max_h, quality = LOGO
    src = BASE / src_name
    dst = BASE / dst_name

    if not src.exists():
        print(f"  SKIP logo (not found): {src}")
        return

    original_size = src.stat().st_size
    img = Image.open(src)

    if img.mode in ("RGBA", "P"):
        img = img.convert("RGBA")

    w, h = img.size
    if w > max_w or h > max_h:
        img.thumbnail((max_w, max_h), Image.LANCZOS)
        print(f"  Resized logo: {w}x{h} -> {img.size[0]}x{img.size[1]}")

    # Save as WebP (supports transparency)
    img.save(dst, "WEBP", quality=quality, method=6)
    new_size = dst.stat().st_size
    saved = (original_size - new_size) / 1024
    pct = (1 - new_size / original_size) * 100
    print(f"  OK logo.webp: {original_size/1024:.0f} KB -> {new_size/1024:.0f} KB  (saved {saved:.0f} KB / {pct:.0f}%)")


if __name__ == "__main__":
    print("\nTwilTex Image Optimizer\n" + "=" * 40)
    print("\nHero Images:")
    for args in HERO_IMAGES:
        optimize_hero(*args)

    print("\nLogo:")
    optimize_logo()

    print("\nDone! Commit the updated static files and collectstatic.")
