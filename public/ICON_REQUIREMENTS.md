# PWA Icon Requirements for MealCraft

## Required Icon Files

Please generate the following PNG icons from your logo and place them in the `/public` directory:

### Standard Icons
1. **pwa-64x64.png** - 64x64 pixels
2. **pwa-192x192.png** - 192x192 pixels (minimum required for PWA)
3. **pwa-512x512.png** - 512x512 pixels (for splash screens)

### Maskable Icon
4. **maskable-icon-512x512.png** - 512x512 pixels
   - This should have extra padding/safe area
   - The logo should be centered with about 20% padding on all sides
   - Used for adaptive icons on Android

## How to Generate Icons

### Option 1: Online Tool (Recommended)
1. Go to https://www.pwabuilder.com/imageGenerator
2. Upload your logo.svg file
3. Download the generated icon pack
4. Copy the required files to the `/public` directory

### Option 2: Manual Generation
1. Open logo.svg in a vector graphics editor (Inkscape, Illustrator, etc.)
2. Export as PNG at each required size
3. For the maskable icon, add 20% padding around the logo

### Option 3: Command Line (if you have ImageMagick)
```bash
# Generate standard icons
convert logo.svg -resize 64x64 pwa-64x64.png
convert logo.svg -resize 192x192 pwa-192x192.png
convert logo.svg -resize 512x512 pwa-512x512.png

# For maskable, you'll need to add padding manually
```

## Icon Design Guidelines

- **Background**: Icons should work on any background color
- **Transparency**: Standard icons can have transparent backgrounds
- **Maskable**: Must have a solid background that extends to the edges
- **Safe Zone**: For maskable icon, keep important content within the center 80%

## Testing Your Icons

1. Place all icons in the `/public` directory
2. Run `npm run dev`
3. Open Chrome DevTools > Application > Manifest
4. Verify all icons load correctly
5. Use Lighthouse audit to check PWA compliance

## Additional Sizes (Optional but Recommended)

If you want better coverage across all devices:
- apple-touch-icon.png - 180x180 (for iOS)
- pwa-144x144.png - 144x144
- pwa-256x256.png - 256x256
- pwa-384x384.png - 384x384

Once you've added these icons, the app will be installable as a PWA!