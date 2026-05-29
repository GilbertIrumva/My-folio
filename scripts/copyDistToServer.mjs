import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");
const srcDist = path.join(projectRoot, "dist");
const targetDist = path.join(projectRoot, "server", "dist");

if (!fs.existsSync(srcDist)) {
  console.error("dist folder not found. Run Vite build before copying.");
  process.exit(1);
}

fs.rmSync(targetDist, { recursive: true, force: true });
fs.mkdirSync(targetDist, { recursive: true });
fs.cpSync(srcDist, targetDist, { recursive: true });

console.log("Copied frontend dist to server/dist");
