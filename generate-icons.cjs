const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Icon sizes to generate
const sizes = [
  { width: 64, height: 64, name: 'pwa-64x64.png' },
  { width: 192, height: 192, name: 'pwa-192x192.png' },
  { width: 512, height: 512, name: 'pwa-512x512.png' },
];

// Maskable icon with padding
const maskableSize = { width: 512, height: 512, name: 'maskable-icon-512x512.png' };

async function generateIcons() {
  const svgPath = path.join(__dirname, 'public', 'logo.svg');
  const outputDir = path.join(__dirname, 'public');

  // Check if SVG exists
  if (!fs.existsSync(svgPath)) {
    console.error('❌ logo.svg not found in public directory!');
    return;
  }

  console.log('🎨 Starting icon generation from logo.svg...\n');

  // Read the SVG file
  const svgBuffer = fs.readFileSync(svgPath);

  // Generate standard icons
  for (const size of sizes) {
    try {
      await sharp(svgBuffer)
        .resize(size.width, size.height)
        .png()
        .toFile(path.join(outputDir, size.name));
      
      console.log(`✅ Generated ${size.name}`);
    } catch (error) {
      console.error(`❌ Failed to generate ${size.name}:`, error.message);
    }
  }

  // Generate maskable icon with padding (20% on all sides)
  try {
    const logoSize = Math.floor(maskableSize.width * 0.6); // 60% of total size
    const padding = Math.floor(maskableSize.width * 0.2); // 20% padding
    
    // First resize the logo
    const resizedLogo = await sharp(svgBuffer)
      .resize(logoSize, logoSize)
      .png()
      .toBuffer();
    
    // Then add padding with white background
    await sharp({
      create: {
        width: maskableSize.width,
        height: maskableSize.height,
        channels: 4,
        background: { r: 255, g: 255, b: 255, alpha: 1 }
      }
    })
    .composite([{
      input: resizedLogo,
      top: padding,
      left: padding
    }])
    .png()
    .toFile(path.join(outputDir, maskableSize.name));
    
    console.log(`✅ Generated ${maskableSize.name} (with padding)`);
  } catch (error) {
    console.error(`❌ Failed to generate ${maskableSize.name}:`, error.message);
  }

  // Optional: Generate additional sizes
  const optionalSizes = [
    { width: 144, height: 144, name: 'pwa-144x144.png' },
    { width: 256, height: 256, name: 'pwa-256x256.png' },
    { width: 384, height: 384, name: 'pwa-384x384.png' },
    { width: 180, height: 180, name: 'apple-touch-icon.png' },
  ];

  console.log('\n📱 Generating optional sizes...\n');

  for (const size of optionalSizes) {
    try {
      await sharp(svgBuffer)
        .resize(size.width, size.height)
        .png()
        .toFile(path.join(outputDir, size.name));
      
      console.log(`✅ Generated ${size.name}`);
    } catch (error) {
      console.error(`❌ Failed to generate ${size.name}:`, error.message);
    }
  }

  console.log('\n🎉 Icon generation complete!');
  console.log('📂 All icons saved to the /public directory');
  console.log('\n🚀 Next steps:');
  console.log('1. Run "npm run dev" to start the development server');
  console.log('2. Test PWA installation in Chrome/Edge');
  console.log('3. Run Lighthouse audit to verify PWA compliance');
}

// Run the generation
generateIcons().catch(console.error);