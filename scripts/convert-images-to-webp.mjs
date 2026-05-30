import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const IMAGES_DIR = path.resolve(process.cwd(), "public/images");

const QUALITY = 84;

const run = async () => {
  const entries = await fs.readdir(IMAGES_DIR, { withFileTypes: true });
  const jpgFiles = entries
    .filter((entry) => entry.isFile() && /\.jpe?g$/i.test(entry.name))
    .map((entry) => entry.name);

  if (jpgFiles.length === 0) {
    console.log("No JPG files found in public/images.");
    return;
  }

  for (const fileName of jpgFiles) {
    const sourcePath = path.join(IMAGES_DIR, fileName);
    const targetPath = path.join(IMAGES_DIR, fileName.replace(/\.jpe?g$/i, ".webp"));

    await sharp(sourcePath)
      .webp({ quality: QUALITY, effort: 5 })
      .toFile(targetPath);

    const sourceStat = await fs.stat(sourcePath);
    const targetStat = await fs.stat(targetPath);
    const savings = (((sourceStat.size - targetStat.size) / sourceStat.size) * 100).toFixed(1);

    console.log(`${fileName} -> ${path.basename(targetPath)} | ${sourceStat.size}B -> ${targetStat.size}B | ${savings}%`);
  }
};

run().catch((error) => {
  console.error("WebP conversion failed:", error);
  process.exit(1);
});
